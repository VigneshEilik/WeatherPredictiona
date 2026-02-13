const mongoose = require('mongoose');
// Define schema inline to avoid relative path issues
const PredictionSchema = new mongoose.Schema({
    outlook: String,
    temp: Number,
    humidity: Number,
    windy: String,
    prediction: Number,
    result: String,
    confidence: Number,
    probabilities: {
        stay_indoors: Number,
        go_outdoors: Number
    },
    timestamp: { type: Date, default: Date.now }
});
const Prediction = mongoose.model('Prediction', PredictionSchema);

mongoose.connect('mongodb://localhost:27017/weather_app')
    .then(async () => {
        console.log('--- MongoDB Connection Info ---');
        console.log(`Database Name: weather_app`);
        console.log(`Host: localhost`);
        console.log(`Port: 27017`);

        console.log('\n--- Collection Info ---');
        // Mongoose pluralizes model name 'Prediction' -> 'predictions'
        console.log(`Collection Name: predictions`);

        const count = await Prediction.countDocuments();
        console.log(`Total Documents: ${count}`);

        if (count > 0) {
            const latest = await Prediction.findOne().sort({ timestamp: -1 });
            console.log('\n--- Latest Document Example ---');
            console.log(JSON.stringify(latest, null, 2));
        } else {
            console.log('\nNo data found yet. Make a prediction on the website first!');
        }

        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
