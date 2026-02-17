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

export type CustomerTabsParamList = {
  Home: undefined;
  About: undefined;
  Settings: undefined;
};

export type CustomerStackParamList = {
  CustomerTabs: undefined;
  CustomerStorefront: {
    ownerId: string;
    ownerName: string;
    ownerImage?: string;
    rating?: number;
    reviewsCount?: number;
    location?: string;
    status?: string;
  };
  BakeryDetail: {
    ownerId: string;
    ownerName: string;
    ownerImage?: string;
    rating?: number;
    reviewsCount?: number;
    location?: string;
    status?: string;
  };
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
