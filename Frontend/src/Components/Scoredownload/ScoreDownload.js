import React, { useState } from 'react';

const ScoreDownload = () => {
    const [score] = useState(85);
    const [description] = useState('You did an excellent job!');

    const downloadReport = () => {
        const textContent = `Score: ${score}\nDescription: ${description}`;
        const blob = new Blob([textContent], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'score_description.txt';  // Filename for download
        link.click();
    };

    return (
        <div className="container">
            <h1>Score and Description</h1>
            <p>Your score: <span>{score}</span></p>
            <p>Description: <span>{description}</span></p>
            <button onClick={downloadReport}>Download Report</button>
        </div>
    );
};

export default ScoreDownload;
