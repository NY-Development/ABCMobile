import API from './api';

export type OwnerInfo = {
  companyName?: string;
  companyImage?: string;
  tradingLicense?: string;
  branches?: number;
  location?: string;
  address?: string;
  mapLocation?: string;
  completed?: boolean;
};

export type OwnerUser = {
  _id: string;
  name: string;
  email?: string;
  role?: string;
  image?: string;
  ownerInfo?: OwnerInfo | null;
};

export type Product = {
  _id: string;
  name: string;
  category?: string;
  price: number;
  image?: string;
  description?: string;
  owner?: OwnerUser | string | null;
};

export type OwnerReview = {
  id: string;
  customerName?: string;
  customerImage?: string;
  comment?: string;
  rating: number;
  createdAt?: string;
};

export type OwnerReviewsResponse = {
  total: number;
  averageRating: number | string;
  reviews: OwnerReview[];
};

export const fetchOwners = async (): Promise<OwnerUser[]> => {
  const res = await API.get('/auth');
  return res.data;
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await API.get('/owners/all');
  return res.data;
};

export const fetchOwnerProducts = async (ownerId: string): Promise<Product[]> => {
  const res = await API.get(`/owners/my/${ownerId}`);
  return res.data;
};

export const fetchOwnerReviews = async (ownerId: string): Promise<OwnerReviewsResponse> => {
  const res = await API.get(`/reviews/owner/${ownerId}`);
  return res.data;
};
