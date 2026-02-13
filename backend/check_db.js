const mongoose = require('mongoose');
const Prediction = require('./models/Prediction');
const dotenv = require('dotenv');

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/weather_app';

mongoose.connect(mongoURI)
    .then(async () => {
        console.log('Connected to MongoDB');

        // List all databases to show where it is
        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        const dbs = await admin.listDatabases();
        console.log('Available Databases:');
        dbs.databases.forEach(db => console.log(` - ${db.name}`));

        console.log('\nChecking "weather_app" database...');
        const count = await Prediction.countDocuments();
        console.log(`Found ${count} documents in the "predictions" collection.`);

        if (count > 0) {
            const latest = await Prediction.findOne().sort({ timestamp: -1 });
            console.log('\nLatest Prediction Data:');
            console.log(latest);
        }

        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error:', err);
        process.exit(1);
    });
