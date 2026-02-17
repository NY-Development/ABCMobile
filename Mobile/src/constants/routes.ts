export const ROUTES = {
  Landing: 'Landing',
  Login: 'Login',
  Register: 'Register',
  ForgotPassword: 'ForgotPassword',
  ResetPassword: 'ResetPassword',
  PasswordResetSuccess: 'PasswordResetSuccess',
  OTPVerification: 'OTPVerification',
  OAuthSuccess: 'OAuthSuccess',
  About: 'About',
  Settings: 'Settings',
  Contact: 'Contact',
  CustomRequest: 'CustomRequest',
  CustomerStorefront: 'CustomerStorefront',
  BakeryDetail: 'BakeryDetail',
  ProductDetail: 'ProductDetail',
  PrivacyPolicy: 'PrivacyPolicy',
  TermsOfService: 'TermsOfService',
  Eula: 'Eula',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
