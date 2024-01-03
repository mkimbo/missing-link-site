export type CounterState = {
  count: number;
};

export interface Tenant {
  id: string;
  name: string | null;
  email: string | null;
  photoUrl: string | null;
  emailVerified: boolean;
  customClaims: CustomClaims;
  isAnonymous?: boolean;
  idToken?: string;
}

export interface UserFull {
  alertRadius: number;
  bloodGroup?: string;
  country: string;
  email: string;
  enabledLocation: boolean;
  enabledNotifications: boolean;
  geohash: string;
  id: string;
  lat: number;
  lng: number;
  bloodAppealAlerts: boolean;
  missingBikeAlerts: boolean;
  missingPersonAlerts: boolean;
  missingVehicleAlerts: boolean;
  notificationToken: string;
  phoneNumber: { number: string; verified: boolean };
  photoUrl: string;
}

export type CustomClaims = { [key: string]: any };
