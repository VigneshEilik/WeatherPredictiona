const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
    outlook: { type: String, required: true },
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    windy: { type: String, required: true },
    prediction: { type: Number, required: true },
    result: { type: String, required: true },
    confidence: { type: Number, required: false },
    probabilities: {
        stay_indoors: Number,
        go_outdoors: Number
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prediction', PredictionSchema);
