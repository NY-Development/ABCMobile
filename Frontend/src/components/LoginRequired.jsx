import React from 'react';
import { Link } from 'react-router-dom';

const LoginRequired = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Login Required</h1>
      <p className="text-lg mb-4">You must be logged in to view this page.</p>
      <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
        Go to Login
      </Link>
    </div>
  );
};

export default LoginRequired;