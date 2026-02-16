import React, { useState } from "react";
import { uploadProfileImage } from "../pages/Auth/services/auth";
import toast from "react-hot-toast";
import { Camera, Loader2, X, User, Phone, Mail, Award } from "lucide-react";

const Profile = ({ onClose, user }) => {
  const [image, setImage] = useState(user?.image || "");
  const [file, setFile] = useState(null);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      setFile(selectedFile);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (file) formData.append("image", file);

    try {
      await uploadProfileImage(formData); 
      toast.success("Profile updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || err.message || "Error updating profile.";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500 text-white';
      case 'owner':
        return 'bg-orange-500 text-white';
      case 'customer':
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className="pt-60 fixed inset-0 flex items-center justify-center backdrop-blur-xs z-[9999] p-4 overflow-y-auto">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 p-2 rounded-full transition bg-gray-50 hover:bg-gray-100"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-3xl font-extrabold mb-1 text-gray-900">
          Your Profile
        </h2>
        <p className="text-gray-500 mb-6">
          Update your personal information and preferences.
        </p>

        {error && (
          <div className="text-red-700 bg-red-100 border border-red-300 p-3 rounded-xl mb-6 text-sm font-medium flex items-center">
            <X size={16} className="mr-2 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Image Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <label
                htmlFor="file-input"
                className="w-36 h-36 rounded-full bg-gray-100 cursor-pointer overflow-hidden flex items-center justify-center relative group border-4 border-orange-500 ring-4 ring-orange-100 shadow-xl"
              >
                {image ? (
                  <img
                    src={image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500 p-4">
                    <User size={36} />
                    <span className="text-xs mt-2 font-medium">Add Photo</span>
                  </div>
                )}
                {/* Overlay for interaction */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                  <Camera
                    size={32}
                    className="text-white opacity-0 group-hover:opacity-100 transition"
                  />
                </div>
              </label>
              <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              {/* Role Badge */}
              <span className={`absolute bottom-0 right-0 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${getRoleColor(user?.role)}`}>
                {user?.role.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">Click to change profile picture</p>
          </div>

          {/* Editable Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                <User size={14} className="inline mr-1 text-orange-500" /> Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                placeholder={user?.name || 'Enter your Name'}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                <Phone size={14} className="inline mr-1 text-orange-500" /> Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                placeholder={user?.phone || "Enter your phone number"}
              />
            </div>

            {/* Read-Only Email */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail size={14} className="inline mr-1 text-orange-500" /> Email
              </label>
              <input
                type="email"
                value={user?.email || "N/A"}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Read-Only Subscription */}
            <div className="col-span-1 sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Award size={14} className="inline mr-1 text-orange-500" /> Subscription Status
              </label>
              <input
                type="text"
                value={
                  user?.subscription?.isActive
                    ? `Active: ${user.subscription.plan}`
                    : "No Active Subscription"
                }
                readOnly
                className={`w-full px-4 py-3 border rounded-xl bg-gray-50 text-sm font-semibold ${
                    user?.subscription?.isActive ? 'text-green-600 border-green-200' : 'text-gray-500 border-gray-200'
                } cursor-not-allowed`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="cp flex-1 w-full flex items-center justify-center bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-md shadow-orange-300 hover:bg-orange-700 disabled:opacity-70 disabled:cursor-not-allowed transition duration-150"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cp flex-1 w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium text-lg hover:bg-gray-200 disabled:opacity-50 transition duration-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;