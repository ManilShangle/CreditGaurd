import React, { useState, useEffect } from 'react';
import './UploadData.css';
import FlashMessage from '../../components/FlashMessage/FlashMessage';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    const savedFileName = sessionStorage.getItem('uploadedFileName');
    if (savedFileName) {
      setFile({ name: savedFileName });
    }
  }, []);

  const showFlash = (message, type = 'info') => {
    setFlash({ message, type });
    setTimeout(() => setFlash(null), 3000);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    sessionStorage.setItem('uploadedFileName', e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      showFlash("Please select a CSV file before submitting.", "error");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setIsLoading(true);

    fetch('http://localhost:5000/api/predict/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          showFlash(data.error, "error");
        } else {
          showFlash("File uploaded successfully!", "success");
        }
      })
      
      .catch(err => {
        console.error(err);
        showFlash("An error occurred while uploading the file.", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="upload-page">
      {flash && <FlashMessage message={flash.message} type={flash.type} />}
      <h2 className="upload-title">Upload Transaction CSV</h2>
      <p className="upload-instructions">
        Upload a CSV file containing transaction data for fraud analysis.
        <br /><br />
        <strong>Required CSV Format:</strong><br />
        <code>transaction_id, amount, time, location, device, is_fraud</code><br />
        Ensure the header row is present. The model will process each row and return a fraud prediction.
      </p>

      <form className="upload-form" onSubmit={handleSubmit}>
        <label className="upload-label">
          Choose CSV File
          <input type="file" accept=".csv" onChange={handleFileChange} />
        </label>

        {file && <div className="file-name">Selected: {file.name}</div>}

        <button className="upload-button" type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadPage;
