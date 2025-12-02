import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import { Car, Calendar, DollarSign, Star, TrendingUp, Settings } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { icon: Car, label: 'Total Bookings', value: '12', color: 'blue' },
    { icon: Calendar, label: 'Active Rentals', value: '2', color: 'green' },
    { icon: DollarSign, label: 'Total Spent', value: 'NPR 45,000', color: 'purple' },
    { icon: Star, label: 'Reviews Given', value: '8', color: 'yellow' }
  ];

  const recentBookings = [
    {
      id: 1,
      vehicle: 'Toyota Camry 2023',
      date: '2025-01-15 to 2025-01-18',
      status: 'Completed',
      amount: 'NPR 15,000'
    },
    {
      id: 2,
      vehicle: 'Honda Activa 2023',
      date: '2025-01-20 to 2025-01-22',
      status: 'Active',
      amount: 'NPR 1,600'
    },
    {
      id: 3,
      vehicle: 'Hyundai Creta 2023',
      date: '2025-01-10 to 2025-01-12',
      status: 'Completed',
      amount: 'NPR 14,000'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your rentals</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{booking.vehicle}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{booking.date}</p>
                  <p className="text-blue-600 font-bold">{booking.amount}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/bookings')}
              className="w-full mt-6 px-4 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
            >
              View All Bookings
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/vehicles')}
                className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Vehicles
              </button>
              <button
                onClick={() => navigate('/bookings')}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                My Bookings
              </button>
              <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-5 h-5 inline mr-2" />
                Account Settings
              </button>
            </div>

            {/* User Info */}
            <div className="mt-8 pt-6 border-t">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
                <div>
                  <p className="font-bold text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{user?.userType}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{user?.email}</p>
                {user?.phone && <p>{user?.phone}</p>}
                {user?.city && <p>{user?.city}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}