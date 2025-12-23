import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import axios from 'axios';
import { MapPin, Users, Fuel, Settings, Star } from 'lucide-react';

export default function VehiclesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useState(location.state || {});
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vehicles from backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vehicles");
        setVehicles(res.data);
      } catch (error) {
        console.log("Error fetching vehicles:", error);
      }
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  // Filter vehicles by type
  const filteredVehicles = vehicles.filter(vehicle => {
    if (searchParams.vehicleType && searchParams.vehicleType !== "all") {
      return vehicle.type === searchParams.vehicleType;
    }
    return true;
  });

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading vehicles...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Available Vehicles</h1>
        </div>
      </div>

      {/* Filters & Results */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-gray-600 mb-6">
          Found <span className="font-bold">{filteredVehicles.length}</span> vehicles
        </p>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
              onClick={() => navigate(`/vehicle/${vehicle._id}`)}
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.brand}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-bold">
                  NPR {vehicle.pricePerDay}/day
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {vehicle.brand} {vehicle.model}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{vehicle.location}</span>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-2 border-t pt-3">
                  <div className="flex flex-col items-center">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-600">{vehicle.seats || 4} Seats</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Fuel className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-600">{vehicle.fuel || "Petrol"}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-600">
                      {vehicle.transmission || "Manual"}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold">
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
