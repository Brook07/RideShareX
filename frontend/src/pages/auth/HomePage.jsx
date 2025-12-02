import React, { useState } from 'react';
import { Search, MapPin, Calendar, Car, Bike, Truck, LogOut, User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Mock vehicle data - Replace with API call later
const trendingVehicles = [
  {
    id: 1,
    name: "Tesla Model 3",
    type: "Luxury Car",
    price: 89,
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400",
    rating: 4.8,
    location: "New York"
  },
  {
    id: 2,
    name: "BMW X5",
    type: "SUV",
    price: 120,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400",
    rating: 4.9,
    location: "Los Angeles"
  },
  {
    id: 3,
    name: "Honda Civic",
    type: "Sedan",
    price: 45,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=400",
    rating: 4.6,
    location: "Chicago"
  },
  {
    id: 4,
    name: "Harley Davidson",
    type: "Cruiser Bike",
    price: 65,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400",
    rating: 4.7,
    location: "Miami"
  },
  {
    id: 5,
    name: "Ducati Panigale",
    type: "Sports Bike",
    price: 95,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400",
    rating: 4.9,
    location: "San Francisco"
  },
  {
    id: 6,
    name: "Vespa Primavera",
    type: "Scooter",
    price: 25,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    rating: 4.5,
    location: "Seattle"
  }
];

export default function HomePage() {
    const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleType, setVehicleType] = useState('all');
  const [searchData, setSearchData] = useState({
    location: '',
    pickupDate: '',
    returnDate: ''
  });

  const handleSearch = () => {
    console.log('Search data:', searchData);
    // Implement search functionality
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  
  const filteredVehicles = vehicleType === 'all' 
    ? trendingVehicles 
    : trendingVehicles.filter(v => 
        vehicleType === 'car' ? v.type.toLowerCase().includes('car') || v.type.toLowerCase().includes('suv') || v.type.toLowerCase().includes('sedan') :
        vehicleType === 'bike' ? v.type.toLowerCase().includes('bike') :
        vehicleType === 'scooter' ? v.type.toLowerCase().includes('scooter') : true
      );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Car className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                RideShareX
              </span>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors text-base">
                Home
              </a>
              <a href="#dashboard" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors text-base">
                Dashboard
              </a>
              <a href="#bookings" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors text-base">
                My Bookings
              </a>
              <a href="#my-vehicles" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors text-base">
                My Vehicles
              </a>
            </div>

            {/* Right Side - Profile & Logout */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Profile Icon Button */}
              <button 
                onClick={() => window.location.href = '/profile'}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all shadow-sm hover:shadow-md group"
                title="Go to Profile"
              >
                <User className="w-6 h-6 text-gray-700 group-hover:text-gray-900" strokeWidth={2} />
              </button>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl transition-all shadow-md hover:shadow-lg font-semibold"
              >
                <LogOut className="w-5 h-5" strokeWidth={2} />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-3 pt-4 border-t border-gray-200">
              <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold transition-all">
                Home
              </a>
              <a href="#dashboard" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold transition-all">
                Dashboard
              </a>
              <a href="#bookings" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold transition-all">
                My Bookings
              </a>
              <a href="#my-vehicles" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold transition-all">
                My Vehicles
              </a>
              
              <div className="pt-2 space-y-2">
                <button 
                  onClick={() => window.location.href = '/profile'}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-all"
                >
                  <User className="w-5 h-5" />
                  My Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold shadow-md"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Rent Cars & Bikes Easily
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Affordable rides from nearby owners. Your journey, your choice.
            </p>
          </div>

          {/* Search Panel */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={searchData.location}
                    onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Pickup Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pickup Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.pickupDate}
                    onChange={(e) => setSearchData({...searchData, pickupDate: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Return Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchData.returnDate}
                    onChange={(e) => setSearchData({...searchData, returnDate: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Car Image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
          <img
            src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200"
            alt="Luxury Car"
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Vehicle Type Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setVehicleType('all')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              vehicleType === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Vehicles
          </button>
          <button
            onClick={() => setVehicleType('car')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              vehicleType === 'car'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Car className="w-5 h-5" />
            Cars
          </button>
          <button
            onClick={() => setVehicleType('bike')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              vehicleType === 'bike'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bike className="w-5 h-5" />
            Bikes
          </button>
          <button
            onClick={() => setVehicleType('scooter')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              vehicleType === 'scooter'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Truck className="w-5 h-5" />
            Scooters
          </button>
        </div>
      </div>

      {/* Trending Vehicles Section */}
      <div id="vehicles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trending Vehicles
          </h2>
          <p className="text-lg text-gray-600">
            Discover the most popular vehicles in your area
          </p>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                  ⭐ {vehicle.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-gray-600 mb-4">{vehicle.type}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{vehicle.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${vehicle.price}
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all shadow-md hover:shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <span className="text-2xl font-bold">RideShareX</span>
              </div>
              <p className="text-gray-400">
                Your journey, your choice. Rent vehicles easily.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Rent Cars</a></li>
                <li><a href="#" className="hover:text-white">Rent Bikes</a></li>
                <li><a href="#" className="hover:text-white">List Vehicle</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RideShareX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}