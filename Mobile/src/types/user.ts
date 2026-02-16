export type UserRole = 'customer' | 'owner' | 'admin';

export type OwnerInfo = {
  firstLogin?: boolean;
};

export type User = {
  id?: string;
  uid?: string;
  name?: string;
  email?: string;
  role?: UserRole;
  ownerInfo?: OwnerInfo;
};
