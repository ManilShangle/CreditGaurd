import React from 'react';
import './Dashboard.css';

const DashboardPage = () => {
  
  const hasData = false;

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Dashboard</h2>
      {hasData ? (
        <div>
          {/* visualized data and predictions will go here */}
        </div>
      ) : (
        <div className="dashboard-placeholder">
          <p>
            No data available yet.
            <br />
            Please <strong>upload a CSV file</strong> on the Upload page to view transaction data and predictions.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
