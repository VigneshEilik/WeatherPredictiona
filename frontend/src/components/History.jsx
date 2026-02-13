import { useState, useEffect } from 'react';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
        // Refresh history every 10 seconds to keep it live
        const interval = setInterval(fetchHistory, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchHistory = async () => {
        try {
            // Use relative path for production (Vercel)
            const APP_URL = import.meta.env.VITE_API_BASE_URL || '';
            const response = await fetch(`${APP_URL}/api/history`);
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return null; // Don't show anything while loading first time
    if (history.length === 0) return null; // Don't show if no history

    return (
        <div className="history-section">
            <div className="card-header">
                <h2>Recent Analysis</h2>
            </div>


            <div className="history-table-container">
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Outlook</th>
                            <th>Temp</th>
                            <th>Humidity</th>
                            <th>Windy</th>
                            <th>Prediction</th>
                            <th>Confidence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={item._id || index} style={{ animationDelay: `${index * 0.1}s` }}>
                                <td>{new Date(item.timestamp).toLocaleTimeString()}</td>
                                <td>
                                    <span className={`status-badge ${item.outlook}`}>
                                        {item.outlook === 'sunny' ? '☀️' : item.outlook === 'rainy' ? '🌧️' : '☁️'} {item.outlook}
                                    </span>
                                </td>
                                <td>{item.temp}°C</td>
                                <td>{item.humidity}%</td>
                                <td>{item.windy === 'yes' ? '💨 Yes' : '🍃 No'}</td>
                                <td>
                                    <span className={`result-badge ${item.prediction === 1 ? 'go' : 'stay'}`}>
                                        {item.prediction === 1 ? 'Go Out 🏃' : 'Stay In 🏠'}
                                    </span>
                                </td>
                                <td>
                                    <div className="confidence-pill" style={{
                                        '--width': `${item.confidence}%`,
                                        background: `linear-gradient(90deg, ${item.confidence > 80 ? '#4facfe' : '#ff9a56'}, ${item.confidence > 80 ? '#00f2fe' : '#ff6a88'})`
                                    }}>
                                        {item.confidence}%
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default History;
