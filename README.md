# 🚀 UpFund – AI-Powered Crowdfunding Platform

UpFund is a modern crowdfunding platform that connects entrepreneurs and investors through an intuitive web application. The platform enables startups to publish funding campaigns, investors to discover promising ventures, and both parties to communicate seamlessly.

# Problem Statement
Startups often struggle to discover investors,
while investors face challenges identifying promising ventures.

This platform bridges that gap using AI-driven project insights,
secure authentication,
and an intuitive crowdfunding workflow.

## 🌟 Features

### 👨‍💼 Entrepreneur Features

* Publish startup campaigns
* Manage startup profiles
* Track funding progress
* Post updates for investors
* Communicate with investors through real-time messaging

### 💰 Investor Features

* Browse startups by category
* View detailed startup information
* Invest in startup campaigns
* Track investment portfolio
* Receive startup updates

### 🤖 AI-Powered Prediction

* Predict campaign success probability
* Analyze funding goals and campaign duration
* Generate insights for entrepreneurs

### 📊 Analytics Dashboard

* Funding statistics
* Category-wise startup analysis
* Investment trends
* Portfolio performance tracking

### 💬 Real-Time Communication

* Socket.IO powered messaging
* Startup-specific discussion rooms
* Instant notifications

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TypeScript
* Vite
* Tailwind CSS
* Chart.js

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Socket.IO

### Machine Learning

* Scikit-learn
* Pandas
* NumPy
* Joblib

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```bash
UpFund/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── socket_manager.py
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   └── socket.ts
│
├── package.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/CharviAggarwal02/Crowdfunding_platform.git
cd Crowdfunding_platform
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

### 3. Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

Production:

```env
VITE_API_URL=https://crowdfunding-platform-3.onrender.com
```

---

## 🌐 Live Deployment

### Backend

https://crowdfunding-platform-3.onrender.com

### API Documentation

https://crowdfunding-platform-3.onrender.com/docs

---

## 📸 Screenshots

Add screenshots here:

* Home Page
* Startup Browse Page
* Startup Details Page
* Investor Dashboard
* Entrepreneur Dashboard
* Analytics Dashboard

---

## 🚀 Future Enhancements

* PostgreSQL Integration
* Payment Gateway Integration
* AI Recommendation System
* Startup Verification System
* Investor KYC
* Mobile Application
* Email Notifications
* Multi-language Support

---

## 👩‍💻 Developer

**Charvi Aggarwal**

GitHub: https://github.com/CharviAggarwal02

LinkedIn: https://www.linkedin.com/in/charvi-aggarwal03/

Portfolio: https://charviaggarwal02.github.io/CHARVI-portfolio/

---

## 📄 License

This project is developed for educational and portfolio purposes.
