import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Car, Mail, Phone, MapPin } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img 
                src={user?.picture} 
                alt={user?.name}
                className="w-24 h-24 rounded-full border-4 border-blue-500"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </p>
                {user?.phone && (
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4" />
                    {user?.phone}
                  </p>
                )}
                {user?.city && (
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    {user?.city}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* User Type Badge */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Account Type</h2>
              <p className="text-gray-600 capitalize">
                {user?.userType === 'owner' ? 'Vehicle Owner' : 'Vehicle Renter'}
              </p>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl shadow-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome to RideShareX!</h2>
          <p className="text-blue-100">
            {user?.userType === 'owner' 
              ? 'Start listing your vehicles and earn money today!'
              : 'Browse thousands of vehicles available in your area!'}
          </p>
        </div>
      </div>
    </div>
  );
}