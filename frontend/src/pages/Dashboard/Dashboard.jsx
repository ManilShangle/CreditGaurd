import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const DashboardPage = () => {
  const [data, setData]     = useState([]);
  const [error, setError]   = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(json => setData(json.data || []))
      .catch(err => {
        console.error(err);
        setError('Failed to load data');
      });
  }, []);

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Dashboard</h2>

      {error && <div className="dashboard-error">{error}</div>}

      {data.length === 0 ? (
        <div className="dashboard-placeholder settings-card">
          <p>
            No data available yet.<br/>
            Please <strong>upload a CSV file</strong> on the Upload page to view transaction data.
          </p>
        </div>
      ) : (
        <div className="settings-card table-container">
          <table className="dashboard-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
