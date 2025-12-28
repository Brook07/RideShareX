import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Users, Fuel, Settings, ArrowLeft, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import Navbar from '../../components/common/Navbar';

export default function BookNowPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get vehicle data from navigation state
  const vehicle = location.state?.vehicle || null;

  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [totalDays, setTotalDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Set default dates (tomorrow and day after)
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    setPickupDate(tomorrow.toISOString().split('T')[0]);
    setDropoffDate(dayAfter.toISOString().split('T')[0]);
  }, []);

  // Use actual image from Cloudinary, fallback to default
  const vehicleImage = vehicle?.image && vehicle.image !== '/photos/default-car.jpg'
    ? vehicle.image
    : "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80";

  const pricePerDay = vehicle?.price || 2000;

  useEffect(() => {
    calculatePrice();
  }, [pickupDate, dropoffDate, pricePerDay]);

  const calculatePrice = () => {
    if (pickupDate && dropoffDate) {
      const pickup = new Date(pickupDate);
      const dropoff = new Date(dropoffDate);
      const diffTime = dropoff - pickup;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setTotalDays(diffDays);
        setTotalPrice(diffDays * pricePerDay);
      }
    }
  };

  const handleBooking = async () => {
    if (!vehicle) {
      alert("Vehicle information is missing");
      return;
    }

    if (!pickupDate || !dropoffDate) {
      alert("Please select pickup and drop-off dates");
      return;
    }

    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    
    if (dropoff <= pickup) {
      alert("Drop-off date must be after pickup date");
      return;
    }

    if (pickup < new Date().setHours(0, 0, 0, 0)) {
      alert("Pickup date cannot be in the past");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      const res = await axios.post("http://localhost:5000/api/bookings", {
        vehicleId: vehicle.id,
        pickupDate,
        dropoffDate,
        totalDays,
        pricePerDay,
        totalPrice,
        message
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBookingSuccess(true);
      
      // Redirect to bookings page after 3 seconds
      setTimeout(() => {
        navigate('/my-bookings');
      }, 3000);

    } catch (err) {
      console.error("Booking error:", err);
      alert(err.response?.data?.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  // If no vehicle data, show error
  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Vehicle Not Found</h2>
            <p className="text-gray-600 mb-6">Please select a vehicle from the vehicles page</p>
            <button
              onClick={() => navigate('/vehicles')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Vehicles
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show success screen
  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Request Sent!</h2>
            <p className="text-gray-600 mb-4">
              Your booking request has been sent to the vehicle owner.
            </p>
            <div className="flex items-center justify-center gap-2 text-orange-600 mb-6">
              <Clock className="w-5 h-5" />
              <span className="text-sm">The owner has 5 hours to respond</span>
            </div>
            <p className="text-sm text-gray-500">Redirecting to your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/vehicles')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Vehicles</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Ride</h1>
            <p className="text-gray-600">Complete your booking details below</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Vehicle Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vehicle Card */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={vehicleImage} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.name}</h2>
                  <p className="text-gray-600 mb-4">
                    {vehicle.make} {vehicle.model} • {vehicle.year}
                  </p>
                  
                  {/* Vehicle Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users size={20} />
                      <span className="text-sm">{vehicle.seats} seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Fuel size={20} />
                      <span className="text-sm">{vehicle.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Settings size={20} />
                      <span className="text-sm">{vehicle.transmission || 'Manual'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar size={24} />
                  Trip Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pickup */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Dropoff */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Drop-off Date
                    </label>
                    <input
                      type="date"
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      min={pickupDate}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Trip Duration:</strong> {totalDays} {totalDays === 1 ? 'day' : 'days'}
                  </p>
                </div>
              </div>

              {/* Message to Owner */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare size={24} />
                  Message to Owner (Optional)
                </h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce yourself and let the owner know about your trip plans..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Right Column - Price Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Price per day</span>
                    <span>NPR {pricePerDay.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Number of days</span>
                    <span>{totalDays}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold text-blue-600">NPR {totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Approval Required</p>
                      <p className="text-xs text-orange-600">
                        The owner has 5 hours to approve or reject your booking request
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleBooking}
                  disabled={loading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Request...
                    </span>
                  ) : (
                    'Send Booking Request'
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">You won't be charged until the owner approves</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}