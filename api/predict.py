from http.server import BaseHTTPRequestHandler
import json
import pickle
import numpy as np
import os
import sys
from pymongo import MongoClient
from datetime import datetime
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Load model
            # In Vercel, the file layout might place files in root or specific locations.
            # We assume climate.pkl is in the root or same dir logic
            model_path = os.path.join(os.getcwd(), 'climate.pkl')
            if not os.path.exists(model_path):
                 # Try relative to this file
                 model_path = os.path.join(os.path.dirname(__file__), '..', 'climate.pkl')

            if not os.path.exists(model_path):
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Model file not found"}).encode('utf-8'))
                return

            with open(model_path, 'rb') as f:
                model = pickle.load(f)

            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            # Encoding mappings
            outlook_map = {'sunny': 0, 'overcast': 1, 'rainy': 2}
            windy_map = {'no': 0, 'yes': 1}

            # Extract features
            outlook_str = str(data.get('outlook', '')).lower()
            outlook = outlook_map.get(outlook_str, 0)
            
            try:
                temp = float(data.get('temp', 0))
                humidity = float(data.get('humidity', 0))
            except (ValueError, TypeError):
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Invalid numerical values"}).encode('utf-8'))
                return

            windy_str = str(data.get('windy', '')).lower()
            windy = windy_map.get(windy_str, 0)

            # Predict
            features = np.array([[outlook, temp, humidity, windy]])
            prediction = model.predict(features)[0]
            probability = model.predict_proba(features)[0]

            # Result
            result_text = "Yes, Great day for outdoor activities! 🌞" if prediction == 1 else "No, Better stay indoors today 🏠"
            confidence = float(max(probability)) * 100

            output = {
                'prediction': int(prediction),
                'result': result_text,
                'confidence': round(confidence, 2),
                'probabilities': {
                    'stay_indoors': round(float(probability[0]) * 100, 2),
                    'go_outdoors': round(float(probability[1]) * 100, 2)
                }
            }

            # Save to MongoDB
            # We need to connect to DB here since we are bypassing the Node backend
            mongo_uri = os.environ.get('MONGO_URI')
            if mongo_uri:
                try:
                    client = MongoClient(mongo_uri)
                    db = client.get_database() # uses default db from URI
                    collection = db['predictions']
                    
                    record = {
                        'outlook': outlook_str,
                        'temp': temp,
                        'humidity': humidity,
                        'windy': windy_str,
                        'prediction': int(prediction),
                        'result': result_text,
                        'confidence': output['confidence'],
                        'probabilities': output['probabilities'],
                        'timestamp': datetime.utcnow()
                    }
                    collection.insert_one(record)
                    
                    # We can't easily invalidate Node cache from here without shared storage (Redis)
                    # But for now, we just save.
                except Exception as e:
                    print(f"DB Error: {e}")
                    # Continue even if DB write fails, but log it
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(output).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
