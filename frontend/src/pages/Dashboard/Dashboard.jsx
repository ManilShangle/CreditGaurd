import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('/api/predict/upload', formData);
    setResults(response.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload CSV to Predict</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="ml-4 bg-purple-600 text-white p-2 rounded">Upload</button>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Results:</h2>
        {results.map((r, i) => (
          <pre key={i}>{JSON.stringify(r, null, 2)}</pre>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
