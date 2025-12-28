import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import axios from 'axios';
import { Car, Calendar, DollarSign, Star, Mail, Phone, MapPin, ChevronRight, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeRentals: 0,
    totalSpent: 0,
    completedBookings: 0
  });

  // Fetch real bookings from API
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/bookings/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const userBookings = res.data.bookings || [];
      setBookings(userBookings);
      
      // Calculate stats
      const total = userBookings.length;
      const active = userBookings.filter(b => b.status === 'CONFIRMED').length;
      const completed = userBookings.filter(b => b.status === 'COMPLETED').length;
      const totalSpent = userBookings
        .filter(b => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      
      setStats({
        totalBookings: total,
        activeRentals: active,
        totalSpent: totalSpent,
        completedBookings: completed
      });
    } catch (err) {
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      CONFIRMED: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
      CANCELLED: { bg: 'bg-gray-100', text: 'text-gray-700', icon: XCircle },
      COMPLETED: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CheckCircle },
      EXPIRED: { bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertCircle }
    };
    const style = styles[status] || styles.PENDING;
    const Icon = style.icon;
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${style.bg} ${style.text}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const statsData = [
    { icon: Car, label: 'Total Bookings', value: stats.totalBookings, color: 'blue' },
    { icon: Calendar, label: 'Active Rentals', value: stats.activeRentals, color: 'green' },
    { icon: DollarSign, label: 'Total Spent', value: `NPR ${stats.totalSpent.toLocaleString()}`, color: 'purple' },
    { icon: Star, label: 'Completed', value: stats.completedBookings, color: 'yellow' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={user?.picture}
                alt={user?.name}
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            
            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-3">{user?.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-blue-100">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </span>
                {user?.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {user?.phone}
                  </span>
                )}
                {user?.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {user?.city}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: Car },
            { id: 'profile', label: 'Profile Info', icon: Mail }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
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

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No bookings yet</p>
                  <button
                    onClick={() => navigate('/vehicles')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Vehicles
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                          {booking.vehicle?.image && (
                            <img
                              src={booking.vehicle.image}
                              alt={booking.vehicle?.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <h3 className="font-bold text-gray-900">{booking.vehicle?.name || 'Vehicle'}</h3>
                            <p className="text-gray-600 text-sm">
                              {formatDate(booking.pickupDate)} - {formatDate(booking.dropoffDate)}
                            </p>
                            <p className="text-blue-600 font-bold mt-1">NPR {booking.totalPrice?.toLocaleString()}</p>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {bookings.length > 0 && (
                <button
                  onClick={() => navigate('/bookings')}
                  className="w-full mt-4 px-4 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                >
                  View All Bookings
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user?.name || '-'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user?.email || '-'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user?.phone || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">{user?.city || 'Not provided'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}