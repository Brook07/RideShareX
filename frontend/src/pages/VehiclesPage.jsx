import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Car, MapPin, Users, Fuel, Settings, Star } from 'lucide-react';

export default function VehiclesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState(location.state || {});

  // Mock vehicle data (replace with API call later)
  const vehicles = [
    {
      id: 1,
      name: 'Toyota Camry 2023',
      type: 'car',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500',
      price: 5000,
      location: 'Kathmandu',
      rating: 4.8,
      reviews: 124,
      seats: 5,
      fuel: 'Petrol',
      transmission: 'Automatic'
    },
    {
      id: 2,
      name: 'Honda Activa 2023',
      type: 'bike',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500',
      price: 800,
      location: 'Kathmandu',
      rating: 4.6,
      reviews: 89,
      seats: 2,
      fuel: 'Petrol',
      transmission: 'Manual'
    },
    {
      id: 3,
      name: 'Hyundai Creta 2023',
      type: 'suv',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500',
      price: 7000,
      location: 'Lalitpur',
      rating: 4.9,
      reviews: 156,
      seats: 7,
      fuel: 'Diesel',
      transmission: 'Automatic'
    },
    {
      id: 4,
      name: 'Suzuki Swift 2023',
      type: 'car',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500',
      price: 4500,
      location: 'Pokhara',
      rating: 4.7,
      reviews: 92,
      seats: 5,
      fuel: 'Petrol',
      transmission: 'Manual'
    },
    {
      id: 5,
      name: 'Royal Enfield Classic 350',
      type: 'bike',
      image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=500',
      price: 1500,
      location: 'Kathmandu',
      rating: 4.8,
      reviews: 67,
      seats: 2,
      fuel: 'Petrol',
      transmission: 'Manual'
    },
    {
      id: 6,
      name: 'Mahindra Scorpio 2023',
      type: 'suv',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500',
      price: 6500,
      location: 'Bhaktapur',
      rating: 4.5,
      reviews: 78,
      seats: 7,
      fuel: 'Diesel',
      transmission: 'Manual'
    }
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    if (searchParams.vehicleType && searchParams.vehicleType !== 'all') {
      return vehicle.type === searchParams.vehicleType;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Available Vehicles
          </h1>
          {searchParams.location && (
            <p className="text-blue-100 text-lg">
              Showing results for {searchParams.location}
              {searchParams.pickupDate && ` from ${searchParams.pickupDate}`}
              {searchParams.returnDate && ` to ${searchParams.returnDate}`}
            </p>
          )}
        </div>
      </div>

      {/* Filters & Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            Found <span className="font-bold text-gray-900">{filteredVehicles.length}</span> vehicles
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">
            <option>Sort by: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: High to Low</option>
          </select>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate(`/vehicle/${vehicle.id}`)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                  NPR {vehicle.price}/day
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {vehicle.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">{vehicle.location}</span>
<div className="flex items-center ml-auto">
<Star className="w-4 h-4 text-yellow-400 fill-current" />
<span className="ml-1 text-sm font-semibold">{vehicle.rating}</span>
<span className="ml-1 text-sm text-gray-500">({vehicle.reviews})</span>
</div>
</div>
{/* Features */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t">
              <div className="flex flex-col items-center">
                <Users className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-600">{vehicle.seats} Seats</span>
              </div>
              <div className="flex flex-col items-center">
                <Fuel className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-600">{vehicle.fuel}</span>
              </div>
              <div className="flex flex-col items-center">
                <Settings className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-600">{vehicle.transmission}</span>
              </div>
            </div>

            {/* Book Button */}
            <button className="w-full mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
);
}
