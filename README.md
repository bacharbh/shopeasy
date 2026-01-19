# 🛒 ShopEasy - Premium E-commerce Experience

![ShopEasy Banner](https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80)

ShopEasy is a modern, full-stack e-commerce application designed with a premium aesthetic and high-performance features. It features a sleek glassmorphism UI, a robust Node.js/MongoDB backend, and a fully responsive design.

## ✨ Features

- **💎 Premium Design**: Modern UI with glassmorphism, smooth gradients, and micro-animations.
- **🌓 Dark Mode**: Built-in theme switcher with persistent user preference.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices.
- **🛍️ Complete Shopping Flow**:
  - Dynamic product catalog with search and sorting.
  - Interactive product details with thumbnail gallery.
  - Live cart sidebar for quick adjustments.
  - Comprehensive checkout with promo code support and order confirmation.
- **📬 Dynamic Contact Form**: Fully functional form with loading states and user feedback.
- **⚙️ Powered by MongoDB**: Data-driven architecture with easy-to-use seeding scripts.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Variables/Glassmorphism), JavaScript (ES6+).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB with Mongoose ODM.
- **Icons & Fonts**: FontAwesome 6, Google Fonts (Inter).

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bacharbh/shopeasy.git
   cd shopeasy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/shopeasy
   ```

4. **Seed the Database**:
   Populate your MongoDB with premium products:
   ```bash
   node seed_db.js
   ```

5. **Run the Server**:
   ```bash
   node server.js
   ```
   Open `http://localhost:5000` in your browser.

## 📁 Project Structure

```text
├── models/         # Database schemas
├── routes/         # API endpoints
├── config/         # Database connection logic
├── script.js       # Core frontend logic
├── style.css       # Premium styling system
├── index.html      # Landing page
├── seed_db.js      # Database seeding utility
└── server.js       # Express server entry point
```

## 🤝 Developed by
**Bachar Ben Hassine**

---
*Created as a part of a premium full-stack development showcase.*
