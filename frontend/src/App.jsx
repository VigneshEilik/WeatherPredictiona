import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import Results from './components/Results';
import Features from './components/Features';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';
import AmbientParticles from './components/AmbientParticles';
import MouseTrail from './components/MouseTrail';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // ... (keep existing handlePrediction function) ...
  const handlePrediction = async (formData) => {
    setLoading(true);
    setShowResults(false);

    try {
      // Use relative path for production (Vercel)
      const APP_URL = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${APP_URL}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const result = await response.json();

      // Simulate processing time for better UX
      setTimeout(() => {
        setResults(result);
        setLoading(false);
        setShowResults(true);
      }, 1200);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      alert('Failed to get prediction. Please try again.');
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setResults(null);
  };

  const fetchLiveWeather = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );
        const data = await response.json();
        const current = data.current;

        // Map WMO weather codes to our simplified categories
        // 0-1: Sunny, 2-3: Overcast, 45+: Rainy/Other
        let outlook = 'sunny';
        if (current.weather_code > 1 && current.weather_code <= 3) outlook = 'overcast';
        if (current.weather_code > 3) outlook = 'rainy';

        const weatherData = {
          outlook,
          temp: current.temperature_2m,
          humidity: current.relative_humidity_2m,
          windy: current.wind_speed_10m > 15 ? 'yes' : 'no'
        };

        // Auto-submit the prediction with live data
        handlePrediction(weatherData);

      } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch live weather data');
        setLoading(false);
      }
    }, (error) => {
      console.error('Geolocation error:', error);
      alert('Unable to retrieve your location');
      setLoading(false);
    });
  };

  return (
    <div className="app">
      <BackgroundAnimation />
      <AmbientParticles />
      <MouseTrail />

      <div className="container">
        <Header onLiveAnalysis={fetchLiveWeather} />
        <Hero />

        <div className="main-card">
          {!showResults ? (
            <PredictionForm
              onSubmit={handlePrediction}
              loading={loading}
            />
          ) : (
            <Results
              results={results}
              onReset={handleReset}
            />
          )}
        </div>



        <Features />
        <Footer />
      </div>
    </div>
  );
}

export default App;
