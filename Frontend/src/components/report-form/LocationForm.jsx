import React, { useEffect, useState } from "react";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyBeZ6FwoqOu-yVYm-RAQF8QuZYqJBHq_mM";

const LocationForm = () => {
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pin: "",
    lat: "",
    lng: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setCoords({ lat, lng });
          setAddress((prev) => ({ ...prev, lat, lng }));

          await fetchAddress(lat, lng);
        },
        (err) => {
          setError("Location access denied. Please allow location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  // Fetch address from Google Maps API
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            latlng: `${lat},${lng}`,
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );

      if (response.data.status === "OK") {
        const components = response.data.results[0].address_components;

        const street =
          components.find((c) => c.types.includes("route"))?.long_name || "";
        const city =
          components.find((c) => c.types.includes("locality"))?.long_name ||
          "";
        const state =
          components.find((c) =>
            c.types.includes("administrative_area_level_1")
          )?.long_name || "";
        const country =
          components.find((c) => c.types.includes("country"))?.long_name || "";
        const pin =
          components.find((c) => c.types.includes("postal_code"))?.long_name ||
          "";

        setAddress({
          street,
          city,
          state,
          country,
          pin,
          lat,
          lng,
        });
      } else {
        setError("Unable to fetch address from Google Maps.");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching address.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", address);
    alert(JSON.stringify(address, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 flex flex-col gap-4 border rounded shadow-lg mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Your Location Form</h2>

      {loading && <p className="text-gray-500">Fetching your location...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="street"
        placeholder="Street"
        value={address.street}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={address.country}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="pin"
        placeholder="PIN Code"
        value={address.pin}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="lat"
        placeholder="Latitude"
        value={address.lat}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="lng"
        placeholder="Longitude"
        value={address.lng}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default LocationForm;
