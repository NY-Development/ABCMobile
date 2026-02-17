export type AuthStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: { email?: string } | undefined;
  ResetPassword: { email?: string } | undefined;
  OTPVerification: { email?: string } | undefined;
  OAuthSuccess: { token?: string } | undefined;
  Settings: undefined;
  About: undefined;
  Contact: undefined;
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
  Eula: undefined;
};

export type CustomerTabsParamList = {
  Home: undefined;
  About: undefined;
  Settings: undefined;
};
