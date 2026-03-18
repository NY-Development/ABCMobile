// Admin API Service
// Mirrors the backend admin endpoints from adminRoutes.js

import API from './axios';

/**
 * Get admin dashboard statistics
 * GET /admin/dashboard
 */
export const getAdminDashboardStats = async () => {
  const res = await API.get('/admin/dashboard');
  return res.data;
};

/**
 * Get all users
 * GET /admin
 */
export const getAllUsers = async () => {
  const res = await API.get('/admin');
  return res.data;
};

/**
 * Get single user details with related data
 * GET /admin/:userId/details
 */
export const getUserDetails = async (userId: string) => {
  const res = await API.get(`/admin/${userId}/details`);
  return res.data;
};

/**
 * Get all owners
 * GET /admin/owners
 */
export const getAllOwners = async () => {
  const res = await API.get('/admin/owners');
  return res.data;
};

/**
 * Get single owner by ID
 * GET /admin/owners/:ownerId
 */
export const getOwnerById = async (ownerId: string) => {
  const res = await API.get(`/admin/owners/${ownerId}`);
  return res.data;
};

/**
 * Delete a single user and all related data
 * DELETE /admin/users/:userId
 */
export const deleteUser = async (userId: string) => {
  const res = await API.delete(`/admin/users/${userId}`);
  return res.data;
};

/**
 * Delete all users and their related data
 * DELETE /admin/users
 */
export const deleteAllUsers = async () => {
  const res = await API.delete('/admin/users');
  return res.data;
};

/**
 * Verify owner's company license
 * PUT /admin/verify/:ownerId
 */
export const verifyCompany = async (ownerId: string) => {
  const res = await API.put(`/admin/verify/${ownerId}`);
  return res.data;
};

/**
 * Get all payments for admin
 * GET /admin/all-payments
 */
export const getAllPayments = async () => {
  const res = await API.get('/admin/all-payments');
  return res.data;
};

/**
 * Approve advertisement payment
 * PUT /admin/approve/:advertId
 */
export const approveAdvertPayment = async (advertId: string) => {
  const res = await API.put(`/admin/approve/${advertId}`);
  return res.data;
};

/**
 * Decline advertisement
 * PUT /admin/decline/:advertId
 */
export const declineAdvert = async (advertId: string) => {
  const res = await API.put(`/admin/decline/${advertId}`);
  return res.data;
};
