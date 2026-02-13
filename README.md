# 🌤️ Climate Predictor AI - MERN Stack Application

A stunning full-stack application combining React frontend with Express/Node.js backend and MongoDB, powered by Python Machine Learning!

![React](https://img.shields.io/badge/React-19-blue) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![Express](https://img.shields.io/badge/Express-4.0-lightgrey) ![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green) ![Python](https://img.shields.io/badge/Python-3.8+-yellow)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+ (with `scikit-learn` and `numpy` installed)
- MongoDB running locally on default port (27017)

### Installation & Running

**1. Install Dependencies** (Root Directory)
```bash
npm install
npm run install-all
```

**2. Start Application**
```bash
npm start
```
This will start both the Backend (port 5000) and Frontend (port 5173) concurrently.

**3. Open Your Browser**
Navigate to: **http://localhost:5173** (or the port shown in terminal)

## ✨ Features

### 🎨 **Ultra Stunning UI**
- **100+ Confetti Particles** in mixed shapes  
- **50 Ambient Floating Particles**
- **5 Firework Bursts** on prediction
- **Mouse Trail Effect** following cursor
- **Animated Starfield** background
- **Rainbow Gradient Text** with infinite animation
- **3D Card Transforms** on hover
- **Pulsing Glow Effects** throughout
- **Glassmorphism Design** with blur effects
- **Smooth Progress Bars** with shimmer
- **Animated Number Counters**

### 🤖 **AI Machine Learning**
- Decision Tree Classifier
- 4 weather features analysis
- Real-time predictions
- Confidence scores
- Probability distributions

### ⚛️ **Modern Tech Stack (MERN)**
- React 19 with Hooks
- Express & Node.js Backend
- MongoDB Database
- Python Integration for ML

## 📁 Project Structure

```
demo/
├── backend/                 # Express/Node.js backend
│   ├── models/              # Mongoose models
│   ├── .env                 # Backend environment variables
│   ├── index.js             # Server entry point
│   ├── predict_script.py    # Python ML script
│   └── package.json
├── frontend/                # React application
│   ├── src/                 # Source code
│   ├── .env                 # Frontend environment variables
│   └── ...
├── climate.pkl              # Trained ML model
├── package.json             # Root scripts
└── README.md                # This file
```

## 🔑 Environment Variables

The application uses `.env` files to manage configuration. I have already created these for you!

**Backend (`backend/.env`):**
```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/weather_app
```

**Frontend (`frontend/.env`):**
```ini
VITE_API_BASE_URL=http://localhost:5000
```

## 🎯 How It Works

### MERN + Python Architecture

1. **User fills form** on React Frontend.
2. **React sends POST** to Express Backend (`/api/predict`).
3. **Express spawns** a Python process to run the ML model (`climate.pkl`).
4. **Prediction result** is returned to Express.
5. **Express saves** the prediction to MongoDB for history.
6. **Result returned** to Frontend for display.

### API Endpoints

**POST** `/api/predict`
```json
{
  "outlook": "sunny",
  "temp": 25.5,
  "humidity": 65,
  "windy": "no"
}
```

**Response:**
```json
{
  "prediction": 1,
  "result": "Yes, Great day for outdoor activities! 🌞",
  "confidence": 85.5,
  "probabilities": {
    "stay_indoors": 14.5,
    "go_outdoors": 85.5
  }
}
```

**GET** `/api/history`
Returns recent prediction history from MongoDB.

**GET** `/api/model-info`
Returns information about the ML model.

## 🎨 Animation Showcase

### On Page Load
- Sliding header animation
- Fading hero section
- Card float-in effect
- Particle system initialization
- Logo spinning
- Badge shimmer

### On Form Interaction  
- Input glow on focus
- Hover lift effects
- Button pulsing
- Ripple effects
- 3D transforms

### On Prediction
- Screen flash
- 50 sparkle burst particles
- 100 confetti pieces (circles & squares)
- 5 firework explosions
- Animated number counters
- Progress bar animations
- Icon bounce-in
- Result text rainbow effect

### Continuous
- Mouse trail particles
- 50 floating ambient particles
- Starfield shimmer
- Grid movement
- Gradient orb rotation
- Badge dot pulsing
- Background orbs floating

## 🛠️ Development

### React Development
```bash
cd frontend
npm run dev        # Start dev server
```

### Backend Development
```bash
cd backend
npm start          # Start server logic
```

## 📊 ML Model Details

- **Algorithm**: Decision Tree Classifier
- **Features**: outlook, temperature, humidity, wind
- **Classes**: Stay Indoors (0), Go Outdoors (1)
- **Training**: Pre-trained on weather patterns

## 🌟 Future Enhancements

- [ ] More ML models (Random Forest, Neural Network)
- [ ] Historical predictions tracking
- [ ] User authentication
- [ ] Location-based weather API integration
- [ ] Mobile app version
- [ ] Dark/Light theme toggle
- [ ] Export prediction results

## 📝 License

Open source for educational purposes

## 👨‍💻 Tech Stack Summary

**Frontend:**
- React 19
- Vite
- CSS3 with advanced animations

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- Python (ML Interface)

---

**Built with ❤️ and extreme attention to animations!** 🎨✨🚀

**Enjoy the most stunning MERN climate prediction app ever!** 🌤️
