import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/common/Navbar';
import { CheckCircle, Loader, XCircle, ArrowRight } from 'lucide-react';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your payment...');
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Extract eSewa response parameters
        const payload = {
          oid: searchParams.get('oid'),
          amt: searchParams.get('amt'),
          refId: searchParams.get('refId')
        };

        console.log('Verifying payment with:', payload);

        const res = await axios.post('http://localhost:5000/api/payments/verify', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success) {
          setStatus('success');
          setMessage('Payment verified successfully!');
          setBookingId(res.data.bookingId);
          
          // Redirect after 3 seconds
          setTimeout(() => {
            navigate('/my-bookings');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Payment verification failed. Please contact support.');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed. Please contact support.');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
          {status === 'verifying' && (
            <>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader className="w-10 h-10 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  Your booking is now confirmed. The vehicle owner will contact you shortly.
                </p>
              </div>
              <button
                onClick={() => navigate('/my-bookings')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                View My Bookings
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-sm text-gray-500 mt-4">Redirecting automatically in 3 seconds...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">
                  If money was deducted from your account, please contact our support team with your transaction details.
                </p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Go to My Bookings
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
