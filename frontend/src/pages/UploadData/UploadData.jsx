import React, { useState } from 'react';
import './UploadData.css';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please upload a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/predict/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully!');
      } else {
        setMessage('Error uploading file');
      }
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="upload-page">
      <h2 className="upload-title">Upload CSV for Prediction</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UploadPage;
