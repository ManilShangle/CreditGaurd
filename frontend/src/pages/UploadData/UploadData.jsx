import React, { useState } from 'react';
import './UploadData.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a CSV file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/api/predict/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert("File uploaded successfully!");
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred while uploading the file.");
      });
  };

  return (
    <div className="upload-page">
      <h2 className="upload-title">Upload Transaction CSV</h2>
      <p className="upload-instructions">
        Upload a CSV file containing transaction data for fraud analysis.
        <br /><br />
        <strong>Required CSV Format:</strong>
        <br />
        Your file must include these columns in exactly this order:
        <br />
        <code>transaction_id, amount, time, location, device, is_fraud</code>
        <br /><br />
        Make sure the header row is present. The model will process each row and return a fraud prediction.
      </p>

      <form className="upload-form" onSubmit={handleSubmit}>
        <label className="upload-label">
          Choose CSV File
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </label>
        <button className="upload-button" type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPage;
