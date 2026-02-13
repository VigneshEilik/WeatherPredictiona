# 🌤️ Climate Predictor AI

> **AI-Powered Weather Analysis & Activity Planner**  
> *Real-time weather analysis using Machine Learning to recommend indoor vs. outdoor activities.*

![Project Badge](https://img.shields.io/badge/Status-Active-success)
![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📖 Project Overview

**Climate Predictor AI** is a modern, full-stack web application that combines the power of **Machine Learning** with real-time weather data to help users make smarter decisions about their day. 

Whether you're unsure if you should go for a run or stay in for a movie, our AI analyzes key meteorological factors—temperature, humidity, wind speed, and outlook—to provide an instant, data-backed recommendation.

### 🌟 Key Features

*   **🤖 AI-Powered Predictions**: Uses a trained **Decision Tree Classifier** (Scikit-Learn) to analyze weather patterns.
*   **⚡ Real-Time Analysis**: Fetches live local weather data via **Open-Meteo API** and geolocation.
*   **📊 Transparent Confidence**: Displays confidence scores and probability distributions for every prediction.
*   **🌤️ Dynamic UI**: A beautiful, responsive interface with glassmorphism design, animated backgrounds, and 3D effects.
*   **📜 Analysis History**: Automatically saves and displays your recent 5 predictions for quick reference.
*   **🚀 Hybrid Backend**: Seamlessly integrates **Node.js** (API & Database) with **Python** (ML Inference).

---

## 🛠️ Tech Stack

### Frontend
*   **React 19 & Vite**: Ultra-fast frontend tooling and modern React features.
*   **CSS3 Variables & Animations**: Custom-built design system with no external UI libraries.
*   **Glassmorphism**: Modern UI aesthetic with frosted glass effects and vibrant gradients.

### Backend & ML
*   **Node.js & Express**: Robust API handling and middleware.
*   **Python 3.9**: Powered by `Flask` for serverless inference.
*   **Scikit-Learn**: Decision Tree model for classification.
*   **NumPy & Pandas**: Data processing.

### Database & DevOps
*   **MongoDB**: NoSQL database for storing prediction history.
*   **Vercel**: Serverless deployment for both frontend and backend functions.

---

## 📸 Screenshots

*(Add your screenshots here! Recommended: Homepage, Analysis Result, and Mobile View)*

| **Home Dashboard** | **AI Analysis Result** |
|:---:|:---:|
| ![Home](https://placehold.co/600x400?text=Dashboard+Screenshot) | ![Result](https://placehold.co/600x400?text=Result+Screenshot) |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
*   Node.js (v18+)
*   Python (v3.9+)
*   MongoDB (Internet or Local Instance)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/VigneshEilik/WeatherPredictiona.git
    cd WeatherPredictiona
    ```

2.  **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    ```

3.  **Install Backend Dependencies**
    ```bash
    cd ../backend
    npm install
    ```

4.  **Install Python Dependencies**
    ```bash
    cd ..
    pip install -r requirements.txt
    ```

5.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

### Running Locally

1.  **Start the Backend**
    ```bash
    cd backend
    npm run dev
    ```

2.  **Start the Frontend** (in a new terminal)
    ```bash
    cd frontend
    npm run dev
    ```

3.  Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Live Demo

🚀 **[View Live Deployment on Vercel](https://weather-predictiona.vercel.app)**  
*(Replace with your actual Vercel URL once deployed)*

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/VigneshEilik">VigneshEilik</a>
</p>
