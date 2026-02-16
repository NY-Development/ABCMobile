import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
    Briefcase,
    MapPin,
    Map,
    Factory,
    Image,
    FileText,
    Send,
    Loader2,
    X,
    CreditCard,
    Globe,
    AlertTriangle,
} from "lucide-react";
import { useOwner } from "../context/OwnerContext";
import LI from "../assets/LI.jpg";
import { useAuth } from "../context/AuthContext";

// --- LOCATION FINDER LOGIC (Integrated from LocationFinder.jsx) ---
const LocationStatus = ({ location }) => {
    if (location?.error)
        return (
            <div className="flex items-center space-x-2 text-sm text-red-600 p-3 bg-red-50 rounded-lg">
                <AlertTriangle size={16} />
                <span>{location.error}</span>
            </div>
        );

    if (!location)
        return <p className="text-gray-400 text-sm italic p-4">Detecting location...</p>;

    // Success State
    return (
        <div className="text-sm p-4 bg-white rounded-lg shadow-inner border border-gray-100 space-y-2">
            
            {/* Address Row */}
            <div className="flex flex-col sm:flex-row sm:items-start border-b border-gray-100 pb-2">
                <span className="font-semibold text-gray-800 sm:w-32 flex-shrink-0 mb-1 sm:mb-0">Address:</span>
                <span className="text-gray-700 w-full sm:text-left text-right">{location.formatted_address}</span>
            </div>
            
            {/* City Row */}
            <div className="flex flex-col sm:flex-row sm:items-start border-b border-gray-100 pb-2">
                <span className="font-semibold text-gray-800 sm:w-32 flex-shrink-0 mb-1 sm:mb-0">City:</span>
                <span className="text-gray-700 w-full sm:text-left text-right">{location.city}</span>
            </div>
            
            {/* Country Row */}
            <div className="flex flex-col sm:flex-row sm:items-start border-b border-gray-100 pb-2">
                <span className="font-semibold text-gray-800 sm:w-32 flex-shrink-0 mb-1 sm:mb-0">Country:</span>
                <span className="text-gray-700 w-full sm:text-left text-right">{location.country}</span>
            </div>
            
            {/* Map Link Section */}
            <div className="flex flex-col items-start pt-1">
                <span className="font-semibold text-gray-800 mb-1">Map:</span>
                <span className="text-xs italic animate-pulse font-bold text-red-500 mb-2">
                    Please check the Map before Approving.
                </span>
                <a
                    href={location.googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-700 underline flex items-center gap-1 text-sm font-medium"
                >
                    <MapPin size={14} />
                    View on Google Maps
                </a>
            </div>
        </div>
    );
};
// --- END LOCATION FINDER LOGIC ---

const AdditionalInfo = () => {
    const { submitAdditionalInfo } = useOwner();
    const {user} = useAuth();

    const [info, setInfo] = useState({
        branches: "",
        location: "", // Used for City/Primary Location
        address: "", // Used for Street/Village
        companyName: "",
        accountNumber: "",
        mapLink: "",
    });

    const [autoLocation, setAutoLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false); // New state for location fetching
    const [useAutoLink, setUseAutoLink] = useState(false);

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [tradingLicensePreview, setTradingLicensePreview] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); // State for form submission

    const imageInputRef = useRef(null);
    const licenseInputRef = useRef(null);
    const navigate = useNavigate();

    // --- LOCATION FETCHING EFFECT (Replaces LocationFinder Component) ---
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                setLoadingLocation(true);

                // Step 1: Get user's public IP
                const ipRes = await fetch("https://api.ipify.org?format=json");
                const ipData = await ipRes.json();
                const ip = ipData.ip;
                if (!ip) throw new Error("Unable to fetch IP address");

                // Step 2: Get detailed location info from ip-api
                const locRes = await fetch(`http://ip-api.com/json/${ip}`);
                const locData = await locRes.json();

                if (locData.status === "success") {
                    const { city, country, lat, lon, regionName } = locData;
                    const formatted_address = `${city || ""}, ${regionName || ""}, ${country || ""}`.trim();
                    const googleLink = `https://www.google.com/maps?q=${lat},${lon}`;

                    if(country !== "Ethiopia") return;
                    const detected = {
                        ip,
                        city: city || "Unknown City",
                        country: country || "Unknown Country",
                        formatted_address,
                        latitude: lat,
                        longitude: lon,
                        googleLink,
                    };

                    setAutoLocation(detected);

                } else {
                    setAutoLocation({ error: "Unable to retrieve location data." });
                }
            } catch (err) {
                console.error(err);
                setAutoLocation({ error: "Failed to fetch IP-based location." });
            } finally {
                setLoadingLocation(false);
            }
        };

        fetchLocation();
    }, []); 
    // --- END LOCATION FETCHING EFFECT ---

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: name === "branches" ? parseInt(value) || "" : value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleTradingLicenseChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            if (file.type === "application/pdf") {
                setTradingLicensePreview(LI);
            } else {
                const reader = new FileReader();
                reader.onloadend = () => setTradingLicensePreview(reader.result);
                reader.readAsDataURL(file);
            }
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        if (imageInputRef.current) imageInputRef.current.value = null;
    };

    const removeTradingLicense = () => {
        setFile(null);
        setTradingLicensePreview(null);
        if (licenseInputRef.current) licenseInputRef.current.value = null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const finalMapLink =
                useAutoLink && autoLocation?.googleLink
                    ? autoLocation.googleLink
                    : info.mapLink;
            
            const finalLocation = useAutoLink && autoLocation?.country ? autoLocation.country : info.location;
            const finalAddress = useAutoLink && autoLocation?.city ? autoLocation.city : info.address;

            if (!finalMapLink || !finalLocation || !finalAddress) {
                toast.error("Please approve the location or fill out all location fields.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            Object.entries({ 
                ...info, 
                mapLink: finalMapLink,
                location: finalLocation,
                address: finalAddress,
            }).forEach(([k, v]) =>
                formData.append(k, v)
            );
            if (image) formData.append("companyImage", image);
            if (file) formData.append("tradingLicense", file);

            const result = await submitAdditionalInfo(formData);

            if (result.success) {
                toast.success(result.message || "Information saved successfully!");
                navigate("/owner");
            } else {
                toast.error(result.message || "Failed to save info.");
            }
        } catch (error) {
            console.error("Error submitting additional info:", error);
            toast.error("Failed to save info. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const IconWrapper = ({ children }) => (
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-orange-500">
            {children}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 border border-gray-200"
            >
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                        Complete Your Business Profile
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Provide accurate details about your{" "}
                        <span className="font-bold">bakery’s operations</span> and upload the{" "}
                        <span className="font-bold">required legal documents</span>.
                    </p>
                </div>

                {/* Company Name */}
                <p className="font-bold text-xl italic">General Information</p>
                <div className="relative">
                    <IconWrapper>
                        <Briefcase size={20} />
                    </IconWrapper>
                    <input
                        type="text"
                        name="companyName"
                        value={info.companyName}
                        onChange={handleChange}
                        placeholder="Official Company Name"
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 transition shadow-sm"
                    />
                </div>

                {/* Branches */}
                <div className="relative">
                    <IconWrapper>
                        <Factory size={20} />
                    </IconWrapper>
                    <input
                        type="number"
                        name="branches"
                        value={info.branches}
                        onChange={handleChange}
                        placeholder="Number of Branches"
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 transition shadow-sm"
                    />
                </div>

                {/* Account Number */}
                <div className="relative">
                    <IconWrapper><CreditCard size={20} /></IconWrapper>
                    <input
                        type="text"
                        name="accountNumber"
                        value={info.accountNumber}
                        onChange={handleChange}
                        placeholder="Business Bank Account Number"
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition shadow-sm"
                    />
                </div>

                {/* Auto Location Detection */}
                <p className="font-bold text-xl italic">Location Fields</p>
                <div className="border p-3 rounded-xl bg-gray-50">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-1">
                        <Globe size={18} className="text-orange-500" />
                        Automatically Detected Location (via IP)
                    </label>
                    
                    {/* Display Location Status/Loader */}
                    {loadingLocation ? (
                        <div className="flex items-center space-x-2 text-sm text-orange-600 p-4">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="font-medium">Fetching current location...</span>
                        </div>
                    ) : (
                        <LocationStatus location={autoLocation} />
                    )}

                    {/* Approval Buttons */}
                    {autoLocation && !autoLocation.error && (
                        <div className="flex items-center gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setUseAutoLink(true)}
                                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                                    useAutoLink
                                        ? "bg-green-500 text-white cursor-not-allowed"
                                        : "cp bg-green-200 text-green-500 hover:bg-green-500 hover:text-white"
                                }`}
                            >
                                {useAutoLink ? "Approved" : "Approve"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setUseAutoLink(false)}
                                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                                    !useAutoLink
                                        ? "bg-red-500 text-white cursor-not-allowed"
                                        : "cp bg-red-200 text-red-500 hover:bg-red-500 hover:text-white"
                                }`}
                            >
                                {!useAutoLink ? "Editing" : "Edit"}
                            </button>
                        </div>
                    )}
                </div>

                {autoLocation && (<>
                    <p className="text-gray-600 text-sm">
                        Once you click <span className="font-bold italic">"Approve,"</span> the map link, city, and address fields will be auto-filled and locked.
                    </p>
                    
                    {/* Map Link */}
                    <div className="relative">
                        <IconWrapper>
                            <Map size={20} />
                        </IconWrapper>
                        <input
                            type="url"
                            name="mapLink"
                            // If approved, use autoLocation's link; otherwise, use local state
                            value={useAutoLink ? autoLocation.googleLink : info.mapLink}
                            onChange={useAutoLink ? () => {} : handleChange} // Disable onChange if auto-approved
                            disabled={useAutoLink}
                            placeholder={autoLocation.googleLink ||"Google Maps Link to Your Business"}
                            required
                            className={` ${useAutoLink ? 'cursor-not-allowed bg-gray-100' : ''} w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 transition shadow-sm`}
                        />
                    </div>

                    {/* Location (Country/RegionName from IP) */}
                    <div className="relative">
                        <IconWrapper><MapPin size={20} /></IconWrapper>
                        <input
                            type="text"
                            name="location"
                            // If approved, use autoLocation's country; otherwise, use local state
                            value={useAutoLink ? autoLocation.country : info.location}
                            onChange={useAutoLink ? () => {} : handleChange}
                            disabled={useAutoLink}
                            placeholder={autoLocation.country || "City/Primary Location"}
                            required
                            className={`${useAutoLink ? 'cursor-not-allowed bg-gray-100' : ''} w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 transition shadow-sm`}
                        />
                    </div>

                    {/* Address (City/Street from IP) */}
                    <div className="relative">
                        <IconWrapper><Map size={20} /></IconWrapper>
                        <input
                            type="text"
                            name="address"
                            // If approved, use autoLocation's city; otherwise, use local state
                            value={useAutoLink ? autoLocation.city : info.address}
                            onChange={useAutoLink ? () => {} : handleChange}
                            disabled={useAutoLink}
                            placeholder={autoLocation.city || "Street/Village"}
                            required
                            className={`${useAutoLink ? 'cursor-not-allowed bg-gray-100' : ''} w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 transition shadow-sm`}
                        />
                    </div>       
                </>)}

                {/* Manual Map Link (if location detection failed entirely or is pending) */}
                {!autoLocation && !loadingLocation && (
                    <>
                        <div className="relative">
                            <IconWrapper>
                                <Map size={20} />
                            </IconWrapper>
                            <input
                                type="url"
                                name="mapLink"
                                value={info.mapLink}
                                onChange={handleChange}
                                placeholder="Google Maps Link to Your Business (Manual Entry)"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 transition shadow-sm"
                            />
                        </div>

                        <div className="relative">
                            <IconWrapper><MapPin size={20} /></IconWrapper>
                            <input
                                type="text"
                                name="location"
                                value={info.location}
                                onChange={handleChange}
                                placeholder="City/Primary Location (Manual Entry)"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 transition shadow-sm"
                            />
                        </div>

                        <div className="relative">
                            <IconWrapper><Map size={20} /></IconWrapper>
                            <input
                                type="text"
                                name="address"
                                value={info.address}
                                onChange={handleChange}
                                placeholder="Street Address (Manual Entry)"
                                required
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 transition shadow-sm"
                            />
                        </div>
                    </>
                )}

                {/* Upload Company Image */}
                <p className="font-bold text-xl italic">Company Logo & License</p>
                <div className="border p-3 rounded-xl bg-gray-50">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2">
                        <Image size={18} className="text-orange-500" />
                        Company Logo / Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={imageInputRef}
                        className="w-full border p-2 rounded-lg cursor-pointer text-sm"
                    />
                    {imagePreview && (
                        <div className="relative mt-3">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-lg border"
                            />
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Upload Trading License */}
                <div className="border p-3 rounded-xl bg-gray-50">
                    <label className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2">
                        <FileText size={18} className="text-orange-500" />
                        Upload Trading License (Image or PDF)
                    </label>
                    <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleTradingLicenseChange}
                        ref={licenseInputRef}
                        className="w-full border p-2 rounded-lg cursor-pointer text-sm"
                    />
                    {tradingLicensePreview && (
                        <div className="relative mt-3">
                            <img
                                src={tradingLicensePreview}
                                alt="License Preview"
                                className="w-32 h-32 object-cover rounded-lg border"
                            />
                            <button
                                type="button"
                                onClick={removeTradingLicense}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading || loadingLocation}
                    className="cp w-full py-3 bg-orange-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 transition disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            Save Information
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AdditionalInfo;