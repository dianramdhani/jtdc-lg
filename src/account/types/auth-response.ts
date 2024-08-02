export class AuthResponse {
  signInByEmail: SignInByEmail;
}

interface SignInByEmail {
  meta: Meta;
  result: Result;
}

interface Meta {
  code: string;
  error: string;
  message: string;
}

interface Result {
  auth: Auth;
  firstLogin: boolean;
  message: string;
  status: boolean;
  user: User;
}

interface Auth {
  token: string;
  tokenExpiry: number;
  tokenRefresh: string;
}

interface User {
  address: string;
  addressCity: string;
  addressDistrict: string;
  addressPostalCode: string;
  addressProvince: string;
  birthDate: string;
  email: string;
  gender: string;
  isActive: boolean;
  isPurchasers: boolean;
  isReseller: boolean;
  isSubscriber: boolean;
  isVerifiedEmail: boolean;
  isVerifiedPhone: boolean;
  memberLevel: string;
  name: string;
  phone: string;
  points: number;
  userId: number;
}
