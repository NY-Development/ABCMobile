export type AuthStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: { email?: string } | undefined;
  ResetPassword: { email?: string } | undefined;
  OTPVerification: { email?: string } | undefined;
  OAuthSuccess: { token?: string } | undefined;
};

export type CustomerTabsParamList = {
  Home: undefined;
  About: undefined;
};
