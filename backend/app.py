from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import json

app = Flask(__name__)
CORS(app)

preprocessor, model = joblib.load("fraud_model_pipeline.pkl")

latest_results = []

@app.route('/api/predict/upload', methods=['POST'])
def upload_csv():
    global latest_results

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        df = pd.read_csv(file)

        required = {'TransactionID', 'TransactionDate', 'Amount', 'MerchantID', 'TransactionType', 'Location'}
        missing = required - set(df.columns)
        if missing:
            return jsonify({'error': f"Missing column(s): {', '.join(missing)}"}), 400

        if df.empty:
            return jsonify({'error': 'Uploaded file contains no data.'}), 400

        original_df = df.copy()

        X = df.drop(columns=['TransactionID', 'TransactionDate', 'MerchantID', 'Location'], errors='ignore')

        X_processed = preprocessor.transform(X)
        predictions = model.predict(X_processed)

        original_df['IsFraud'] = predictions
        latest_results = original_df.to_dict(orient='records')

        return jsonify({'message': 'File uploaded and processed successfully.'}), 200

    except Exception as e:
        return jsonify({'error': f"Failed to process file: {e}"}), 500

@app.route('/api/data', methods=['GET'])
def get_data():
    if not latest_results:
        return jsonify({'data': []}), 200
    return jsonify({'data': latest_results}), 200

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    try:
        with open("model_metrics.json", "r") as f:
            report = json.load(f)
        return jsonify(report)
    except:
        return jsonify({'error': 'No training metrics available.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
