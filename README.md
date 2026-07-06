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
<img width="1917" height="911" alt="image" src="https://github.com/user-attachments/assets/e9f7e765-0671-4c03-a09d-c72cd8d439d4" />
<img width="1917" height="910" alt="image" src="https://github.com/user-attachments/assets/3e025111-c8d2-4e6f-8c74-ce4dc1260e75" />
<img width="1917" height="912" alt="image" src="https://github.com/user-attachments/assets/016e1bff-9e1a-42c0-af06-59a6ecee1529" />
<img width="1917" height="905" alt="image" src="https://github.com/user-attachments/assets/c06ef729-5c3b-4238-b091-361075a31c64" />
<img width="1917" height="907" alt="image" src="https://github.com/user-attachments/assets/dbfc54a1-9520-4cfb-9828-414ee1b21066" />


# Demo Video


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

Portfolio: https://charvi-portfolio-v2.vercel.app/

---

## 📄 License

This project is developed for educational and portfolio purposes.
