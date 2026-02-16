import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  CheckCircle,
  Link as LinkIcon,
  Store,
  Layers,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BakeryMap from "./BakeryMap"; // Your map component

const BakeryCard = ({ company, ownerId }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showMap, setShowMap] = useState(false); // new state
  const navigate = useNavigate();

  const {
    companyName,
    companyLogo,
    branches,
    email,
    phone,
    city,
    country,
    verified,
    description,
    website,
    establishedYear,
    owner,
    mapLocation, // Google Maps link like "https://www.google.com/maps?q=40.7126,-74.0066"
  } = company;

  // Extract lat/lng from Google Maps link
  let lat = null;
  let lng = null;
  if (mapLocation) {
    const match = mapLocation.match(/q=([-.\d]+),([-.\d]+)/);
    if (match) {
      lat = parseFloat(match[1]);
      lng = parseFloat(match[2]);
    }
  }

  const displayBranches =
    branches && Array.isArray(branches) ? branches.join(", ") : branches;

  return (
    <div className="bg-white group overflow-hidden rounded-2xl shadow-xl border border-gray-100 transition-all duration-500 flex flex-col transform hover:scale-[1.03] hover:shadow-2xl">
      {/* Banner / Logo */}
      <div className="relative h-40 w-full overflow-hidden bg-orange-50 rounded-t-2xl border-b-4 border-orange-100">
        {companyLogo ? (
          <img
            src={companyLogo}
            alt={`${companyName} Logo`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-orange-100 text-orange-600 font-extrabold text-2xl p-4">
            <Store size={48} />
            <span className="mt-2 text-sm">Image Placeholder</span>
          </div>
        )}
      </div>

      {/* Main Info */}
      <div className="p-6 pb-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {companyName || "Unnamed Bakery"}
          </h2>
          {verified && (
            <span
              className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 mt-1"
              title="Verified Partner"
            >
              <CheckCircle size={12} />
            </span>
          )}
        </div>

        {displayBranches && (
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1 mb-4">
            <Layers size={14} className="text-orange-400" />
            <span className="font-semibold">Branches:</span> {displayBranches}
          </p>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center gap-3 mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={() => navigate(`/ownerproducts/${ownerId}`)}
            className="cp flex-1 bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:bg-orange-700 transition transform hover:-translate-y-[1px] text-sm"
          >
            See Products
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="cp flex-shrink-0 border border-orange-400 text-orange-600 px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-1 hover:bg-orange-50 transition-colors text-sm"
          >
            {showDetails ? (
              <>
                Hide <ChevronUp size={16} />
              </>
            ) : (
              <>
                Details <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="py-4 text-gray-700 space-y-3 transition-all duration-300 ease-in-out">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
              {description && (
                <p className="text-sm italic text-gray-600 border-b pb-3 mb-3">
                  <span className="font-bold">Description:</span> "{description}"
                </p>
              )}
              {email && (
                <p className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-orange-500" />{" "}
                  <span className="font-bold">Email:</span> {email}
                </p>
              )}
              {phone && (
                <p className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-orange-500" />{" "}
                  <span className="font-bold">Phone:</span> {phone}
                </p>
              )}
              <p className="flex items-center gap-2 text-sm mt-3">
                <MapPin size={16} className="text-orange-500" />{" "}
                <span className="font-bold">Location:</span> {city || "N/A"},{" "}
                {country || "N/A"}
              </p>
              {owner && (
                <p className="flex items-center gap-2 text-sm">
                  <User size={16} className="text-orange-500" />{" "}
                  <span className="font-bold">Owner:</span> {owner}
                </p>
              )}
              {establishedYear && (
                <p className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-orange-500" />{" "}
                  <span className="font-bold">Established:</span>{" "}
                  {establishedYear}
                </p>
              )}
            </div>

            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 font-semibold flex items-center gap-2 hover:text-orange-700 transition-colors text-sm justify-center p-2 border border-dashed border-orange-200 rounded-lg"
              >
                <LinkIcon size={18} /> Visit Official Website
              </a>
            )}

            {/* Show Map */}
            {lat && lng && (
              <div className="mt-4">
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="cp bg-orange-100 text-orange-700 px-3 py-1 rounded-md mb-2 text-sm font-medium"
                >
                  {showMap ? "Hide Location" : "See Location"}
                </button>

                {showMap && <BakeryMap lat={lat} lng={lng} />}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BakeryCard;