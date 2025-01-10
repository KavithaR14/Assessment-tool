import React, { useState } from 'react';
import axios from 'axios';

const SubmitReport = () => {
  const [email, setEmail] = useState('');
  const [reportData, setReportData] = useState('Your assessment report goes here.');

  const handleSendReport = async () => {
    try {
      const response = await axios.post('http://localhost:5004/api/send-report', {
        email,
        reportData,
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error sending report:', error);
      alert('Failed to send report.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Send Your Report</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: '10px',
          marginBottom: '10px',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <button
        onClick={handleSendReport}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Send Report
      </button>
    </div>
  );
};

export default SubmitReport;
