from flask import Blueprint, request, jsonify
import pandas as pd
import os

predict_bp = Blueprint("predict_bp", __name__)

@predict_bp.route('/upload', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    df = pd.read_csv(file)

    # ✨ Dummy Prediction Logic
    df['prediction'] = ['Good' if x % 2 == 0 else 'Bad' for x in range(len(df))]

    # Return predictions
    return jsonify(df.to_dict(orient='records'))
