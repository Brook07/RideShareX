
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function AddVehiclePage() {
  const [vehicleName, setVehicleName] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicleName) return alert("Enter vehicle name");

    try {
      const res = await axios.post("http://localhost:5000/api/vehicles/add", {
        name: vehicleName
      });

      alert("Vehicle added!");
      console.log(res.data);

      setVehicleName("");
    } catch (err) {
      console.log(err);
      alert("Failed to add vehicle");
    }
  };

  return (
    <div className="p-5">
      <h1>Add Vehicle</h1>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          placeholder="Vehicle Name"
          value={vehicleName}
          onChange={(e) => setVehicleName(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          type="submit"
          className="mt-3 p-2 bg-blue-500 text-white rounded"
        >
          Save Vehicle
        </button>
      </form>
    </div>
  );
}
