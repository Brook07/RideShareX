import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Users, Fuel, Settings, ArrowLeft } from 'lucide-react';

const RideBookingUI = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get vehicle data from navigation state
  const vehicle = location.state?.vehicle || {
    name: "Vehicle Not Found",
    brand: "N/A",
    model: "N/A",
    year: 2024,
    seats: 4,
    transmission: "Manual",
    fuel: "Petrol",
    price: 2000,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80"
  };

  const [pickupDate, setPickupDate] = useState('2026-01-06');
  const [dropoffDate, setDropoffDate] = useState('2026-01-09');
  const [totalDays, setTotalDays] = useState(3);
  const [totalPrice, setTotalPrice] = useState(vehicle.price * 3);

  useEffect(() => {
    calculatePrice();
  }, [pickupDate, dropoffDate, vehicle.price]);

  const calculatePrice = () => {
    if (pickupDate && dropoffDate) {
      const pickup = new Date(pickupDate);
      const dropoff = new Date(dropoffDate);
      const diffTime = Math.abs(dropoff - pickup);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays);
      setTotalPrice(diffDays * vehicle.price);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
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
                  src={vehicle.image} 
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.name}</h2>
                <p className="text-gray-600 mb-4">Plate: {vehicle.plateNumber || 'N/A'}</p>
                
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
                    <span className="text-sm">{vehicle.transmission}</span>
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
              
              <div className="space-y-4">
                {/* Pickup */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Trip Duration:</strong> {totalDays} {totalDays === 1 ? 'day' : 'days'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Price per day</span>
                  <span>NPR {vehicle.price}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Number of days</span>
                  <span>{totalDays}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Subtotal</span>
                  <span className="text-gray-900">NPR {totalPrice}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold text-blue-600">NPR {totalPrice}</span>
                </div>
                <p className="text-xs text-gray-500">Before taxes</p>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg">
                Book Now
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Free cancellation up to 24 hours before pickup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideBookingUI;