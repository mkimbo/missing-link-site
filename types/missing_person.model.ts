import geofire from "geofire-common";
import { z } from "zod";
import {
  bloodAppealSchema,
  newSightingFormSchema,
  saveMedicalAlertSchema,
} from "./zod_schemas";
export type TLocation = {
  lng: number;
  lat: number;
  address: string;
  geohash: string;
};

export type TGeoLoc = {
  lng: number;
  lat: number;
};

export type TDetailedLocation = {
  placeId: string;
  geoloc: google.maps.LatLngLiteral;
  geohash: string;
  longAddress: string;
  formattedAddress: string;
  county: string;
  constituency: string;
};

export type TPerson = {
  id?: string;
  bannerUrl?: string;
  fullname: string;
  age: number;
  complexion: string;
  found?: boolean;
  gender: string;
  images: string[];
  lastSeenDate: string;
  lastSeenDescription: string;
  othername?: string;
  obNumber: string;
  secondaryContact: number;
  geoloc: {
    lat: number;
    lng: number;
  };
  policeStation: string;
  createdBy: string;
  lastSeenLocation: string;
  geohash: string;
  longAddress: string;
  formattedAddress: string;
  placeId: string;
  county: string;
  constituency: string;
  sightings?: TSighting[];
};

export interface TBloodAppeal extends AppealFormSchema {
  id?: string;
}

type AppealFormSchema = z.infer<typeof saveMedicalAlertSchema>;

type SightingFormSchema = z.infer<typeof newSightingFormSchema>;

export interface TSighting extends SightingFormSchema {
  personId: string;
  sightedBy: string;
  sightingDate: string;
}

export type TNotifiedUser = {
  userId: string;
  distance: number;
  seen: boolean;
};

export type TSaveNotification = {
  id?: string;
  content: string;
  ownerId: string;
  resourceId: string;
  resourceType: TAlertType;
  createdAt: number;
  image: string;
  lat: number;
  lng: number;
  notifiedUsers: TNotifiedUser[];
};

export type TAwardPoints = {
  isPremium: boolean;
  rewardPool: number;
  maxDistance: number;
  receiverDistance: number;
  alertId: string;
  userId: string;
  userRp: TResponsibilityPoint[];
  userVp: number;
};

export type TCalculateRP = {
  rewardPool: number;
  maxDistance: number;
  receiverDistance: number;
};

export type TResponsibilityPoint = {
  userId: string;
  alertId: string;
  redeemed: boolean;
  isPremium: boolean;
};

export type TAlertType =
  | "person"
  | "vehicle"
  | "bike"
  | "sighting"
  | "bloodAppeal";

export type TNotification = {
  title: string;
  body: string;
  icon: string;
  click_action: string;
  type: TAlertType;
};
export type TNotificationInput = {
  // center: geofire.Geopoint;
  center: number[];
  radius?: number;
  notification: TNotification;
};
export type TUserDevice = {
  token: string;
  userId: string;
  rp?: TResponsibilityPoint[];
  vp?: number;
  lat?: number;
  lng?: number;
  subscriptions?: TAlertType[];
  subscribedDistance?: number;
};

export type TPossibleReachReq = {
  radiusInM: number;
  caseLocation: number[];
  type: TAlertType;
  bloodGroup?: string;
};
