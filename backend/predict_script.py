import sys
import json
import pickle
import numpy as np
import os

# Suppress warnings
import warnings
warnings.filterwarnings('ignore')

try:
    # Load model from parent directory
    # Assuming script is run from 'backend' directory, model is in '..'
    model_path = os.path.join(os.path.dirname(__file__), '..', 'climate.pkl')
    
    if not os.path.exists(model_path):
        # Try current directory if parent fails (robustness)
        model_path = os.path.join(os.path.dirname(__file__), 'climate.pkl')
    
    if not os.path.exists(model_path):
        print(json.dumps({"error": f"Model file not found at {model_path}"}))
        sys.exit(1)

    with open(model_path, 'rb') as f:
        model = pickle.load(f)

    # Read input from stdin
    input_str = sys.stdin.read()
    if not input_str:
        print(json.dumps({"error": "No input provided"}))
        sys.exit(1)
        
    try:
        data = json.loads(input_str)
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
        sys.exit(1)

    # Encoding mappings (same as original app.py)
    outlook_map = {'sunny': 0, 'overcast': 1, 'rainy': 2}
    windy_map = {'no': 0, 'yes': 1}

    # Extract features
    outlook = outlook_map.get(str(data.get('outlook', '')).lower(), 0)
    try:
        temp = float(data.get('temp', 0))
        humidity = float(data.get('humidity', 0))
    except (ValueError, TypeError):
        print(json.dumps({"error": "Invalid numerical values for temp or humidity"}))
        sys.exit(1)
        
    windy = windy_map.get(str(data.get('windy', '')).lower(), 0)

    # Create feature array
    features = np.array([[outlook, temp, humidity, windy]])

    # Make prediction
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0]

    # Interpret result
    result = "Yes, Great day for outdoor activities! 🌞" if prediction == 1 else "No, Better stay indoors today 🏠"
    confidence = float(max(probability)) * 100

    output = {
        'prediction': int(prediction),
        'result': result,
        'confidence': round(confidence, 2),
        'probabilities': {
            'stay_indoors': round(float(probability[0]) * 100, 2),
            'go_outdoors': round(float(probability[1]) * 100, 2)
        }
    }
    
    print(json.dumps(output))

except Exception as e:
    print(json.dumps({"error": str(e)}))
    sys.exit(1)
