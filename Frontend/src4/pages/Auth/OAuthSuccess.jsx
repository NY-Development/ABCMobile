import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, Loader2 } from "lucide-react";

const OAuthSuccess = () => {
  const { setTokenAndFetchUser, user, loading } = useAuth();
  const navigate = useNavigate();
  const hasStarted = useRef(false);
  const [countdown, setCountdown] = useState(3);

  // STEP 1: Get token and fetch user
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      toast.error("No token received from OAuth.");
      navigate("/login");
      return;
    }
    setTokenAndFetchUser(token);
  }, [setTokenAndFetchUser, navigate]);

  // STEP 2: Start countdown and redirect only ONCE after user loads
  useEffect(() => {
    if (!loading && user && !hasStarted.current) {
      hasStarted.current = true;
      toast.success(`Welcome, ${user.name}! Redirecting...`);

      // Countdown logic (separate from redirect)
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // Redirect after 3 seconds
      const redirectTimer = setTimeout(() => {
        const destination =
          user.role === "owner"
            ? "/owner/dashboard"
            : user.role === "client"
            ? "/client/dashboard"
            : "/";
        navigate(destination);
      }, 3000);

      return () => {
        clearInterval(countdownInterval);
        clearTimeout(redirectTimer);
      };
    }
  }, [user, loading, navigate]);

  const percentage = ((3 - countdown) / 3) * 100;
  const success = countdown === 0 || (!loading && user && hasStarted.current);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-white">
      <div className="text-center p-8 bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-orange-100 animate-in fade-in duration-500">

        {/* Status Icon */}
        <div className="mb-6 flex justify-center">
          {success ? (
            <CheckCircle
              size={64}
              className="text-green-500 animate-bounce-slow transition-all duration-700"
            />
          ) : (
            <Loader2 size={64} className="text-orange-500 animate-spin-slow" />
          )}
        </div>

        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          {loading ? "Authenticating..." : "Login Successful!"}
        </h1>

        {/* User Display */}
        {user && !loading && (
          <p className="text-xl text-gray-700 font-medium mb-3">
            Welcome,{" "}
            <span className="text-orange-600 capitalize">
              {user.name || "User"}
            </span>
          </p>
        )}

        {/* Countdown */}
        <p className="text-gray-500 mb-6">
          Redirecting you to your dashboard in{" "}
          <span
            className={`text-2xl font-extrabold transition-all duration-500 ${
              countdown <= 2 ? "text-red-500 scale-110" : "text-orange-600"
            }`}
          >
            {countdown}
          </span>{" "}
          seconds.
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              success
                ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                : "bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 animate-pulse"
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* Manual Redirect Button */}
        {countdown < 3 && (
          <button
            onClick={() => {
              if (user) {
                const destination =
                  user.role === "owner"
                    ? "/owner/dashboard"
                    : user.role === "client"
                    ? "/client/dashboard"
                    : "/";
                navigate(destination);
              }
            }}
            disabled={!user || loading}
            className="mt-6 w-full py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-700 transition-all duration-300 hover:scale-105 disabled:bg-gray-400"
          >
            Click to Redirect Now
          </button>
        )}
      </div>
    </div>
  );
};

export default OAuthSuccess;