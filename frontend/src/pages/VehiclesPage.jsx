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
  Star
} from "lucide-react";

export default function VehiclesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [searchParams, setSearchParams] = useState(location.state || {});

useEffect(() => {
  const fetchVehicles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicles");

      const mappedVehicles = res.data.vehicles.map((v) => ({
        id: v._id,
        name: v.name,
        plateNumber: v.plateNumber || "N/A",
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
        rating: 4.5,
        reviews: 50,
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

  // Filter logic (kept same)
  const filteredVehicles = vehicles.filter((vehicle) => {
    if (searchParams.vehicleType && searchParams.vehicleType !== "all") {
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
            </p>
          )}
        </div>
      </div>

      {/* Filters & Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-bold text-gray-900">
              {filteredVehicles.length}
            </span>{" "}
            vehicles
          </p>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-white rounded-lg shadow-sm p-1">
              {['all','car','bike','scooter'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSearchParams({ ...searchParams, vehicleType: t })}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${searchParams.vehicleType === t ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>
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

                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-gray-500">
                      <div>Plate: {vehicle.plateNumber}</div>
                    </div>

                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-semibold">{vehicle.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({vehicle.reviews})</span>
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
