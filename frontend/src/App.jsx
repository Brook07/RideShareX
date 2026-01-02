import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterDetailsPage from './pages/auth/RegisterDetailsPage';
import LandingPage from './pages/LandingPage';
import VehiclesPage from './pages/VehiclesPage';
import DashboardPage from './pages/DashBoardPage';
import AddVehiclePage from './pages/vehicles/AddVehiclePage';
import BookNowPage from './pages/vehicles/BookNowPage';
import BecomeHostPage from './pages/vehicles/BecomeHostPage';
import ManageVehiclesPage from './pages/vehicles/ManageVehiclesPage';
import MyBookingsPage from './pages/bookings/MyBookingsPage';
import RentalRequestsPage from './pages/bookings/RentalRequestsPage';
import PaymentPage from './pages/payment/PaymentPage';
import PaymentSuccessPage from './pages/payment/PaymentSuccessPage';
import PaymentFailurePage from './pages/payment/PaymentFailurePage';
import './styles/animations.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

// Public Route Component
function PublicRoute({ children }) {
  const { user } = useAuth();
  
  if (user && user.isProfileComplete) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/register-details" element={
        <ProtectedRoute>
          <RegisterDetailsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/home" element={
        <ProtectedRoute>
          <LandingPage />
        </ProtectedRoute>
      } />
      
      <Route path="/vehicles" element={
        <ProtectedRoute>
          <VehiclesPage />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />

<Route path="/AddVehicle" element={
        <ProtectedRoute>
          <AddVehiclePage />
        </ProtectedRoute>
      } />

      <Route path="/add-vehicle" element={
        <ProtectedRoute>
          <AddVehiclePage />
        </ProtectedRoute>
      } />

      <Route path="/become-host" element={
        <ProtectedRoute>
          <BecomeHostPage />
        </ProtectedRoute>
      } />

      <Route path="/manage-vehicles" element={
        <ProtectedRoute>
          <ManageVehiclesPage />
        </ProtectedRoute>
      } />

      <Route path="/book-now" element={
        <ProtectedRoute>
          <BookNowPage />
        </ProtectedRoute>
      } />

      <Route path="/my-bookings" element={
        <ProtectedRoute>
          <MyBookingsPage />
        </ProtectedRoute>
      } />

      <Route path="/bookings" element={
        <ProtectedRoute>
          <MyBookingsPage />
        </ProtectedRoute>
      } />

      <Route path="/rental-requests" element={
        <ProtectedRoute>
          <RentalRequestsPage />
        </ProtectedRoute>
      } />

      <Route path="/payment" element={
        <ProtectedRoute>
          <PaymentPage />
        </ProtectedRoute>
      } />

      <Route path="/payment-success" element={
        <ProtectedRoute>
          <PaymentSuccessPage />
        </ProtectedRoute>
      } />

      <Route path="/payment-failure" element={
        <ProtectedRoute>
          <PaymentFailurePage />
        </ProtectedRoute>
      } />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;