from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__, static_folder='static')
CORS(app)

# Load the ML model
with open('climate.pkl', 'rb') as f:
    model = pickle.load(f)

# Encoding mappings for categorical features
outlook_map = {'sunny': 0, 'overcast': 1, 'rainy': 2}
windy_map = {'no': 0, 'yes': 1}

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Extract features
        outlook = outlook_map.get(data.get('outlook', '').lower(), 0)
        temp = float(data.get('temp', 0))
        humidity = float(data.get('humidity', 0))
        windy = windy_map.get(data.get('windy', '').lower(), 0)
        
        # Create feature array
        features = np.array([[outlook, temp, humidity, windy]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0]
        
        # Interpret result
        result = "Yes, Great day for outdoor activities! 🌞" if prediction == 1 else "No, Better stay indoors today 🏠"
        confidence = float(max(probability)) * 100
        
        return jsonify({
            'prediction': int(prediction),
            'result': result,
            'confidence': round(confidence, 2),
            'probabilities': {
                'stay_indoors': round(float(probability[0]) * 100, 2),
                'go_outdoors': round(float(probability[1]) * 100, 2)
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/model-info', methods=['GET'])
def model_info():
    return jsonify({
        'model_type': 'Decision Tree Classifier',
        'features': ['outlook', 'temperature', 'humidity', 'windy'],
        'classes': ['Stay Indoors', 'Go Outdoors'],
        'n_features': 4
    })

if __name__ == '__main__':
    # Create static directory if it doesn't exist
    os.makedirs('static', exist_ok=True)
    app.run(debug=True, port=5000)
