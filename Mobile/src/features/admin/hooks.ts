import { useQuery } from '@tanstack/react-query';
import * as adminService from '@/src/services/admin';

// Dashboard Stats
export const useAdminDashboardStats = () => {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn: () => adminService.getAdminDashboardStats(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

// All Users
export const useAllUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => adminService.getAllUsers(),
  });
};

// User Details
export const useUserDetails = (userId: string) => {
  return useQuery({
    queryKey: ['admin', 'user', userId],
    queryFn: () => adminService.getUserDetails(userId),
    enabled: !!userId,
  });
};

// All Owners
export const useAllOwners = () => {
  return useQuery({
    queryKey: ['admin', 'owners'],
    queryFn: () => adminService.getAllOwners(),
  });
};

// Single Owner
export const useOwner = (ownerId: string) => {
  return useQuery({
    queryKey: ['admin', 'owner', ownerId],
    queryFn: () => adminService.getOwnerById(ownerId),
    enabled: !!ownerId,
  });
};

// All Payments
export const useAllPayments = () => {
  return useQuery({
    queryKey: ['admin', 'payments'],
    queryFn: () => adminService.getAllPayments(),
  });
};
