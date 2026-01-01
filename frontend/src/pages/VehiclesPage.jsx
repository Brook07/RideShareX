import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import axios from "axios";
import {
  Car,
  MapPin,
  Users,
  Fuel,
  Settings,
  Search,
  Star
} from "lucide-react";

export default function VehiclesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [searchParams, setSearchParams] = useState(location.state || {});
  const [sortBy, setSortBy] = useState('recommended');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchVehicleType, setSearchVehicleType] = useState('all');

useEffect(() => {
  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicles");

      const mappedVehicles = res.data.vehicles.map((v) => ({
        id: v._id,
        name: v.name,
        plateNumber: v.plateNumber || null,
        owner: v.owner,
        ownerName: v.owner?.name || (typeof v.owner === 'string' ? v.owner : 'Unknown'),
        ownerEmail: v.owner?.email || '',
        make: v.make,
        model: v.model,
        year: v.year,
        type: v.type || 'car',
        // 🔹 Use actual image from Cloudinary, fallback to default
        image: v.image && v.image !== '/photos/default-car.jpg' 
          ? v.image 
          : "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500",
        	pricePerDay: (v.pricePerDay !== undefined && v.pricePerDay !== null) ? v.pricePerDay : 2000,
        ownerLocation: v.ownerLocation || null,
        status: v.status || 'active',
        createdAt: v.createdAt,
        location: v.location || v.ownerLocation || "Kathmandu",
        rating: v.rating || 0,
        totalRatings: v.totalRatings || 0,
        completedBookings: v.completedBookings || 0,
        seats: v.seats || 4,
        fuel: v.fuelType || "Petrol",
        transmission: "Manual"
      }));

      setVehicles(mappedVehicles);
    } catch (err) {
      console.log("Fetch vehicles error:", err);
    }
  };

  fetchVehicles();
}, []);

  // Filter logic with search
  const filteredVehicles = vehicles.filter((vehicle) => {
    // Location filter
    if (searchLocation && searchLocation !== "all" && vehicle.location !== searchLocation) {
      return false;
    }
    
    // Vehicle type filter
    if (searchVehicleType && searchVehicleType !== "all" && vehicle.type !== searchVehicleType) {
      return false;
    }
    
    // Legacy filter from search params
    if (searchParams.vehicleType && searchParams.vehicleType !== "all" && vehicle.type !== searchParams.vehicleType) {
      return false;
    }
    
    return true;
  });

  // Sorting logic
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.pricePerDay - b.pricePerDay;
      case 'price-high':
        return b.pricePerDay - a.pricePerDay;
      case 'rating':
        return b.rating - a.rating;
      case 'recommended':
      default:
        return 0;
    }
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
            </p>
          )}
        </div>
      </div>

      {/* Filters & Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location Search */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white appearance-none"
                >
                  <option value="">All Locations</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Pokhara">Pokhara</option>
                  <option value="Dhulikhel">Dhulikhel</option>
                  <option value="Banepa">Banepa</option>
                  <option value="Bhaktapur">Bhaktapur</option>
                  <option value="Lalitpur">Lalitpur</option>
                </select>
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vehicle Type
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={searchVehicleType}
                  onChange={(e) => setSearchVehicleType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white appearance-none"
                >
                  <option value="all">All Types</option>
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="scooter">Scooter</option>
                </select>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-bold text-gray-900">
              {sortedVehicles.length}
            </span>{" "}
            vehicles
          </p>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => navigate('/book-now', { state: { vehicle } })}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />

                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-900">
                  NPR {vehicle.pricePerDay}/day
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {vehicle.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {vehicle.make} {vehicle.model} • {vehicle.year}
                </p>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{vehicle.location}</span>
                </div>

                <div className="mb-4 space-y-1">
                  {vehicle.plateNumber && (
                    <p className="text-sm text-gray-500">
                      Plate: <span className="font-medium text-gray-700">{vehicle.plateNumber}</span>
                    </p>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className={`w-4 h-4 ${vehicle.rating > 0 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      <span className="text-sm font-semibold">{vehicle.rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-500">({vehicle.totalRatings} {vehicle.totalRatings === 1 ? 'rating' : 'ratings'})</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {vehicle.completedBookings === 0 ? 'New listing' : `${vehicle.completedBookings} ${vehicle.completedBookings === 1 ? 'trip' : 'trips'}`}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t">
                  <div className="flex flex-col items-center">
                    <Users className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600">
                      {vehicle.seats} Seats
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Fuel className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600">
                      {vehicle.fuel}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Settings className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-600">
                      {vehicle.transmission}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/book-now', { state: { vehicle } });
                  }}
                  className="w-full mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                >
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
