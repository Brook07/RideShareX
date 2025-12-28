
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

// 🔹 Cloudinary Configuration (from environment variables)
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export default function AddVehiclePage() {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    seats: "",
    location: "",
    fuelType: ""
  });
  
  // 🔹 Image upload states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVehicleData({
      ...vehicleData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // 🔹 Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    
    if (data.error) {
      console.error("Cloudinary error:", data.error);
      throw new Error(data.error.message);
    }
    
    return data.secure_url; // Returns the uploaded image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!vehicleData.name || !vehicleData.make || !vehicleData.model || 
        !vehicleData.year || !vehicleData.seats || !vehicleData.location || 
        !vehicleData.fuelType) {
      return alert("Please fill all required fields");
    }

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      
      // 🔹 Upload image to Cloudinary if file selected
      let imageUrl = '/photos/default-car.jpg';
      if (imageFile) {
        try {
          imageUrl = await uploadToCloudinary(imageFile);
          console.log("Image uploaded:", imageUrl);
        } catch (uploadErr) {
          console.error("Image upload failed:", uploadErr);
          alert("Image upload failed. Using default image.");
        }
      }
      
      const res = await axios.post("http://localhost:5000/api/vehicles/add", {
        ...vehicleData,
        year: parseInt(vehicleData.year),
        seats: parseInt(vehicleData.seats),
        image: imageUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Vehicle added successfully!");
      console.log(res.data);

      // Reset form
      setVehicleData({
        name: "",
        make: "",
        model: "",
        year: "",
        seats: "",
        location: "",
        fuelType: ""
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to add vehicle");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header with Back Button */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Become a Host - Add Your Vehicle</h1>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Vehicle Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vehicle Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., My Honda City"
                value={vehicleData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Make and Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Make <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="make"
                  placeholder="e.g., Honda"
                  value={vehicleData.make}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  placeholder="e.g., City"
                  value={vehicleData.model}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Year and Seats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  placeholder="e.g., 2020"
                  min="1900"
                  max="2026"
                  value={vehicleData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Seats <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="seats"
                  placeholder="e.g., 4"
                  min="1"
                  max="20"
                  value={vehicleData.seats}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g., Mumbai, Maharashtra"
                value={vehicleData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fuel Type <span className="text-red-500">*</span>
              </label>
              <select
                name="fuelType"
                value={vehicleData.fuelType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                required
              >
                <option value="">Select Fuel Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="CNG">CNG</option>
              </select>
            </div>

            {/* 🔹 Vehicle Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vehicle Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Vehicle preview" 
                      className="mx-auto max-h-48 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">Click to upload vehicle image</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={imagePreview ? "hidden" : "absolute inset-0 w-full h-full opacity-0 cursor-pointer"}
                  style={imagePreview ? {} : { position: 'relative' }}
                />
              </div>
              {!imagePreview && (
                <p className="mt-2 text-xs text-gray-500">
                  If no image is uploaded, a default image will be used.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className={`w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                'Add Vehicle'
              )}
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
