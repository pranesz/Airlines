from flask import Flask, request, jsonify
from flask_cors import CORS 
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  


# Pre_Trained Model
grid_load = joblib.load('Grid_search_model.pkl')
test_pol = joblib.load('Test_pol.pkl')

@app.route('/api/predict', methods=['POST'])  
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    features_poly = test_pol.transform(features)
    prediction = grid_load.predict(features_poly)

    return jsonify({'prediction': int(prediction[0])})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)