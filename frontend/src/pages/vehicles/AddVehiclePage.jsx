import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function AddVehiclePage() {
  const { user } = useAuth();
  const [vehicleName, setVehicleName] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/vehicles/add", {
        name: vehicleName,
        owner: user._id
      });

      alert("Vehicle saved!");
      console.log("Response:", res.data);
    } catch (error) {
      console.log(error);
      alert("Error saving vehicle");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">Add Vehicle (Test)</h1>

      <input
        type="text"
        placeholder="Enter vehicle name"
        value={vehicleName}
        onChange={(e) => setVehicleName(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
      >
        Submit
      </button>
    </div>
  );
}
