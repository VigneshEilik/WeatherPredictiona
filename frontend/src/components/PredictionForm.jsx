import { useState } from 'react';

const PredictionForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        outlook: '',
        temp: '',
        humidity: '',
        windy: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.outlook || !formData.temp || !formData.humidity || !formData.windy) {
            alert('⚠️ Please fill in all fields correctly');
            return;
        }

        onSubmit({
            outlook: formData.outlook,
            temp: parseFloat(formData.temp),
            humidity: parseFloat(formData.humidity),
            windy: formData.windy
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (loading) {
        return (
            <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Analyzing weather conditions...</p>
            </div>
        );
    }

    return (
        <>
            <div className="card-header">
                <h2>Weather Analysis</h2>
                <div className="model-badge">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2L10.5 7L15 8L10.5 9L8 14L5.5 9L1 8L5.5 7L8 2Z" fill="currentColor" />
                    </svg>
                    Decision Tree Model
                </div>
            </div>

            <form className="prediction-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Outlook */}
                    <div className="form-group">
                        <label htmlFor="outlook">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
                                <path d="M10 2V4M10 16V18M18 10H16M4 10H2M15.5 15.5L14 14M6 6L4.5 4.5M15.5 4.5L14 6M6 14L4.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Sky Outlook
                        </label>
                        <div className="select-wrapper">
                            <select
                                id="outlook"
                                name="outlook"
                                value={formData.outlook}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose outlook...</option>
                                <option value="sunny">☀️ Sunny</option>
                                <option value="overcast">☁️ Overcast</option>
                                <option value="rainy">🌧️ Rainy</option>
                            </select>
                        </div>
                    </div>

                    {/* Temperature */}
                    <div className="form-group">
                        <label htmlFor="temp">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <rect x="8" y="2" width="4" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                                <circle cx="10" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            Temperature (°C)
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                id="temp"
                                name="temp"
                                placeholder="e.g., 25"
                                min="-20"
                                max="50"
                                step="0.1"
                                value={formData.temp}
                                onChange={handleChange}
                                required
                            />
                            <span className="input-unit">°C</span>
                        </div>
                        <div className="range-indicator">
                            <span>-20°C</span>
                            <span>50°C</span>
                        </div>
                    </div>

                    {/* Humidity */}
                    <div className="form-group">
                        <label htmlFor="humidity">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2C10 2 4 8 4 12C4 15.31 6.69 18 10 18C13.31 18 16 15.31 16 12C16 8 10 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                            </svg>
                            Humidity (%)
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                id="humidity"
                                name="humidity"
                                placeholder="e.g., 65"
                                min="0"
                                max="100"
                                step="1"
                                value={formData.humidity}
                                onChange={handleChange}
                                required
                            />
                            <span className="input-unit">%</span>
                        </div>
                        <div className="range-indicator">
                            <span>0%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    {/* Windy */}
                    <div className="form-group">
                        <label htmlFor="windy">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M2 10H12C13.66 10 15 8.66 15 7C15 5.34 13.66 4 12 4C10.34 4 9 5.34 9 7M2 14H14C15.66 14 17 12.66 17 11C17 9.34 15.66 8 14 8M2 6H8C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            Wind Condition
                        </label>
                        <div className="select-wrapper">
                            <select
                                id="windy"
                                name="windy"
                                value={formData.windy}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose condition...</option>
                                <option value="no">🍃 Calm (No Wind)</option>
                                <option value="yes">💨 Windy</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type="submit" className="submit-btn">
                    <span className="btn-text">Analyze Weather</span>
                    <svg className="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10H15M15 10L10 5M15 10L10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </form>
        </>
    );
};

export default PredictionForm;
