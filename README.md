# ShopEasy Full-Stack Project

A full-stack e-commerce application built with Node.js, Express, MongoDB, and Vanilla JS.

## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/) installed and running locally on port `27017`.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file (already created):
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shopeasy
   ```

## Running the App

1. Start the server (this serves both backend and frontend):
   ```bash
   npm start
   ```
   Or manually:
   ```bash
   node server.js
   ```

2. Open your browser and visit:
   `http://localhost:5000`

## Seeding Data

To populate the database with initial products:
1. Ensure the server is running.
2. Run the seed command (via API):
   ```bash
   # PowerShell
   Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/products/seed"
   ```
