import { useContext, useState } from "react";
// Assuming you have a way to import icons, for this example, I'll use placeholders
import { User, Heart, ShoppingBag, CreditCard, Lock, Settings as SettingsIcon, ShoppingCart, LogOut } from 'lucide-react'; 

import MyProfile from "./Profile/MyProfile";
import Wishlist from "./Profile/Wishlist";
import MyOrder from "./Profile/MyOrder";
import MyPayment from "./Profile/MyPayment";
import Security from "./Profile/Security";
import Settings from "./Profile/Settings";
import MyCart from "./Profile/MyCart"
import GoBack from "./Goback";
import { useAuth } from "../context/AuthContext";

// Define the icons for each tab
const tabIcons = {
  profile: User,
  wishlist: Heart,
  orders: ShoppingBag,
  cart: ShoppingCart,
  payments: CreditCard,
  security: Lock,
  settings: SettingsIcon,
  logout: LogOut, // Added a placeholder logout button for a common pattern
};

const Profile = () => {
  const {user} = useAuth();
  const tabs = [
    { key: "profile", label: "Profile" },
    { key: "wishlist", label: "Wishlist" },
    { key: "orders", label: "Orders" },
    { key: "cart", label: "Cart" },
    { key: "payments", label: "Payments" },
    { key: "security", label: "Security" },
    { key: "settings", label: "Settings" },
    // { key: "logout", label: "Logout", isAction: true }, // Example action tab
  ];

  const [activeTab, setActiveTab] = useState("profile");

  const renderSection = () => {
    switch (activeTab) {
      case "profile":
        return <MyProfile user={user} />;
      case "wishlist":
        return <Wishlist />;
      case "orders":
        return <MyOrder />;
      case "cart":
        return <MyCart />;
      case "payments":
        return <MyPayment />;
      case "security":
        return <Security />;
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    // Outer container now uses min-h-screen and removes max-width constraints
    <div className="flex min-h-screen bg-gray-100">
      {/* 1. Sidebar/Tabs (Vertical Navigation) */}
      <div className="w-64 bg-white shadow-xl flex flex-col justify-between border-r border-gray-200 p-4">
        
        {/* Navigation Links */}
        <nav className="space-y-2 pt-4">
          <GoBack to="/bakeries" user/>
          <h2 className="text-lg font-bold text-gray-800 mb-4 px-3">My Account</h2>
          {tabs.map((tab) => {
            const Icon = tabIcons[tab.key];
            const isActive = activeTab === tab.key;
            
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 
                  ${
                    isActive
                      ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                  }`}
              >
                {Icon && <Icon className="h-5 w-5 mr-3" />}
                {tab.label}
              </button>
            );
          })}
        </nav>
        
        {/* Optional: Placeholder for a logout button */}
        <div className="mt-8 pt-4 border-t border-gray-200">
             <button
                // onClick={() => handleLogout()} // Example handler
                className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
        </div>
      </div>

      {/* 2. Content Area */}
      {/* This area expands to fill the remaining space (flex-1) */}
      <div className="flex-1 p-8 bg-white overflow-y-auto">
        <header className="mb-8 border-b pb-4">
          {/* Dynamically display the current active section title */}
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {tabs.find(t => t.key === activeTab)?.label}
          </h1>
          <p className="text-gray-500 mt-1">
            View and update your {tabs.find(t => t.key === activeTab)?.label.toLowerCase()} information.
          </p>
        </header>
        
        {/* Rendered Component Fills the Content Area */}
        {renderSection()}
      </div>
    </div>
  );
};

export default Profile;