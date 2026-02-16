import React, { useEffect, useState } from "react";
import { Loader2, AlertTriangle, MapPin } from "lucide-react"; // Added icons for status

const LocationFinder = ({ onLocationDetected }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);

        // Step 1: Get user's public IP
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        const ip = ipData.ip;
        console.log(ip)
        if (!ip) throw new Error("Unable to fetch IP address");

        // Step 2: Get detailed location info from ip-api
        const locRes = await fetch(`http://ip-api.com/json/${ip}`);
        console.log(locRes);
        const locData = await locRes.json();
        console.log(locData)

        if (locData.status === "success") {
          const { city, country, lat, lon, regionName } = locData;
          const formatted_address = `${city || ""}, ${regionName || ""}, ${country || ""}`.trim();
          const googleLink = `https://www.google.com/maps?q=${lat},${lon}`;

          const detected = {
            ip,
            city: city || "Unknown City",
            country: country || "Unknown Country",
            formatted_address,
            latitude: lat,
            longitude: lon,
            googleLink,
          };

          setLocation(detected);
          onLocationDetected && onLocationDetected(detected);
        } else {
          setLocation({ error: "Unable to retrieve location data." });
        }
      } catch (err) {
        console.error(err);
        setLocation({ error: "Failed to fetch IP-based location." });
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Keep original dependency array

  // Loading State
  if (loading)
    return (
      <div className="flex items-center space-x-2 text-sm text-orange-600">
        <Loader2 size={16} className="animate-spin" />
        <span className="font-medium">Fetching current location...</span>
      </div>
    );

  // Error State
  if (location?.error)
    return (
      <div className="flex items-center space-x-2 text-sm text-red-600 p-2 bg-red-50 rounded-lg">
        <AlertTriangle size={16} />
        <span>{location.error}</span>
      </div>
    );

  // Initial State
  if (!location)
    return <p className="text-gray-400 text-sm italic">Detecting location...</p>;

  // Success State
  return (
    <div className="text-sm p-4 bg-white rounded-lg shadow-inner border border-gray-100 space-y-2">
      <div className="flex items-start">
        <span className="font-semibold text-gray-800 w-32 flex-shrink-0">Address:</span>
        <span className="text-gray-700">{location.formatted_address}</span>
      </div>
      <div className="flex items-start">
        <span className="font-semibold text-gray-800 w-32 flex-shrink-0">City:</span>
        <span className="text-gray-700">{location.city}</span>
      </div>
      <div className="flex items-start">
        <span className="font-semibold text-gray-800 w-32 flex-shrink-0">Country:</span>
        <span className="text-gray-700">{location.country}</span>
      </div>
      {/* <div className="flex items-start">
        <span className="font-semibold text-gray-800 w-32 flex-shrink-0">IP Address:</span>
        <span className="text-gray-700">{location.ip}</span>
      </div> */}
      <div className="flex flex-col items-start">
        <span className="font-semibold text-gray-800 w-32 flex-shrink-0">Map:</span>
        <span className="text-sm italic animate-pulse font-bold">Please check the Map before Approving.</span>
        <a
          href={location.googleLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:text-orange-700 underline truncate flex items-center gap-1"
        >
          <MapPin size={14} />
          View on Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationFinder;