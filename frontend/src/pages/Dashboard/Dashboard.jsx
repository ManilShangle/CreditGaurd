import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const DashboardPage = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch('/api/predict/results');
        const data = await response.json();
        setPredictions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };

    fetchPredictions();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <h2 className="dashboard-title">Loading Predictions...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Dashboard</h2>
      <div className="prediction-table">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Prediction</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((item, index) => (
              <tr key={index}>
                <td>{item.transaction_id}</td>
                <td>{item.amount}</td>
                <td>{item.prediction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPage;
