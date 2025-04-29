from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

csv_data = []

@app.route('/api/predict/upload', methods=['POST'])
def upload_csv():
    global csv_data
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        df = pd.read_csv(file)
        # validate headers
        required = {'TransactionID','TransactionDate','Amount','MerchantID','TransactionType','Location','IsFraud'}
        missing = required - set(df.columns)
        if missing:
            return jsonify({'error': f"Missing column(s): {', '.join(missing)}"}), 400
        if df.empty:
            return jsonify({'error': 'Uploaded file contains no data.'}), 400

        csv_data = df.to_dict(orient='records')
        return jsonify({'message': 'File uploaded successfully!'}), 200

    except Exception as e:
        return jsonify({'error': f"Failed to process file: {e}"}), 500

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({'data': csv_data}), 200

if __name__ == '__main__':
    app.run(debug=True)
