import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/common/Navbar';
import { CreditCard, ArrowLeft, AlertCircle, Loader } from 'lucide-react';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!booking) {
      navigate('/my-bookings');
    }
  }, [booking, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/payments/initiate', {
        bookingId: booking._id,
        amount: booking.totalPrice
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Get eSewa payment URL and params
      const { esewaUrl, params } = res.data;

      // Create and submit form to eSewa
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = esewaUrl;
      form.target = '_self';
      
      Object.entries(params).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Payment initiation error:', err);
      alert(err.response?.data?.message || 'Failed to initiate payment');
      setLoading(false);
    }
  };

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/my-bookings')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to My Bookings</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
            <p className="text-gray-600">You'll be redirected to eSewa to complete your payment</p>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
                <p className="text-sm text-gray-500">Secure payment via eSewa</p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="border-t border-b border-gray-200 py-6 mb-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle</span>
                <span className="font-semibold text-gray-900">{booking.vehicle?.name || 'Vehicle'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Date</span>
                <span className="font-semibold text-gray-900">
                  {new Date(booking.pickupDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Drop-off Date</span>
                <span className="font-semibold text-gray-900">
                  {new Date(booking.dropoffDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold text-gray-900">
                  {booking.totalDays} {booking.totalDays === 1 ? 'day' : 'days'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per day</span>
                <span className="font-semibold text-gray-900">NPR {booking.pricePerDay?.toLocaleString()}</span>
              </div>
            </div>

            {/* Total Amount */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-900">Total Amount</span>
              <span className="text-3xl font-bold text-blue-600">NPR {booking.totalPrice?.toLocaleString()}</span>
            </div>

            {/* Info Box */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-orange-800">
                  <p className="font-semibold mb-1">Payment Information</p>
                  <ul className="list-disc list-inside space-y-1 text-orange-700">
                    <li>You will be redirected to eSewa payment gateway</li>
                    <li>Complete the payment using your eSewa account</li>
                    <li>After successful payment, you'll be redirected back</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className={`w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Redirecting to eSewa...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Proceed to Payment
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Powered by <span className="font-semibold text-green-600">eSewa</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
