import API from '../../../services/axios';

export const getAllUsers = async() => {
  const res = await API.get('/admin');
  return res.data;
};

export const getSingleUser = async(id) => {
  const res = await API.get(`/${id}/admin/details`);
  return res.data;
};

export const getAllOwners = async() => {
  const res = await API.get('/admin/owners');
  return res.data;
};

export const getSingleOwner = async(id) => {
  const res = await API.get(`/admin/owners/${id}`);
  return res.data;
};

export const deleteUser = async(id) => {
  const res = await API.delete(`/admin/users/${id}`);
  return res.data;
};

export const deleteAllUsers = async() => {
  const res = await API.delete('/admin/users');
  return res.data;
};

export const verifyCompany = async(id) => {
  const res = await API.get(`/admin/verify/${id}`);
  return res.data;
};

export const getAllPayments = async() => {
  const res = await API.get('/admin/all-payments');
  return res.data;
};

export const getAdminDashboardStats = async() => {
  const res = await API.get('/admin/dashboard');
  return res.data
};