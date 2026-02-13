import pickle
import numpy as np

# Load the model
with open('climate.pkl', 'rb') as f:
    model = pickle.load(f)

print("Model type:", type(model))
print("\nModel attributes:")
print(dir(model))

# Check if it's a scikit-learn model
if hasattr(model, 'feature_names_in_'):
    print("\nFeature names:", model.feature_names_in_)
if hasattr(model, 'n_features_in_'):
    print("Number of features:", model.n_features_in_)
if hasattr(model, 'classes_'):
    print("Classes:", model.classes_)

print("\nModel details:")
print(model)
