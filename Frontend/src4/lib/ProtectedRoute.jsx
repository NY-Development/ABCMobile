import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../sharedStores/authStore';
import LoadingPage from '../sharedComponents/LoadingPage'

const ProtectedRoute = ({ children, roles }) => {
  const { user, initialized, fetchProfile } = useAuthStore();

  // Lazy fetch auth info
  useEffect(() => {
    if (!initialized) fetchProfile();
  }, [initialized, fetchProfile]);

  // Show loading until auth state is checked
  if (!initialized) return <LoadingPage />;

  // Not logged in
  if (!user) return <Navigate to="/" replace />;

  // Optional role check
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;