# 🚗 RideShareX - Peer-to-Peer Vehicle Rental Platform


[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://developers.google.com/identity/protocols/oauth2)

## 📖 Abstract

**RideShareX** is a peer-to-peer vehicle renting platform that enables users to rent and lend vehicles within their community. Instead of depending on rental agencies, people can list their own cars, bikes, or scooters for others to rent. This promotes the shared economy, helps owners earn passive income, and provides renters with flexible and budget-friendly options.

The application is developed using the **MERN stack** (MongoDB, Express, React, Node.js) for scalable, full-stack functionality. It features **Google OAuth authentication**, **JWT-based sessions**, **real-time booking**, and **payment integration**. RideShareX aims to redefine mobility by creating a safe, transparent, and community-powered vehicle sharing ecosystem that bridges the gap between ownership and accessibility.

**Keywords:** peer-to-peer renting, vehicle sharing, MERN stack, RideShareX, community mobility, real-time booking, shared economy, car rental platform

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ Google OAuth 2.0 integration for seamless login
- ✅ JWT-based authentication with 7-day token expiry
- ✅ Protected routes and middleware
- ✅ Secure password handling with bcrypt

### 👤 User Management
- ✅ User registration with Google account
- ✅ Profile completion for new users
- ✅ Profile dashboard with user details
- ✅ Role-based system (Renter/Owner)

### 🚘 Vehicle Management (Coming Soon)
- 🔄 Vehicle listing with photos and descriptions
- 🔄 Real-time availability tracking
- 🔄 Search and filter vehicles by location
- 🔄 Vehicle rating and review system

### 📅 Booking System (Coming Soon)
- 🔄 Real-time booking functionality
- 🔄 Booking history and management
- 🔄 Calendar integration for availability
- 🔄 Booking confirmation notifications

### 💳 Payment Integration (Coming Soon)
- 🔄 Secure payment gateway integration
- 🔄 Earnings dashboard for vehicle owners
- 🔄 Transaction history
- 🔄 Automated payment processing

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **@react-oauth/google** - Google authentication
- **jwt-decode** - JWT token decoding

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JSON Web Token (JWT)** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Visual Studio Code** - Code editor
- **Postman** - API testing
- **Git & GitHub** - Version control
- **Nodemon** - Auto-restart server
- **Google Keep** - Task tracking

---

# 🚀 RideShareX - Quick Start Guide

## 📥 After Cloning the Repository

### **Step 1: Clone and Navigate**
```bash
# Clone the repository
git clone https://github.com/yourusername/ridesharex.git

# Navigate into the project
cd ridesharex
```

---

## 🔴 Backend Setup

### **Step 2: Setup Backend**
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# For Windows (PowerShell)
New-Item .env

# For Mac/Linux
touch .env
```

### **Step 3: Configure Backend Environment Variables**

Open `backend/.env` and add:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ridesharex?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
FRONTEND_URL=http://localhost:3000
```

**Replace with your actual values:**
- `MONGODB_URI` - Get from [MongoDB Atlas](https://cloud.mongodb.com/)
- `JWT_SECRET` - Any random string (e.g., `my_secret_key_12345`)
- `GOOGLE_CLIENT_ID` - Get from [Google Console](https://console.cloud.google.com/)

### **Step 4: Start Backend Server**
```bash
# Run the server
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
```

✅ **Keep this terminal running!**

---

## 🔵 Frontend Setup

### **Step 5: Setup Frontend** (Open new terminal)
```bash
# Navigate to frontend folder (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
# For Windows (PowerShell)
New-Item .env

# For Mac/Linux
touch .env
```

### **Step 6: Configure Frontend Environment Variables**

Open `frontend/.env` and add:
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

**Replace:**
- `REACT_APP_GOOGLE_CLIENT_ID` - Same Google Client ID as backend

### **Step 7: Start Frontend Server**
```bash
# Run the React app
npm start
```

**Expected Output:**
```
Compiled successfully!

Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

✅ **Browser will automatically open at http://localhost:3000**

---

## ✅ Access the Application

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## 🎯 Quick Commands Summary

### **Option 1: Run Both Servers Simultaneously (Recommended)**
```bash
# From project root - Install concurrently first
npm install

# Start both servers at once
npm run dev

# OR start individually
npm run start:backend   # Backend only
npm run start:frontend  # Frontend only
```

### **Option 2: Run Servers Separately (Manual)**
```bash
# ============ BACKEND ============
cd backend
npm install
# Create and configure .env file
npm run dev

# ============ FRONTEND ============ (New terminal)
cd frontend
npm install
# Create and configure .env file
npm start
```

### **Initial Setup**
```bash
# Install all dependencies (backend + frontend) at once
npm run install:all

# Or install separately
npm run install:backend
npm run install:frontend
```

## 🐛 Common Issues & Solutions

### **Issue: "Cannot find module" Error**
**Cause:** Running `node server.js` from wrong directory  
**Solution:** Always run from the correct directory:
```bash
# ❌ Wrong (from project root)
node server.js

# ✅ Correct
cd backend
node server.js

# OR use npm scripts (works from anywhere)
npm run start:backend
```

### **Issue: "Port 3000 is already in use"**
**Cause:** Previous React dev server still running  
**Solution:**
```powershell
# Windows PowerShell - Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force

# OR find and kill manually
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# OR choose different port when prompted by React
# Press 'Y' when asked "Would you like to run on another port?"
```

### **Issue: Backend crashes on startup**
**Cause:** Missing environment variables or MongoDB connection  
**Solution:**
1. Verify `.env` file exists in `backend/` directory
2. Check MongoDB URI is correct
3. Ensure MongoDB Atlas IP whitelist includes your IP
4. Check terminal output for specific error messages

## 📋 Project Structure
```
ridesharex/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env (create this)
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    ├── public/
    ├── .env (create this)
    └── package.json
```

