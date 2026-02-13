const Header = ({ onLiveAnalysis }) => {
    return (
        <header className="header">
            <div className="logo">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="url(#gradient)" opacity="0.2" />
                    <path d="M20 8C13.4 8 8 13.4 8 20C8 26.6 13.4 32 20 32C26.6 32 32 26.6 32 20C32 13.4 26.6 8 20 8ZM20 29C15 29 11 25 11 20C11 15 15 11 20 11C25 11 29 15 29 20C29 25 25 29 20 29Z" fill="url(#gradient)" />
                    <circle cx="20" cy="20" r="6" fill="url(#gradient)" />
                    <defs>
                        <linearGradient id="gradient" x1="8" y1="8" x2="32" y2="32">
                            <stop offset="0%" stopColor="#667eea" />
                            <stop offset="100%" stopColor="#764ba2" />
                        </linearGradient>
                    </defs>
                </svg>
                <span>Climate Predictor AI</span>
            </div>

            <div className="header-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div
                    className="header-badge live-data-btn"
                    onClick={onLiveAnalysis}
                    title="Click to analyze current local weather"
                    style={{
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                        borderColor: 'transparent'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '6px' }}>
                        <path d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8C1.5 11.6 4.4 14.5 8 14.5C11.6 14.5 14.5 11.6 14.5 8C14.5 4.4 11.6 1.5 8 1.5ZM8 13C5.2 13 3 10.8 3 8C3 5.2 5.2 3 8 3C10.8 3 13 5.2 13 8C13 10.8 10.8 13 8 13Z" fill="white" />
                        <path d="M8.5 4.5H7.5V8.5L10.5 10.5L11.25 9.25L8.5 7.75V4.5Z" fill="white" />
                    </svg>
                    Live Data
                </div>

                <div className="header-badge">
                    <span className="badge-dot"></span>
                    ML Powered
                </div>
            </div>
        </header>
    );
};

export default Header;
