import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoginImage from "../assets/Login.jpg";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useTheme } from "../store/themeStore";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loggedInUser = await login(formData);

      if (!loggedInUser || !loggedInUser.role) {
        toast.error(t("login.error.invalid_credentials"));
        return;
      }

      if (localStorage.getItem("HomeOrderLink") && loggedInUser.role === "customer") {
        const result = localStorage.getItem("HomeOrderLink");
        navigate(result);
        toast.success(
          t("login.toast.welcome_back", { name: loggedInUser.name || t("login.default_user") })
        );
        localStorage.removeItem("HomeOrderLink");
        return;
      }

      const destination =
        loggedInUser.role === "owner" && loggedInUser?.ownerInfo?.firstLogin === false
          ? "/additionalInfo"
          : loggedInUser.role === "owner"
          ? "/owner"
          : loggedInUser.role === "admin"
          ? "/admin"
          : "/bakeries";

      toast.success(
        t("login.toast.welcome_back", { name: loggedInUser.name || t("login.default_user") })
      );
      navigate(destination);
    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg =
        error.response?.data?.message || t("login.error.generic");
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const baseURL =
      import.meta.env.VITE_API_BASE_URL ||
      "https://bakerybackend-nine.vercel.app";
    const googleURL = `${baseURL}/api/auth/google`;

    toast.loading(t("login.toast.redirecting_google"), { duration: 2000 });
    window.location.href = googleURL;
  };

  const IconWrapper = ({ children }) => (
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-orange-500">
      {children}
    </div>
  );

  return (
    <div
      className={`flex min-h-screen font-sans ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Left section with background */}
      <div
        className={`hidden md:flex flex-1 items-center justify-center p-8 bg-cover bg-center ${
          isDark ? "bg-gray-800" : "bg-gray-900"
        }`}
        style={{
          backgroundImage: `url(${LoginImage})`,
          boxShadow: isDark
            ? "inset 0 0 0 2000px rgba(0, 0, 0, 0.6)"
            : "inset 0 0 0 2000px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="text-center p-6 rounded-xl">
          <h1 className="text-5xl font-extrabold text-white">ABC</h1>
          <p className="text-xl text-orange-400 mt-2">
            {t("login.hero_slogan")}
          </p>
        </div>
      </div>

      {/* Right login form */}
      <div
        className={`flex-1 flex items-center justify-center p-6 sm:p-8 ${
          isDark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div
          className={`w-full max-w-lg p-8 rounded-2xl shadow-xl ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h2
            className={`text-4xl font-extrabold text-center mb-10 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {t("login.form_title")}
          </h2>

          {/* Login form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <IconWrapper>
                <Mail size={20} />
              </IconWrapper>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("login.email_placeholder")}
                required
                className={`w-full px-5 pl-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-sm
                  ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
              />
            </div>

            <div className="relative">
              <IconWrapper>
                <Lock size={20} />
              </IconWrapper>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("login.password_placeholder_min")}
                required
                minLength={8}
                className={`w-full px-5 pl-10 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-500 transition shadow-sm
                  ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  }`}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-orange-500" />
                ) : (
                  <Eye size={20} className="text-orange-500" />
                )}
              </div>
            </div>

            <div className="flex justify-end text-sm">
              <Link
                to="/forgot"
                className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
              >
                {t("login.forgot_password")}
              </Link>
            </div>

            <button
              type="submit"
              className={`${
                loading ? "cursor-not-allowed" : "cp"
              } w-full py-3 rounded-xl bg-orange-600 text-white text-lg font-bold transition-colors shadow-md hover:bg-orange-700 disabled:opacity-50 mt-8 flex items-center justify-center space-x-2`}
              disabled={loading}
            >
              {loading ? (
                t("login.button.logging_in")
              ) : (
                <>
                  <LogIn size={20} />
                  <span>{t("login.sign_in_btn")}</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div
              className={`flex-grow border-t ${
                isDark ? "border-gray-600" : "border-gray-300"
              }`}
            ></div>
            <span
              className={`flex-shrink mx-4 text-sm font-medium ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {t("login.or_separator")}
            </span>
            <div
              className={`flex-grow border-t ${
                isDark ? "border-gray-600" : "border-gray-300"
              }`}
            ></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className={`w-full flex items-center justify-center space-x-3 py-3 rounded-xl border transition
              ${
                isDark
                  ? "border-gray-600 text-white hover:bg-orange-600 hover:text-white"
                  : "border-gray-300 text-gray-800 hover:bg-orange-600 hover:text-white"
              } cp`}
          >
            <FaGoogle
              className={`${isDark ? "text-white" : "text-black"} hover:text-white`}
              size={20}
            />
            <span className="font-medium">{t("login.google_sign_in_btn")}</span>
          </button>

          <div
            className={`text-center text-sm mt-8 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("login.new_to_platform_prompt")}{" "}
            <Link
              to="/register"
              className="text-orange-600 font-bold hover:underline"
            >
              {t("login.sign_up_here")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
