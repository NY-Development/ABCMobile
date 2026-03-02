export type AuthStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: { email?: string } | undefined;
  ResetPassword: { email?: string } | undefined;
  PasswordResetSuccess: undefined;
  OTPVerification: { email?: string } | undefined;
  OAuthSuccess: { token?: string } | undefined;
  Settings: undefined;
  About: undefined;
  Contact: undefined;
  CustomRequest: undefined;
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
  Eula: undefined;
};

export type CustomerStackParamList = {
  CustomerHome: undefined;
  Explore: undefined;
  Cart: undefined;
  Checkout: undefined;
  Update: undefined;
  Notification: undefined;
  Orders: undefined;
  CustomerTabs: undefined;
  CustomerStorefront: {
    ownerId?: string;
    ownerName?: string;
    ownerImage?: string;
    rating?: number;
    reviewsCount?: number;
    location?: string;
    status?: string;
    ownerPhone?: string;
    ownerEmail?: string;
  };
  BakeryDetail: {
    ownerId?: string;
    ownerName?: string;
    ownerImage?: string;
    rating?: number;
    reviewsCount?: number;
    location?: string;
    status?: string;
    ownerPhone?: string;
    ownerEmail?: string;
  };
  CustomerProfile: undefined;
  ProductDetail: {
    productId: string;
    name: string;
    price: number;
    image?: string;
    description?: string;
    ownerName?: string;
    rating?: number;
    reviewsCount?: number;
  };
};

export type CustomerTabParamList = {
  CustomerHome: undefined;
  Explore: undefined;
  Orders: undefined;
  CustomerProfile: undefined;
};

export type OwnerStackParamList = {
  OwnerTabs: undefined;
  OwnerHome: undefined;
  OwnerProducts: undefined;
  OwnerOrders: undefined;
  OwnerProfile: undefined;
  Update: undefined;
  Notification: undefined;
  OwnerOrderDetail: {
    orderId: string;
    placedAt: string;
    customerName: string;
    customerAddress: string;
    customerRating: string;
    status: 'Confirmed' | 'Baking' | 'Ready' | 'Delivered';
    items: Array<{
      name: string;
      description: string;
      price: string;
      qty: number;
      image: string;
    }>;
    subtotal: string;
    taxesFees: string;
    totalRevenue: string;
  };
};

export type OwnerTabParamList = {
  OwnerHome: undefined;
  OwnerProducts: undefined;
  OwnerOrders: undefined;
  OwnerProfile: undefined;
};
