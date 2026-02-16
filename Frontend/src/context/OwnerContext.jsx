import React, { createContext, useState, useContext } from "react";
import {
  updateOwnerAdditionalInfo,
  addProduct, // can be used later
  getOwnerProducts, // optional for owner dashboard
} from "../services/owner";

const OwnerContext = createContext();

export const OwnerProvider = ({ children }) => {
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products of the logged-in owner (used as "profile" data)
  const fetchOwnerProfile = async (ownerId) => {
    setLoading(true);
    try {
      const data = await getOwnerProducts(ownerId);
      setOwner(data?.owner || null);
      return data;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch owner profile");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update owner additional info (after signup)
  const submitAdditionalInfo = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateOwnerAdditionalInfo(formData);
      if (data.success) setOwner(data.owner);
      return data;
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update owner info");
      return { success: false, message: err.message || "Failed to update owner info" };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    owner,
    loading,
    error,
    fetchOwnerProfile,
    submitAdditionalInfo,
  };

  return <OwnerContext.Provider value={value}>{children}</OwnerContext.Provider>;
};

export const useOwner = () => useContext(OwnerContext);
export default OwnerContext;