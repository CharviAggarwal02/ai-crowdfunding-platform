<div align="center">

# 🚀 UpFund – AI-Powered Crowdfunding Platform

### Connecting Entrepreneurs & Investors Through Intelligent Funding Solutions

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-Language-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/SQLite-Database-003B57?style=for-the-badge&logo=sqlite" />
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" />
</p>

**A modern full-stack crowdfunding platform that helps startups raise funding while enabling investors to discover high-potential ventures using AI-powered insights.**

---

### 🌐 Live Links

🚀 **Frontend:** YOUR_FRONTEND_URL

⚡ **Backend API:** https://crowdfunding-platform-3.onrender.com

📚 **API Documentation:** https://crowdfunding-platform-3.onrender.com/docs

🎥 **Demo Video:** YOUR_YOUTUBE_DEMO

🌐 **Portfolio:** https://charvi-portfolio-v2.vercel.app/

</div>

---

# 📖 Overview

UpFund is an AI-powered crowdfunding platform designed to bridge the gap between entrepreneurs seeking investment and investors looking for promising startups.

The platform provides secure authentication, real-time communication, analytics dashboards, and AI-powered campaign prediction to improve funding success and investor decision-making.

---

# ❗ Problem Statement

Traditional crowdfunding platforms often struggle to provide intelligent insights for entrepreneurs and investors.

### Entrepreneurs face challenges such as:

- Finding the right investors
- Understanding campaign success probability
- Managing investor communication

### Investors struggle with:

- Identifying high-potential startups
- Tracking investments efficiently
- Making data-driven funding decisions

---

# 💡 Solution

UpFund provides an intelligent crowdfunding ecosystem where entrepreneurs can launch campaigns while investors can discover startups using AI-powered insights and analytics.

The platform combines:

- Secure Authentication
- Real-Time Messaging
- AI Prediction Model
- Investment Analytics
- Startup Discovery
- Modern Responsive UI

---

# ✨ Key Features

## 👨‍💼 Entrepreneur Portal

- Publish Startup Campaigns
- Manage Startup Profiles
- Track Funding Progress
- Share Campaign Updates
- Real-Time Investor Communication

---

## 💰 Investor Portal

- Browse Startups
- Investment Dashboard
- Campaign Details
- Portfolio Tracking
- Funding History

---

## 🤖 AI Prediction Engine

- Campaign Success Prediction
- Funding Goal Analysis
- Duration Analysis
- Intelligent Insights

---

## 📊 Analytics Dashboard

- Funding Statistics
- Investment Trends
- Startup Categories
- Portfolio Performance

---

## 💬 Real-Time Communication

- Socket.IO Messaging
- Startup Discussion Rooms
- Instant Notifications

---

# 🏗️ System Architecture

```text
                React + TypeScript
                        │
                        ▼
              FastAPI REST Backend
                        │
        ┌───────────────┴───────────────┐
        ▼                               ▼
   SQLAlchemy ORM                  AI Prediction Model
        │                               │
        ▼                               ▼
      SQLite                  Scikit-Learn Model
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- Chart.js

---

## Backend

- FastAPI
- SQLAlchemy
- SQLite
- Socket.IO

---

## Machine Learning

- Scikit-learn
- Pandas
- NumPy
- Joblib

---

## Deployment

- Vercel
- Render

---

# 🚀 Project Highlights

- ✅ AI-powered crowdfunding platform
- ✅ FastAPI REST APIs
- ✅ JWT Authentication
- ✅ Real-Time Messaging
- ✅ Responsive React Frontend
- ✅ Analytics Dashboard
- ✅ Machine Learning Integration
- ✅ Modular Backend Architecture

---

# 📂 Project Structure

```bash
UpFund/

├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── schemas/
│   │   ├── socket_manager.py
│   │   └── main.py
│   └── requirements.txt
│
├── public/
│
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

# 🔑 Core Functionalities

- User Authentication
- Campaign Management
- Investment Workflow
- AI Prediction
- Analytics Dashboard
- Real-Time Chat
- REST APIs
- Responsive Design

---

# 🌐 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/register` | Register User |
| POST | `/login` | User Login |
| GET | `/campaigns` | Fetch Campaigns |
| POST | `/campaigns` | Create Campaign |
| POST | `/invest` | Invest in Campaign |
| GET | `/analytics` | Dashboard Analytics |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/CharviAggarwal02/Crowdfunding_platform.git

cd Crowdfunding_platform
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

---

## Frontend Setup

```bash
npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 🔐 Environment Variables

```env
VITE_API_URL=http://localhost:8000
```

Production

```env
VITE_API_URL=https://crowdfunding-platform-3.onrender.com
```

---

# 📸 Application Screenshots

<img width="1917" height="911" alt="image" src="https://github.com/user-attachments/assets/e9f7e765-0671-4c03-a09d-c72cd8d439d4" /> 
<img width="1917" height="910" alt="image" src="https://github.com/user-attachments/assets/3e025111-c8d2-4e6f-8c74-ce4dc1260e75" />
<img width="1917" height="912" alt="image" src="https://github.com/user-attachments/assets/016e1bff-9e1a-42c0-af06-59a6ecee1529" /> 
<img width="1917" height="905" alt="image" src="https://github.com/user-attachments/assets/c06ef729-5c3b-4238-b091-361075a31c64" /> 
<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/dbfc54a1-9520-4cfb-9828-414ee1b21066" />

---

# 🎥 Demo Video

Add your project walkthrough video here.

---

# 🚧 Challenges Solved

During development, several technical challenges were addressed:

- Designing scalable REST APIs using FastAPI
- Integrating Machine Learning prediction models
- Managing real-time communication with Socket.IO
- Creating modular backend architecture
- Building responsive React components
- Optimizing database interactions

---

# 📈 Business Value

This platform demonstrates how AI can enhance crowdfunding by:

- Helping startups improve campaign planning
- Assisting investors with informed decisions
- Providing transparent funding analytics
- Enabling seamless entrepreneur-investor communication

---

# 🔮 Future Enhancements

- PostgreSQL Migration
- Docker Deployment
- Payment Gateway Integration
- AI Recommendation Engine
- Startup Verification
- Investor KYC
- Email Notifications
- Mobile Application
- CI/CD Pipeline
- Cloud Deployment

---

# 👩‍💻 Developer

## Charvi Aggarwal

**Software Engineer | Python Backend Developer | AI Integration Specialist**

🌐 Portfolio

https://charvi-portfolio-v2.vercel.app/

💼 LinkedIn

https://www.linkedin.com/in/charvi-aggarwal03/

💻 GitHub

https://github.com/CharviAggarwal02

---

# 📄 License

This project is released for educational and portfolio purposes.

---

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

**Open to Freelance Opportunities • Backend Development • FastAPI • AI Solutions**

</div>
