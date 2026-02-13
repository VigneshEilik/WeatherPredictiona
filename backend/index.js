const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { spawn } = require('child_process');
const Prediction = require('./models/Prediction');
const dotenv = require('dotenv');
// Cluster removed for Vercel/Serverless compatibility
const NodeCache = require('node-cache');

dotenv.config();

// Initialize Cache
const appCache = new NodeCache({ stdTTL: 60 }); // Cache TTL of 60 seconds by default

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/weather_app')
    .then(() => console.log(`MongoDB Connected`))
    .catch(err => console.log(`MongoDB Connection Error:`, err));

// Cache Middleware
const cacheMiddleware = (duration) => (req, res, next) => {
    if (req.method !== 'GET') {
        return next();
    }

    const key = req.originalUrl || req.url;
    const cachedResponse = appCache.get(key);

    if (cachedResponse) {
        console.log(`Serving from cache: ${key}`);
        res.set('X-Cache', 'HIT');
        return res.json(cachedResponse);
    } else {
        console.log(`Cache miss: ${key}`);
        res.set('X-Cache', 'MISS');
        const originalJson = res.json;
        res.json = (body) => {
            appCache.set(key, body, duration);
            return originalJson.call(res, body);
        };
        next();
    }
};

// Routes
app.get('/', (req, res) => {
    res.send(`Weather App Backend Running`);
});

// Predict Route (Note: On Vercel, this might need a Python Runtime Function if spawn fails)
app.post('/api/predict', async (req, res) => {
    try {
        const { outlook, temp, humidity, windy } = req.body;

        // Use Python script for prediction
        // On Vercel, this requires the environment to have Python + Deps installed.
        // We will fallback to a Vercel Python Function if this is deployed to Vercel.
        const pythonProcess = spawn('python', [path.join(__dirname, 'predict_script.py')]);

        let dataString = '';
        let errorString = '';

        pythonProcess.stdout.on('data', (data) => {
            dataString += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorString += data.toString();
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                console.error(`Python script exited with code ${code}`);
                console.error(`Stderr: ${errorString}`);
                return res.status(500).json({ error: 'Prediction model failed' });
            }

            try {
                const result = JSON.parse(dataString);

                if (result.error) {
                    return res.status(400).json({ error: result.error });
                }

                // Save to MongoDB
                const newPrediction = new Prediction({
                    outlook,
                    temp,
                    humidity,
                    windy,
                    prediction: result.prediction,
                    result: result.result,
                    confidence: result.confidence,
                    probabilities: result.probabilities
                });

                await newPrediction.save();

                // Keep only the latest 5 predictions
                const allPredictions = await Prediction.find().sort({ timestamp: -1 });
                if (allPredictions.length > 5) {
                    const idsToDelete = allPredictions.slice(5).map(p => p._id);
                    await Prediction.deleteMany({ _id: { $in: idsToDelete } });
                }

                // Clear history cache
                appCache.del('/api/history');

                res.json(result);
            } catch (e) {
                console.error('JSON Parse Error:', e);
                console.error('Raw Output:', dataString);
                res.status(500).json({ error: 'Failed to process prediction result' });
            }
        });

        pythonProcess.stdin.write(JSON.stringify(req.body));
        pythonProcess.stdin.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

// History Route
app.get('/api/history', cacheMiddleware(60), async (req, res) => {
    try {
        const history = await Prediction.find().sort({ timestamp: -1 }).limit(5);
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Model Info Route
app.get('/api/model-info', cacheMiddleware(3600), (req, res) => {
    res.json({
        model_type: 'Decision Tree Classifier',
        features: ['outlook', 'temperature', 'humidity', 'windy'],
        classes: ['Stay Indoors', 'Go Outdoors'],
        n_features: 4
    });
});

// For Vercel, we export the app. For local dev, we listen.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

module.exports = app;
