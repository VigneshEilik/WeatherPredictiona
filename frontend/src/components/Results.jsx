import { useEffect } from 'react';
import { createConfettiCelebration, createFireworks, createSparkleBurst } from '../utils/animations';

const Results = ({ results, onReset }) => {
    useEffect(() => {
        if (results) {
            // Trigger all celebration animations
            setTimeout(() => {
                const colors = results.prediction === 1
                    ? ['#4facfe', '#00f2fe', '#a8edea']
                    : ['#f093fb', '#f5576c', '#ff9a56'];

                createSparkleBurst(50, colors);
                setTimeout(() => createConfettiCelebration(), 500);
                setTimeout(() => createFireworks(), 800);
            }, 100);
        }
    }, [results]);

    if (!results) return null;

    const isOutdoor = results.prediction === 1;

    return (
        <>
            <div className="card-header">
                <h2>Prediction Results</h2>
            </div>

            <div className="results">
                <div className="result-header">
                    <div className="result-icon">
                        {isOutdoor ? '🌞' : '🏠'}
                    </div>
                    <h3 className="result-text" style={{
                        background: isOutdoor
                            ? 'linear-gradient(135deg, #4facfe, #00f2fe, #a8edea)'
                            : 'linear-gradient(135deg, #f093fb, #f5576c, #ff9a56)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        backgroundSize: '200% auto'
                    }}>
                        {results.result}
                    </h3>
                </div>

                {/* Confidence Section */}
                <div className="confidence-section">
                    <div className="confidence-label">
                        <span>Confidence Level</span>
                        <span className="confidence-value">{results.confidence}%</span>
                    </div>
                    <div className="confidence-bar">
                        <div
                            className="confidence-progress"
                            style={{ width: `${results.confidence}%` }}
                        ></div>
                    </div>
                </div>

                {/* Probabilities */}
                <div className="probabilities">
                    <div className="probability-item">
                        <div className="probability-header">
                            <span>🏠 Stay Indoors</span>
                            <span className="probability-value">{results.probabilities.stay_indoors}%</span>
                        </div>
                        <div className="probability-bar">
                            <div
                                className="probability-progress indoor"
                                style={{ width: `${results.probabilities.stay_indoors}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="probability-item">
                        <div className="probability-header">
                            <span>🌞 Go Outdoors</span>
                            <span className="probability-value">{results.probabilities.go_outdoors}%</span>
                        </div>
                        <div className="probability-bar">
                            <div
                                className="probability-progress outdoor"
                                style={{ width: `${results.probabilities.go_outdoors}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <button className="new-prediction-btn" onClick={onReset}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M2 9C2 5.13 5.13 2 9 2C12.87 2 16 5.13 16 9C16 12.87 12.87 16 9 16C7.05 16 5.28 15.13 4.05 13.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M2 6V9H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    New Prediction
                </button>
            </div>
        </>
    );
};

export default Results;
