export const ROUTES = {
  Landing: 'Landing',
  Login: 'Login',
  Register: 'Register',
  ForgotPassword: 'ForgotPassword',
  ResetPassword: 'ResetPassword',
  OTPVerification: 'OTPVerification',
  OAuthSuccess: 'OAuthSuccess',
  Home: 'Home',
  About: 'About',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];
