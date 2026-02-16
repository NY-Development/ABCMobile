import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  ShoppingBag,
  Mail,
  LogIn,
  UserPlus,
  LogOut,
  Info,
  Store,
  Sun,
  Moon,
  ShoppingCart,
  Globe,
  LayoutDashboard,
  Users,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useProfileModalStore } from "../store/profileModalStore";
import { useTheme } from "../store/themeStore";
import { useLanguageStore } from "../store/languageStore";
import Profile from "../../components/Profile";
import { useTranslation } from "react-i18next"; // Import useTranslation
import Logo from '../assets/ABC_Logo.png';
import { useScrollDirection } from "../../hooks/useScrollDirection";

const Navbar = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const visible = useScrollDirection(8);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = useProfileModalStore();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguageStore();

  const handleLogout = () => {
    setShowLogoutModal(true);
    setIsMenuOpen(false);
  };

  const confirmLogout = () => {
    logout();
    navigate("/");
    setShowLogoutModal(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full shadow-xl z-50 transition-all duration-300
        ${isDark ? "bg-gray-800 border-b-2 border-white" : "bg-gradient-to-l from-gray-900 to-orange-400 border-b border-orange-300"}
        ${visible ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300
      `}
    >
      <div className="py-4 px-6 max-w-7xl mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center text-2xl font-bold transition-colors duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={Logo}
            alt="Adama Bakery Logo"
            className="w-8 h-8 mr-2 rounded-2xl"
          />
          <span className="hidden md:inline">
            <span className={`${isDark ? "text-white" : "text-gray-900"}`}>Adama</span> Bakery & Cake
          </span>
          <span className="inline md:hidden italic text-white">ABC</span>
        </NavLink>

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="cp text-white">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={toggleLanguage}
            className="cp text-white hover:text-gray-900 transition-colors flex items-center gap-1"
          >
            <Globe size={18} />
            <span className="text-sm uppercase">{language}</span>
          </button>

          {user && (
            <button
              onClick={() => setIsOpen(true)}
              className={`cp flex items-center space-x-2 font-medium transition-colors ${
                isDark ? 'text-white hover:text-gray-300' : 'text-white hover:text-gray-900'
              }`}
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt="User Profile"
                  className="w-6 h-6 rounded-full object-cover border-2 border-white ring-1 ring-orange-200"
                />
              ) : (
                <User size={20} />
              )}
              <span className="hidden sm:inline">{t("profile")}</span>
            </button>
          )}

          <button
            className={`cp p-2 rounded-md transition-colors ${
              isDark ? 'text-white hover:text-gray-300' : 'text-white hover:text-gray-900'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div
        className={`
          overflow-hidden transition-all duration-700 ease-in-out
          ${isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
          ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-orange-600"} shadow-lg
        `}
      >
        <div className="flex flex-col space-y-1 p-4">
          {user?.role === "admin" ? (
            <>
              <h4 className={`text-xs font-semibold uppercase pt-2 pb-1 border-b mb-1 ${isDark ? 'text-white border-white' : 'text-gray-500 border-gray-300'}`}>Admin Panel</h4>
              <NavLink
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <LayoutDashboard size={20} className="text-orange-500" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/admin/users"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <Users size={20} className="text-orange-500" />
                <span>Users</span>
              </NavLink>
              <NavLink
                to="/admin/owners"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <Store size={18} className="text-orange-500" />
                <span>Owners</span>
              </NavLink>
              <NavLink
                to="/admin/payments"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <DollarSign size={20} className="text-orange-500" />
                <span>Payments</span>
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <Mail size={20} className="text-orange-500" />
                <span>Contact</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="cp w-full text-left flex items-center space-x-3 text-red-500 hover:bg-red-50 p-3 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : user?.role === "customer" ? (
            <>
              <NavLink
                to="/bakeries"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <Store size={18} className="text-orange-500" />
                <span>{t("bakeries")}</span>
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <Mail size={20} className="text-orange-500" />
                <span>{t("contact")}</span>
              </NavLink>
              <NavLink
                to="/clientorder"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <ShoppingCart size={20} className="text-orange-500" />
                <span>{t("my_cart")}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="cp w-full text-left flex items-center space-x-3 text-red-500 hover:bg-red-50 p-3 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span>{t("logout")}</span>
              </button>
            </>
          ) : user?.role === "owner" ? (
            <>
              <NavLink
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <Mail size={20} className="text-orange-500" />
                <span>{t("contact")}</span>
              </NavLink>
              <NavLink
                to="/owner"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <Store size={18} className="text-orange-500" />
                <span>{t("owner")}</span>
              </NavLink>
              <NavLink
                to="/ordercenter"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-gray-300 hover:text-orange-400 hover:bg-gray-700' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <ShoppingBag size={20} className="text-orange-500" />
                <span>{t("manage_orders")}</span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="cp w-full text-left flex items-center space-x-3 text-red-500 hover:bg-red-50 p-3 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span>{t("logout")}</span>
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-white hover:text-orange-400 hover:bg-gray-700' : 'text-black hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <Info size={20} className="text-orange-500" />
                <span>{t("about")}</span>
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-white hover:text-orange-400 hover:bg-gray-700' : 'text-black hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <LogIn size={20} className="text-orange-500" />
                <span>{t("login")}</span>
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-white hover:text-orange-400 hover:bg-gray-700' : 'text-black hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <UserPlus size={20} className="text-orange-500" />
                <span>{t("register")}</span>
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${isDark ? 'text-white hover:text-orange-400 hover:bg-gray-700' : 'text-black hover:text-orange-600 hover:bg-orange-50'}
                `}
              >
                <Mail size={20} className="text-orange-500" />
                <span>{t("contact")}</span>
              </NavLink>
            </>
          )}
        </div>
      </div>

      {isOpen && <Profile onClose={() => setIsOpen(false)} user={user} />}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] backdrop-blur-xs">
          <div className={`rounded-xl shadow-lg w-80 p-6 text-center space-y-4 transition-colors ${isDark ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <h2 className="text-lg font-bold text-red-500 dark:text-orange-500">
              {t("confirm_logout")}
            </h2>
            <p className={`text-sm ${isDark ? "text-gray-300" : "text-black"}`}>
              {t("logout_message")}
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="cp px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
              >
                {t("cancel")}
              </button>
              <button
                onClick={confirmLogout}
                className="cp px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                {t("log_out_btn")}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;