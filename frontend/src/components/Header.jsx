const Header = ({ onLiveAnalysis }) => {
    return (
        <header className="header">
            <div className="logo">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40">
                            <stop offset="0%" stopColor="#4facfe" />
                            <stop offset="100%" stopColor="#00f2fe" />
                        </linearGradient>
                        <linearGradient id="cloudGradient" x1="10" y1="10" x2="30" y2="30">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#e6e9f0" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>

                    {/* Sun/Background Glow */}
                    <circle cx="28" cy="14" r="8" fill="url(#logoGradient)" opacity="0.8">
                        <animate attributeName="opacity" values="0.8;1;0.8" duration="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Cloud Shape */}
                    <path d="M10 28C6.686 28 4 25.314 4 22C4 18.686 6.686 16 10 16C10.5 16 11 16.1 11.5 16.2C12.5 12.8 15.6 10.5 19 10.5C23.4 10.5 27 14.1 27 18.5C27 18.9 26.9 19.3 26.9 19.7C29.8 20.3 32 22.9 32 26C32 29.3 29.3 32 26 32H10"
                        fill="url(#cloudGradient)" />

                    {/* AI Circuit Connections */}
                    <circle cx="14" cy="22" r="1.5" fill="#667eea" />
                    <circle cx="20" cy="18" r="1.5" fill="#667eea" />
                    <circle cx="24" cy="24" r="1.5" fill="#667eea" />
                    <path d="M14 22L20 18M20 18L24 24M14 22L24 24" stroke="#667eea" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
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
