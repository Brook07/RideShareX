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

      <Route path="/book-now" element={
        <ProtectedRoute>
          <BookNowPage />
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