# Deployment Guide for Vercel

This project is optimized for Vercel deployment. It uses a hybrid approach:
- **Frontend**: Vite + React (Static Build)
- **Backend (API)**: Node.js (Serverless Function)
- **Prediction Engine**: Python (Serverless Function)

## Prerequisites

1.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
2.  **MongoDB Atlas**: You need a cloud-hosted MongoDB database (e.g., MongoDB Atlas). Obtain the Connection String (URI).

## Environment Variables

When deploying to Vercel, you must set the following Environment Variables in the Vercel Project Settings:

-   `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/weather_app`).
-   `VITE_API_BASE_URL`: (Optional) Leave empty to use relative paths, or set if needed.
-   `PYTHON_VERSION`: `3.9` (Usually set automatically by vercel.json).

## Deployment Steps

1.  **Install Vercel CLI** (Optional but recommended):
    ```bash
    npm i -g vercel
    ```

2.  **Deploy**:
    Run the following command from the root directory:
    ```bash
    vercel
    ```
    Follow the prompts to link the project.

3.  **Manual Deployment (Git)**:
    -   Push this code to a GitHub/GitLab/Bitbucket repository.
    -   Import the project in Vercel Dashboard.
    -   Vercel should automatically detect `vercel.json` and configure the build.

## How it Works

-   The `vercel.json` configures the routing.
-   `/api/predict` is routed to a Python Serverless Function (`api/predict.py`).
-   Other `/api/*` routes are handled by the Node.js backend (`backend/index.js`).
-   The Frontend is built and served as static files.

## Local Development

You can still run the project locally using:
```bash
npm run start
```
(This runs `npm run server` and `npm run client` concurrently).
Locally, the Node backend handles predictions by spawning a Python subprocess, ensuring everything works without Vercel emulation.
