const Features = () => {
    return (
        <div className="features-grid">
            <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h3>AI Powered</h3>
                <p>Advanced Decision Tree algorithm trained on weather patterns</p>
            </div>
            <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Instant Results</h3>
                <p>Get real-time predictions in milliseconds</p>
            </div>
            <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Confidence Scores</h3>
                <p>Transparent probability distributions for informed decisions</p>
            </div>
        </div>
    );
};

export default Features;
