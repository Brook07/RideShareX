import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CreditCard, Banknote, CheckCircle, XCircle, Loader, Phone, MapPin, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PaymentModal = ({ booking, isOpen, onClose, onPaymentSuccess }) => {
  const navigate = useNavigate();
  const { user, updateUser, setWalletOverride, getWalletOverrides } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('demo-wallet');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success' | 'failed' | null
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const generateTransactionId = () => {
    const prefix = 'DEMO';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.floor(Math.random() * 9000 + 1000);
    return `${prefix}-${timestamp}-${random}`;
  };

  const getOverrideBalance = (userId, fallback = 10000) => {
    if (!userId || typeof getWalletOverrides !== 'function') return fallback;
    const overrides = getWalletOverrides() || {};
    if (overrides[userId] !== undefined) return overrides[userId];
    return fallback;
  };

  const saveLocalTransactions = (entries) => {
    if (!entries?.length) return;
    let existing = [];
    try {
      existing = JSON.parse(localStorage.getItem('demoTransactions')) || [];
    } catch (err) {
      existing = [];
    }
    const updated = [...existing, ...entries];
    localStorage.setItem('demoTransactions', JSON.stringify(updated));
  };

  const calculateFareBreakdown = () => {
    const totalPrice = booking.totalPrice || 0;
    const baseFare = Math.floor(totalPrice * 0.7); // 70% base fare
    const distanceFare = Math.floor(totalPrice * 0.2); // 20% distance
    const serviceFee = totalPrice - baseFare - distanceFare; // Remaining as service fee

    return {
      baseFare: baseFare.toFixed(2),
      distanceFare: distanceFare.toFixed(2),
      serviceFee: serviceFee.toFixed(2),
      total: totalPrice.toFixed(2)
    };
  };

  const fareBreakdown = calculateFareBreakdown();

  const handlePayment = async () => {
    setIsProcessing(true);
    setErrorMessage('');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const totalAmount = booking.totalPrice || Number(fareBreakdown.total) || 0;
    const paymentMethodLabel = selectedMethod === 'demo-wallet' ? 'Demo Wallet' : 'Cash';

    try {
      if (selectedMethod === 'demo-wallet') {
        const currentBalance = user?.walletBalance ?? getOverrideBalance(user?._id, 10000);
        if (currentBalance < totalAmount) {
          setErrorMessage('Insufficient wallet balance for this payment.');
          setPaymentStatus('failed');
          setIsProcessing(false);
          return;
        }
        const newBalance = currentBalance - totalAmount;
        updateUser({ walletBalance: newBalance });
      }

      const ownerId = booking.owner?._id;
      if (ownerId && typeof setWalletOverride === 'function') {
        const currentOwnerBalance = getOverrideBalance(ownerId, booking.owner?.walletBalance ?? 10000);
        const updatedOwnerBalance = currentOwnerBalance + totalAmount;
        setWalletOverride(ownerId, updatedOwnerBalance);
      }

      const transactionId = generateTransactionId();
      window.lastTransactionId = transactionId;
      setPaymentStatus('success');

      const timestamp = new Date().toISOString();
      const paymentSummary = {
        transactionId,
        amount: totalAmount,
        method: paymentMethodLabel,
        ownerName: booking.owner?.name || 'Vehicle Owner',
        vehicleName: booking.vehicle?.name || booking.vehicle?.model || 'Vehicle',
        date: timestamp
      };

      const debitEntry = {
        _id: `local-${transactionId}-debit`,
        transactionId,
        type: 'DEBIT',
        amount: totalAmount,
        status: 'COMPLETED',
        paymentMethod: paymentMethodLabel,
        date: timestamp,
        userId: user?._id,
        bookingId: booking._id,
        description: `Payment to ${booking.owner?.name || 'vehicle owner'} for ${booking.vehicle?.name || booking.vehicle?.model || 'vehicle'}`,
        otherParty: {
          name: booking.owner?.name || 'Vehicle Owner',
          picture: booking.owner?.picture || booking.vehicle?.image,
          phone: booking.owner?.phone,
          email: booking.owner?.email
        }
      };

      const creditEntry = ownerId ? {
        _id: `local-${transactionId}-credit`,
        transactionId,
        type: 'CREDIT',
        amount: totalAmount,
        status: 'COMPLETED',
        paymentMethod: paymentMethodLabel,
        date: timestamp,
        userId: ownerId,
        bookingId: booking._id,
        description: `Payment received from ${user?.name || 'Renter'} for ${booking.vehicle?.name || booking.vehicle?.model || 'vehicle'}`,
        otherParty: {
          name: user?.name || 'Renter',
          picture: user?.picture,
          phone: null,
          email: user?.email
        }
      } : null;

      saveLocalTransactions(creditEntry ? [debitEntry, creditEntry] : [debitEntry]);

      // Auto-redirect after 1.5 seconds
      setTimeout(() => {
        const payload = {
          bookingId: booking._id,
          transactionId,
          amount: totalAmount,
          paymentMethod: paymentMethodLabel,
          date: timestamp
        };
        onPaymentSuccess(payload);
        onClose();
        setPaymentStatus(null);
        window.lastTransactionId = null;
        navigate('/dashboard?tab=transactions', {
          state: { paymentSummary }
        });
      }, 1500);
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage('Something went wrong while simulating the payment.');
      setPaymentStatus('failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    setPaymentStatus(null);
    setIsProcessing(false);
  };

  const paymentMethods = [
    { id: 'demo-wallet', label: 'Demo Wallet', icon: CreditCard, description: 'Pay using demo wallet balance' },
    { id: 'cash', label: 'Cash', icon: Banknote, description: 'Pay with cash on pickup' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Processing Overlay */}
        {isProcessing && !paymentStatus && (
          <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-10 rounded-2xl">
            <Loader className="w-16 h-16 text-blue-600 animate-spin" />
            <p className="mt-4 text-lg font-semibold text-gray-800">Processing Payment...</p>
            <p className="text-sm text-gray-600 mt-2">Please wait</p>
          </div>
        )}

        {/* Success State */}
        {paymentStatus === 'success' && (
          <div className="absolute inset-0 bg-white bg-opacity-98 flex flex-col items-center justify-center z-10 rounded-2xl px-6 text-center">
            <div className="success-animation">
              <CheckCircle className="w-20 h-20 text-green-500" strokeWidth={2} />
            </div>
            <p className="mt-6 text-2xl font-bold text-gray-800">Payment Successful!</p>
            <div className="mt-6 w-full space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Transaction ID</div>
                <div className="font-mono text-gray-800 font-semibold text-sm break-all">
                  {paymentStatus === 'success' && window.lastTransactionId ? window.lastTransactionId : `TXN-${Date.now().toString(36).toUpperCase()}`}
                </div>
                <div className="text-sm text-gray-600 mt-3 mb-1">Amount Paid</div>
                <div className="text-2xl font-bold text-green-600">NPR {booking.totalPrice?.toLocaleString() || 0}</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h4 className="text-lg font-bold text-blue-900 mb-3">Pickup & Contact Details</h4>
                <div className="space-y-3 text-sm text-blue-900">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Pickup Location</p>
                      <p>{booking.vehicle?.location || 'Owner will share soon'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Owner Contact</p>
                      <p>{booking.owner?.phone || 'Phone not provided yet'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Owner Email</p>
                      <p>{booking.owner?.email || 'Email not provided'}</p>
                    </div>
                  </div>
                  {booking.owner?.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-900">Pickup Address</p>
                        <p>{booking.owner.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">We also shared these details inside your booking card.</p>
          </div>
        )}

        {/* Failed State */}
        {paymentStatus === 'failed' && (
          <div className="absolute inset-0 bg-white bg-opacity-98 flex flex-col items-center justify-center z-10 rounded-2xl p-6">
            <XCircle className="w-20 h-20 text-red-500" strokeWidth={2} />
            <p className="mt-6 text-2xl font-bold text-gray-800">Payment Failed</p>
            <p className="text-gray-600 mt-2 text-center">
              {errorMessage || 'Unable to process payment. Please try again.'}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Retry Payment
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Confirm Payment</h2>
            <p className="text-sm text-gray-600 mt-1">Complete payment to start your ride</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            disabled={isProcessing}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* DEMO Badge */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3 flex items-center gap-2">
            <span className="text-yellow-700 font-semibold text-sm">⚠️ DEMO MODE</span>
            <span className="text-yellow-600 text-xs">No real money will be charged</span>
          </div>

          {/* Booking Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Booking Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-mono font-semibold text-gray-800">
                  {booking._id?.slice(-8).toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Vehicle</span>
                <span className="font-semibold text-gray-800 text-right">
                  {booking.vehicle?.name || booking.vehicle?.model || 'Vehicle'}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Owner</span>
                <span className="font-semibold text-gray-800 text-right">
                  {booking.owner?.name || 'Vehicle Owner'}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rental Period</span>
                <span className="font-semibold text-gray-800">{booking.totalDays} day{booking.totalDays > 1 ? 's' : ''}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Price per Day</span>
                <span className="font-semibold text-gray-800">NPR {booking.pricePerDay?.toLocaleString() || 0}</span>
              </div>

              <div className="border-t-2 border-blue-300 my-3"></div>

              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-bold text-lg">Total Amount</span>
                <span className="text-blue-600 font-bold text-2xl">NPR {booking.totalPrice?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>

          {/* Owner Contact Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Payment Recipient</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-semibold text-gray-900">{booking.owner?.name || 'Vehicle Owner'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-semibold text-gray-900">{booking.owner?.phone || 'Not provided yet'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-semibold text-gray-900">{booking.owner?.email || 'Not provided'}</span>
              </div>
              {(booking.owner?.address || booking.vehicle?.location) && (
                <div className="flex items-start justify-between gap-4">
                  <span className="text-gray-600">Pickup Spot</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {booking.owner?.address || booking.vehicle?.location}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-3">This is who receives the payment and meets you at pickup.</p>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4 text-lg">Select Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <method.icon className="w-6 h-6 text-gray-600" />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{method.label}</div>
                      <div className="text-xs text-gray-500">{method.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl space-y-3">
          <button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
              selectedMethod && !isProcessing
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? 'Processing...' : `Pay NPR ${booking.totalPrice?.toLocaleString() || 0}`}
          </button>
          
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="w-full py-3 rounded-xl font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes successPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        .success-animation {
          animation: successPop 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;
