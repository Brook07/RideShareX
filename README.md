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

## 📊 Project Status

✅ **MVP Complete** - All core features implemented and functional

### Implementation Summary
- **Authentication System**: Fully operational with Google OAuth & JWT
- **User Verification**: Admin approval system for identity verification
- **Vehicle Management**: Complete CRUD operations with image upload
- **Booking Engine**: Request-based system with collision detection
- **Payment System**: Demo wallet with transaction tracking
- **Recommendation AI**: Behavior-based vehicle suggestions
- **File Uploads**: Cloudinary integration for profile & vehicle images

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ Google OAuth 2.0 integration for seamless login
- ✅ JWT-based authentication with 7-day token expiry
- ✅ Protected routes and middleware
- ✅ Secure password handling with bcrypt
- ✅ Session management with auto-logout

### 👤 User Management
- ✅ User registration with Google account
- ✅ Profile completion for new users
- ✅ Profile dashboard with user details
- ✅ Profile picture upload with Cloudinary
- ✅ Role-based system (Renter/Owner/Admin)
- ✅ Demo wallet balance system (Rs. 10,000 starting balance)

### 🛡️ User Verification System
- ✅ Citizenship document upload for identity verification
- ✅ Admin verification panel for document approval/rejection
- ✅ Verified user badge system
- ✅ Restrict vehicle listing to verified users only
- ✅ Multi-format support (JPEG, PNG, PDF)

### 🚘 Vehicle Management
- ✅ Vehicle listing with photos and descriptions
- ✅ Cloudinary integration for vehicle image storage
- ✅ Support for multiple vehicle types (Car, Bike, Scooter)
- ✅ Real-time availability tracking
- ✅ Public vehicle marketplace
- ✅ Owner's vehicle management dashboard
- ✅ Edit and delete vehicle functionality
- ✅ Vehicle rating system
- ✅ Location-based vehicle browsing

### 📅 Booking System
- ✅ Real-time booking request functionality
- ✅ Time-limited booking requests (5-minute expiration)
- ✅ Owner acceptance/rejection workflow
- ✅ Booking history for renters
- ✅ Rental request management for vehicle owners
- ✅ Automatic conflict detection (no overlapping bookings)
- ✅ Booking status tracking (Pending, Confirmed, Cancelled, Completed)
- ✅ Booking cancellation system

### 💳 Payment Integration
- ✅ Demo wallet payment system
- ✅ Automatic wallet balance deduction
- ✅ Money transfer between users (Renter → Owner)
- ✅ Transaction history with detailed breakdowns
- ✅ Payment snapshots with booking details
- ✅ Refund system for cancelled bookings
- ✅ Earnings dashboard for vehicle owners

### 🤖 AI-Powered Recommendation System
- ✅ Personalized vehicle recommendations
- ✅ Machine learning-based scoring algorithm
- ✅ User behavior analysis (booking history, preferences)
- ✅ Multi-factor recommendation scoring:
  - Vehicle type matching
  - Location preference
  - Price range compatibility
  - Time slot analysis
  - Recency and diversity scoring
- ✅ Intelligent fallback for new users

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
- **Multer** - File upload middleware
- **Cloudinary** - Image storage and management
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
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

**Replace:**
- `REACT_APP_GOOGLE_CLIENT_ID` - Same Google Client ID as backend
- `REACT_APP_CLOUDINARY_CLOUD_NAME` - Get from [Cloudinary Dashboard](https://cloudinary.com/)
- `REACT_APP_CLOUDINARY_UPLOAD_PRESET` - Create an unsigned upload preset in Cloudinary

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

### **Issue: Image upload fails**
**Cause:** Missing Cloudinary configuration  
**Solution:**
1. Verify Cloudinary credentials in `frontend/.env`
2. Create an unsigned upload preset in Cloudinary dashboard:
   - Settings → Upload → Add upload preset
   - Set Mode to "Unsigned"
   - Copy the preset name to `REACT_APP_CLOUDINARY_UPLOAD_PRESET`
3. Check browser console for detailed error messages

### **Issue: "User not verified" when adding vehicle**
**Cause:** User hasn't completed citizenship verification  
**Solution:**
1. Upload citizenship document from Dashboard → Profile section
2. Wait for admin approval (requires admin account)
3. Admin can approve from Admin Verification Panel (`/admin/verify`)

---

## 🎯 Key Highlights

### 🔐 Security Features
- JWT-based authentication with automatic token refresh
- Middleware-protected routes
- Citizenship verification system
- Admin role-based access control

### 💰 Payment System
- Demo wallet with Rs. 10,000 starting balance
- Real-time balance updates
- Automatic money transfer on booking confirmation
- Complete refund system for cancellations
- Detailed transaction history with booking snapshots

### 🤖 Smart Recommendations
- Analyzes up to 200 historical bookings
- Multi-factor scoring algorithm (10 factors)
- Considers: vehicle type, location, price, time slots, recency
- Intelligent fallback for new users

### 📸 Image Management
- Cloudinary integration for scalable storage
- Automatic image optimization
- Support for profile pictures, vehicle images, and documents
- Secure URL-based image delivery

### ⏱️ Booking Intelligence
- 5-minute automatic request expiration
- Conflict detection (no overlapping bookings)
- Owner approval workflow
- Cancellation with automatic refunds

---

## 📋 Project Structure
```
ridesharex/
├── backend/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   └── multer.js                # File upload configuration
│   ├── middleware/
│   │   ├── auth.js                  # JWT authentication
│   │   └── verifyUser.js            # User verification check
│   ├── models/
│   │   ├── Booking.js               # Booking schema
│   │   ├── Payment.js               # Payment transaction schema
│   │   ├── User.js                  # User schema with wallet
│   │   └── Vehicle.js               # Vehicle schema
│   ├── controllers/
│   │   ├── bookingController.js     # Booking logic
│   │   ├── paymentController.js     # Payment processing
│   │   ├── recommendationController.js  # AI recommendations
│   │   └── vehicleController.js     # Vehicle CRUD operations
│   ├── routes/
│   │   ├── auth.js                  # Authentication routes
│   │   ├── booking.js               # Booking routes
│   │   ├── payment.js               # Payment routes
│   │   ├── recommendation.js        # Recommendation routes
│   │   └── vehicle.js               # Vehicle routes
│   ├── services/
│   │   └── recommendationService.js # Recommendation algorithm
│   ├── scripts/
│   │   └── migrateUserVerification.js  # DB migration scripts
│   ├── .env                         # Environment variables (create this)
│   ├── server.js                    # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/                # Google login components
│   │   │   ├── common/              # Navbar, modals, etc.
│   │   │   └── PaymentModal.jsx     # Payment processing UI
│   │   ├── pages/
│   │   │   ├── auth/                # Login/signup pages
│   │   │   ├── bookings/            # My bookings, rental requests
│   │   │   ├── vehicles/            # Add/manage vehicles, book now
│   │   │   ├── AdminVerificationPage.jsx  # Admin verification panel
│   │   │   ├── DashBoardPage.jsx    # User dashboard & profile
│   │   │   ├── TransactionHistoryPage.jsx # Payment history
│   │   │   └── VehiclesPage.jsx     # Vehicle marketplace
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global auth state
│   │   ├── services/
│   │   │   └── apiService.js        # API client
│   │   ├── config/
│   │   │   └── api.js               # Axios configuration
│   │   └── App.jsx                  # Main app component
│   ├── public/
│   ├── .env                         # Environment variables (create this)
│   └── package.json
│
└── documentation/
    ├── VEHICLE_MANAGEMENT_SYSTEM.md
    ├── BOOKING_AND_PAYMENT_SYSTEM.md
    ├── RECOMMENDATION_SYSTEM.md
    ├── BECOME_HOST_PAGE_DOCUMENTATION.md
    └── api/
        ├── API_ENDPOINTS_REFERENCE.md
        └── API_WORKFLOW_GUIDE.md
```

---

## 📚 Documentation

Comprehensive documentation is available in the `documentation/` folder:

- **[API Endpoints Reference](documentation/api/API_ENDPOINTS_REFERENCE.md)** - Complete API documentation
- **[Vehicle Management System](documentation/VEHICLE_MANAGEMENT_SYSTEM.md)** - Vehicle CRUD operations
- **[Booking & Payment System](documentation/BOOKING_AND_PAYMENT_SYSTEM.md)** - Booking workflow & payment processing
- **[Recommendation System](documentation/RECOMMENDATION_SYSTEM.md)** - AI-powered recommendation algorithm
- **[Quick Start Guide](documentation/QUICK_START.md)** - Getting started tutorial

---

## 🚀 Getting Started with RideShareX

### First Time User Setup

1. **Sign Up / Login**
   - Click "Login with Google" on the landing page
   - Complete your profile (name, phone, address)
   - Starting wallet balance: Rs. 10,000

2. **Get Verified (To List Vehicles)**
   - Go to Dashboard → Profile section
   - Upload citizenship document (JPEG/PNG/PDF)
   - Wait for admin approval
   - Once approved, you can list vehicles

3. **Browse Vehicles**
   - Visit the Vehicles page to see available vehicles
   - Filter by location, type, price range
   - Get personalized recommendations based on your history

4. **Rent a Vehicle**
   - Click on any vehicle to view details
   - Select pickup and dropoff dates
   - Click "Book Now" to send a request
   - Request expires in 5 minutes if owner doesn't respond
   - Once owner accepts, payment is processed automatically

5. **List Your Vehicle (Verified Users Only)**
   - Go to "Become a Host" page
   - Click "Add New Vehicle"
   - Upload vehicle photo (Cloudinary)
   - Fill in details (make, model, price, location)
   - Vehicle appears in marketplace immediately

6. **Manage Bookings**
   - **As Renter**: View "My Bookings" to track rental status
   - **As Owner**: Check "Rental Requests" to approve/reject bookings
   - Cancel bookings (auto-refund if before confirmation)

7. **Track Transactions**
   - View transaction history from Dashboard
   - See payment details, booking snapshots
   - Monitor wallet balance

---

## 👤 User Roles

### **Renter** (Default)
- Browse and book vehicles
- View booking history
- Manage wallet transactions
- Get personalized recommendations

### **Owner** (Verified Users)
- All Renter privileges
- List unlimited vehicles
- Manage vehicle listings
- Accept/reject rental requests
- Earn from rentals (wallet credits)

### **Admin**
- All Owner privileges
- Approve/reject verification requests
- Access admin verification panel
- Manage platform users

---

## 📝 Environment Variables Reference

### Backend `.env`
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ridesharex

# Authentication
JWT_SECRET=your_random_secret_key
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Server
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`
```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Cloudinary (Image Upload)
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

## 🛠️ Development

### Tech Stack Summary

**Frontend:** React 19, React Router DOM 7, Tailwind CSS, Axios, Lucide React  
**Backend:** Node.js, Express 5, MongoDB, Mongoose, JWT, Multer  
**Cloud Services:** MongoDB Atlas, Cloudinary  
**Authentication:** Google OAuth 2.0

### API Architecture

- **RESTful API** design
- **JWT-based** authentication & authorization
- **Role-based access control** (Admin, Owner, Renter)
- **Middleware protection** for sensitive routes
- **Error handling** with descriptive messages
- **Request validation** at controller level

### Database Models

1. **User Model**: Profile, wallet, verification status, role
2. **Vehicle Model**: Details, pricing, ownership, ratings
3. **Booking Model**: Rental details, status tracking, expiration
4. **Payment Model**: Transaction records, snapshots, refunds

---

## 🤝 Contributing

This is a semester project for educational purposes. However, suggestions and feedback are welcome!


- Contact the development team

---
