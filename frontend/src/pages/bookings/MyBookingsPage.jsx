import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/common/Navbar";
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  RefreshCw,
  CreditCard
} from "lucide-react";

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    fetchBookings();
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchBookings, 120000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookings/user", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    setCancelling(bookingId);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookings();
    } catch (err) {
      console.error("Cancel booking error:", err);
      alert(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancelling(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: Clock,
        label: "Pending Approval"
      },
      CONFIRMED: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
        label: "Confirmed"
      },
      AWAITING_PAYMENT: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: CreditCard,
        label: "Awaiting Payment"
      },
      REJECTED: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: XCircle,
        label: "Rejected"
      },
      CANCELLED: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: XCircle,
        label: "Cancelled"
      },
      COMPLETED: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: CheckCircle,
        label: "Completed"
      }
    };

    const config = statusConfig[status] || statusConfig.PENDING;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-4 h-4" />
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeRemaining = (expiresAt) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry - now;
    
    if (diff <= 0) return "Expired";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-1">Track your vehicle booking requests</p>
          </div>
          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-6">Start by booking a vehicle</p>
            <button
              onClick={() => navigate("/vehicles")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Vehicles
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="md:flex">
                  {/* Vehicle Image */}
                  <div className="md:w-64 h-48 md:h-auto">
                    <img
                      src={booking.vehicle?.image && booking.vehicle.image !== '/photos/default-car.jpg'
                        ? booking.vehicle.image
                        : "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500"}
                      alt={booking.vehicle?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {booking.vehicle?.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {booking.vehicle?.make} {booking.vehicle?.model}
                        </p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDate(booking.pickupDate)} → {formatDate(booking.dropoffDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{booking.vehicle?.location}</span>
                      </div>
                    </div>

                    {/* Price and Duration */}
                    <div className="flex items-center gap-6 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Duration</span>
                        <p className="font-semibold">{booking.totalDays} days</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Total Price</span>
                        <p className="font-semibold text-blue-600">NPR {booking.totalPrice?.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Pending Status Timer */}
                    {booking.status === 'PENDING' && (
                      <div className="flex items-center gap-2 text-orange-600 mb-4">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {getTimeRemaining(booking.expiresAt)}
                        </span>
                      </div>
                    )}

                    {/* Rejection Reason */}
                    {booking.status === 'REJECTED' && booking.rejectionReason && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-red-700">
                          <strong>Reason:</strong> {booking.rejectionReason}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {booking.status === 'AWAITING_PAYMENT' && (
                        <button
                          onClick={() => navigate('/payment', { state: { booking } })}
                          className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          Pay Now
                        </button>
                      )}
                      {['PENDING', 'CONFIRMED', 'AWAITING_PAYMENT'].includes(booking.status) && (
                        <button
                          onClick={() => cancelBooking(booking._id)}
                          disabled={cancelling === booking._id}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50"
                        >
                          {cancelling === booking._id ? 'Cancelling...' : 'Cancel Booking'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
