// src/components/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Image,
  ChevronDown,
  Edit,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Mock API base URL - replace with your actual backend URL
const API_BASE_URL = "http://localhost:5000/api"; // Adjust as needed

// Sample statuses
const statuses = ["Pending", "In Progress", "Resolved"];

const AdminPanel = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const navigate = useNavigate();

  // Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Assuming JWT or similar for auth
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get(`${API_BASE_URL}/complaints`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch complaints. Please try again.");
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [navigate]);

  // Handle status update
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        `${API_BASE_URL}/complaints/${id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComplaints(
        complaints.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      if (selectedComplaint?.id === id) {
        setSelectedComplaint({ ...selectedComplaint, status: newStatus });
      }
      // TODO: Trigger push/email notification via backend
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  // Select complaint and center map
  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setMapCenter({ lat: complaint.location.lat, lng: complaint.location.lng });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-6">
        Admin Panel - Civic Issue Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Complaints List */}
        <div className="bg-white shadow-md rounded-lg p-4 overflow-y-auto max-h-[80vh]">
          <h2 className="text-xl font-semibold mb-4">Pending Complaints</h2>
          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            <ul>
              {complaints.map((complaint) => (
                <motion.li
                  key={complaint.id}
                  whileHover={{ scale: 1.02 }}
                  className="border-b py-4 cursor-pointer"
                  onClick={() => handleSelectComplaint(complaint)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{complaint.description}</p>
                      <p className="text-sm text-gray-500">
                        Status: {complaint.status}{" "}
                        {getStatusIcon(complaint.status)}
                      </p>
                    </div>
                    <ChevronDown size={20} />
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Complaint Details */}
        <div className="bg-white shadow-md rounded-lg p-4">
          {selectedComplaint ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Complaint Details</h2>
              <p>
                <strong>Description:</strong> {selectedComplaint.description}
              </p>
              <p>
                <strong>Location:</strong> Lat: {selectedComplaint.location.lat}
                , Lng: {selectedComplaint.location.lng}
              </p>
              <p>
                <strong>Status:</strong> {selectedComplaint.status}
              </p>
              {selectedComplaint.photo && (
                <img
                  src={selectedComplaint.photo}
                  alt="Complaint Photo"
                  className="w-full h-48 object-cover my-4"
                />
              )}

              {/* Status Update Dropdown */}
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Update Status:
                </label>
                <select
                  value={selectedComplaint.status}
                  onChange={(e) =>
                    updateStatus(selectedComplaint.id, e.target.value)
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Map View */}
              <div className="mt-6">
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                  {" "}
                  {/* Replace with your API key */}
                  <GoogleMap
                    mapContainerStyle={{ height: "300px", width: "100%" }}
                    center={mapCenter}
                    zoom={14}
                  >
                    <Marker position={mapCenter} />
                  </GoogleMap>
                </LoadScript>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Select a complaint to view details.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Helper for status icons
const getStatusIcon = (status) => {
  switch (status) {
    case "Pending":
      return <Clock className="inline text-yellow-500" size={16} />;
    case "In Progress":
      return <AlertCircle className="inline text-orange-500" size={16} />;
    case "Resolved":
      return <CheckCircle className="inline text-green-500" size={16} />;
    default:
      return null;
  }
};

export default AdminPanel;
