import React, { useState, useEffect } from 'react';
import './UploadData.css';
import FlashMessage from '../../components/FlashMessage/FlashMessage.jsx';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [flash, setFlash] = useState({ message: '', type: '' });

  useEffect(() => {
    const savedFileName = localStorage.getItem('uploadedFileName');
    if (savedFileName) {
      setFile({ name: savedFileName });
    }
  }, []);
  
  const showFlash = (message, type = 'success') => {
    setFlash({ message, type });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      localStorage.setItem('uploadedFileName', selected.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      showFlash('Please select a CSV file before submitting.', 'error');
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
        showFlash('File uploaded successfully!', 'success');
      })
      .catch(err => {
        console.error(err);
        showFlash('An error occurred while uploading the file.', 'error');
      });
  };

  return (
    <div className="upload-page">
      {flash.message && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={() => setFlash({ message: '', type: '' })}
        />
      )}
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

        {file && (
          <p className="selected-file">
            Selected File: <code>{file.name}</code>
          </p>
        )}

        <button className="upload-button" type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPage;
