import { PhoneNumberRegex } from "@/lib/constants";
import { z } from "zod";

export const newAlertFormSchema = z.object({
  fullname: z.string({ required_error: "Required" }),
  PIDisclaimer: z.boolean(),
  othername: z.string().optional(),
  age: z.number().int().positive().max(99, "Invalid age"),
  gender: z.string({ required_error: "Required" }),
  complexion: z.string({ required_error: "Required" }),
  lastSeenLocation: z.string().optional(),
  lastSeenDate: z.string({ required_error: "Required" }),
  alertRadius: z.string({ required_error: "Required" }),
  placeId: z.string().nonempty("Please choose a location from the dropdown"),
  geoloc: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  geohash: z.string(),
  longAddress: z.string(),
  formattedAddress: z.string(),
  county: z.string(),
  constituency: z.string(),
  secondaryContact: z.string({ required_error: "Required" }),
  lastSeenDescription: z
    .string()
    .max(350, "Maximum length")
    .nonempty("Required"),
  images: z.array(z.string()).transform((data, ctx) => {
    if (!Array.isArray(data) || data.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please add at least one recent photo",
      });
      return z.NEVER;
    }
    return data.map((item) => item.trim());
  }),
  policeStation: z.string({ required_error: "Required" }),
  obNumber: z.string({ required_error: "Required" }),
});

export const bloodAppealSchema = z.object({
  fullname: z.string({ required_error: "Required" }),
  PIDisclaimer: z.boolean(),
  //needsPlatelets: z.boolean(),
  //pUnits: z.number().int().positive().optional(),
  bUnits: z
    .number()
    .int()
    .positive()
    .max(5, "You can only appeal for a maximum of 5 units"),
  hospitalLocation: z.string().optional(),
  alertRadius: z.string({ required_error: "Required" }),
  placeId: z.string().nonempty("Please choose a location from the dropdown"),
  geoloc: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  geohash: z.string(),
  longAddress: z.string(),
  formattedAddress: z.string(),
  county: z.string(),
  constituency: z.string(),
  secondaryContact: z.string({ required_error: "Required" }),
  requestDescription: z.string().max(300, "Maximum length").optional(),

  hospitalName: z.string({ required_error: "Required" }),
  bloodGroup: z.string({ required_error: "Required" }),
});

export const newMotorAlertSchema = z.object({
  make: z.string({ required_error: "Required" }),
  model: z.string().optional(),
  PIDisclaimer: z.boolean(),
  year: z.string().optional(),
  color: z.string({ required_error: "Required" }),
  alertRadius: z.string({ required_error: "Required" }),
  motorType: z.string().optional(),
  licencePlate: z.string({ required_error: "Required" }),
  lastSeenLocation: z.string().optional(),
  lastSeenDate: z.string({ required_error: "Required" }),
  placeId: z.string({
    required_error: "Please choose a location from the dropdown",
  }),
  geoloc: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  geohash: z.string(),
  longAddress: z.string(),
  formattedAddress: z.string(),
  county: z.string(),
  constituency: z.string(),
  secondaryContact: z.string({ required_error: "Required" }),
  lastSeenDescription: z
    .string()
    .max(350, "Maximum length")
    .nonempty("Required"),
  images: z.array(z.string()).transform((data, ctx) => {
    if (!Array.isArray(data) || data.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please add at least one recent photo",
      });
      return z.NEVER;
    }
    return data.map((item) => item.trim());
  }),
  policeStation: z.string({ required_error: "Required" }),
  obNumber: z.string({ required_error: "Required" }),
});

export const savePersonAlertSchema = z.intersection(
  newAlertFormSchema,
  z.object({
    found: z.boolean(),
    createdBy: z.string().nonempty("Required"),
  })
);

export const saveMotorAlertSchema = z.intersection(
  newMotorAlertSchema,
  z.object({
    found: z.boolean(),
    createdBy: z.string().nonempty("Required"),
  })
);

export const saveMedicalAlertSchema = z.intersection(
  bloodAppealSchema,
  z.object({
    createdBy: z.string({ required_error: "Required" }),
  })
);

export const newSightingFormSchema = z.object({
  sightingLocation: z.string(),
  placeId: z.string({ required_error: "Required" }),
  geoloc: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  geohash: z.string(),
  longAddress: z.string(),
  formattedAddress: z.string(),
  sightingDescription: z.string().max(350, "Maximum length").optional(),
});

export const updateUserSchema = z.object({
  id: z.string().min(1, "Required"),
  email: z.string().optional(),
  geohash: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  phoneNumber: z
    .object({
      number: z.string(),
      verified: z.boolean(),
    })
    .optional(),
  enabledLocation: z.boolean().optional(),
  bloodAppealAlerts: z.boolean().optional(),
  bloodGroup: z.string().optional(),
  missingPersonAlerts: z.boolean().optional(),
  missingVehicleAlerts: z.boolean().optional(),
  missingBikeAlerts: z.boolean().optional(),
  alertRadius: z.number().optional(),
  enabledNotifications: z.boolean().optional(),
  notificationToken: z.string().optional(),
  photoUrl: z.string().optional(),
});

export const verifyMobileNumberSchema = z.object({
  id: z.string().min(1, "Required"),
  email: z.string().optional(),
  photoUrl: z.string().optional(),
  otpCode: z.string().min(6, "Required"),
  phoneNumber: z.string(),
});

export const registerMobileNumberSchema = z.object({
  mobile: z.string(),
});

export const donationRequestFormSchema = z.object({
  appealId: z.string({ required_error: "Required" }),
  donorRequestContact: z.string({ required_error: "Required" }),
  donorId: z.string({ required_error: "Required" }),
  requestAccepted: z.boolean(),
  PIDisclaimer: z.boolean(),
});
