import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import './Dashboard.css';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.length > 0) {
          setData(json.data);
        } else {
          setHasError(true);
        }
      })
      .catch(() => setHasError(true));
  }, []);

  if (!data.length || hasError) {
    return (
      <div className="dashboard">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="dashboard-placeholder">
          <p>No data available. Please upload a CSV file.</p>
        </div>
      </div>
    );
  }

  const fraudCount = data.filter(row => row.is_fraud === 1).length;
  const total = data.length;
  const avgAmount = (data.reduce((acc, row) => acc + row.amount, 0) / total).toFixed(2);
  const percentFraud = ((fraudCount / total) * 100).toFixed(1);
  const topMerchants = [...new Set(data.map(row => row.merchant))].slice(0, 3);

  const pieData = {
    labels: ['Fraud', 'Legit'],
    datasets: [{
      label: 'Fraud Distribution',
      data: [fraudCount, total - fraudCount],
      backgroundColor: ['#ff4d4f', '#4f83ff'],
      borderColor: '#ffffff10',
      borderWidth: 2,
    }]
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Fraud Analysis Dashboard</h2>

      <div className="dashboard-card main-card">
        <h3>Fraud Summary</h3>
        <div style={{ width: '100%', maxWidth: '350px', margin: '0 auto' }}>
          <Pie data={pieData} />
        </div>
        <p style={{ marginTop: '1rem' }}>
          <strong>{fraudCount}</strong> out of <strong>{total}</strong> transactions were fraudulent.
        </p>
        <p><strong>{percentFraud}%</strong> fraud rate detected.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card csv-preview-container">
          <h3>CSV Preview</h3>
          <div
            className={`csv-preview-wrapper ${expanded ? "expanded" : ""}`}
            onClick={() => setExpanded(!expanded)}
          >
            <div className="csv-table-container">
              <table className="csv-table">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(expanded ? data : data.slice(0, 5)).map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((val, j) => (
                        <td key={j}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Summary Stats</h3>
          <p><strong>Total:</strong> {total}</p>
          <p><strong>Fraud:</strong> {fraudCount}</p>
          <p><strong>Avg Amount:</strong> ${avgAmount}</p>
        </div>

        <div className="dashboard-card">
          <h3>Top Merchants</h3>
          <ul>{topMerchants.map((m, i) => <li key={i}>{m}</li>)}</ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
