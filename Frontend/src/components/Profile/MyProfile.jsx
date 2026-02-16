import React, { useState } from "react";
import { uploadProfileImage } from "../../services/auth";
import toast from "react-hot-toast";
import { Camera, Loader2, User, Phone, Mail, Award } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const MyProfile = () => {

  const {user} = useAuth();
  const [image, setImage] = useState(user?.image || "");
  const [file, setFile] = useState(null);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(selectedFile);
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    if (file) formData.append("image", file);

    try {
      await uploadProfileImage(formData);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <label className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer border-4 border-orange-500">
            {image ? (
              <img src={image} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <User size={32} />
              </div>
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center">
              <Camera className="text-white" />
            </div>
          </label>
        </div>

        {/* Fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
          <input className="input bg-gray-100" value={user?.email} readOnly />
          <input
            className="input bg-gray-100"
            value={
              user?.subscription?.isActive
                ? `Active (${user.subscription.plan})`
                : "No Subscription"
            }
            readOnly
          />
        </div>

        <button
          disabled={loading}
          className="bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" />}
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default MyProfile;