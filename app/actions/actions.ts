// action.ts
"use server";

import { z } from "zod";
import { zact } from "zact/server";
import { nanoid } from "nanoid";
import { admin, serverDB, serverRTDB } from "@/lib/firebase";
import { getTokens } from "next-firebase-auth-edge/lib/next/tokens";
import {
  newAlertFormSchema,
  newMotorAlertSchema,
  saveMotorAlertSchema,
  savePersonAlertSchema,
  updateUserSchema,
  newSightingFormSchema,
  verifyMobileNumberSchema,
  registerMobileNumberSchema,
  bloodAppealSchema,
  saveMedicalAlertSchema,
} from "@/types/zod_schemas";
import { revalidatePath } from "next/cache";
import {
  TAlertType,
  TNotification,
  TNotificationInput,
  TNotifiedUser,
  TSaveNotification,
  TUserDevice,
} from "@/types/missing_person.model";

//import geofire from "geofire-common";
//import { MulticastMessage } from "firebase-admin/lib/messaging/messaging-api-internal";
import { getTenantFromCookies } from "@/auth/server-auth-provider";
import { cookies } from "next/headers";
import { User } from "@/types/redux";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);
const geofire = require("geofire-common");
const saveSightingSchema = z.intersection(
  newSightingFormSchema,
  z.object({
    itemId: z.string().nonempty("Missing person ID is required"),
    sightedBy: z.string().nonempty("Required"),
    sightingDate: z.string().nonempty("Required"),
  })
);

const markAsFound = z.object({
  itemId: z.string().nonempty("Required"),
  type: z.string().nonempty("Required"),
});

export const markPersonFound = zact(markAsFound)(async (input) => {
  const docRef = serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_PERSONS!)
    .doc(input.itemId);

  await docRef.update({
    found: true,
  });
  const url = `/persons/${input.itemId}`;
  revalidatePath(url);
  return {
    success: true,
  };
});

export const markMotorFound = zact(markAsFound)(async (input) => {
  const docRef = serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_MOTORS!)
    .doc(input.itemId);

  await docRef.update({
    found: true,
  });
  if (input.type === "vehicle") {
    revalidatePath(`/vehicles${input.itemId}`);
  }
  if (input.type === "bike") {
    revalidatePath(`/bikes${input.itemId}`);
  }
  return {
    success: true,
  };
});

export const savePersonSighting = zact(saveSightingSchema)(async (input) => {
  const docRef = serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_PERSONS!)
    .doc(input.itemId);
  const doc = await docRef.get();
  const caseOwnerId = doc.data()?.createdBy;

  await docRef.update({
    sightings: admin.firestore.FieldValue.arrayUnion(input),
  });
  const url = `/persons/${input.itemId}`;
  revalidatePath(url);
  //notify case owner
  const caseOwner = await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_USER_COLLECTION!)
    .doc(caseOwnerId)
    .get();
  const notification = {
    title: doc.data()?.fullname,
    body: `has been sighted around ${input?.sightingLocation?.toLowerCase()}`,
    icon: doc.data()?.images[0],
    click_action: `https://amber-alerts.vercel.app/persons/${input.itemId}`,
    type: "sighting" as TAlertType,
  };
  const tokenData = [
    {
      token: caseOwner.data()?.notificationToken,
      userId: caseOwnerId,
    },
  ];
  if (!caseOwner.data()?.notificationToken) {
    console.log("Case owner has no notification token. No notification sent.");
    return { success: true, ownerNotified: false };
  }
  const successfullyNotified = await sendAlertToUserDevices(
    tokenData,
    notification
  );
  return {
    success: true,
    ownerNotified: true,
    notificationSent: successfullyNotified.length > 0,
  };
});

export const saveMotorSighting = zact(saveSightingSchema)(async (input) => {
  console.log(input, "formState.isValid");
  const docRef = serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_MOTORS!)
    .doc(input.itemId);
  const doc = await docRef.get();
  const caseOwnerId = doc.data()?.createdBy;

  await docRef.update({
    sightings: admin.firestore.FieldValue.arrayUnion(input),
  });
  const url = `/vehicles/${input.itemId}`;
  revalidatePath(url);
  //notify case owner
  const caseOwner = await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_USER_COLLECTION!)
    .doc(caseOwnerId)
    .get();
  const notification = {
    title: doc.data()?.licencePlate,
    body: `has been sighted around ${input?.sightingLocation?.toLowerCase()}`,
    icon: doc.data()?.images[0],
    click_action: `https://amber-alerts.vercel.app/vehicles/${input.itemId}`,
    type: "sighting" as TAlertType,
  };
  const tokenData = [
    {
      token: caseOwner.data()?.notificationToken,
      userId: caseOwnerId,
    },
  ];
  if (!caseOwner.data()?.notificationToken) {
    console.log("Case owner has no notification token. No notification sent.");
    return { success: true, ownerNotified: false };
  }
  const successfullyNotified = await sendAlertToUserDevices(
    tokenData,
    notification
  );
  return {
    success: true,
    ownerNotified: true,
    notificationSent: successfullyNotified.length > 0,
  };
});

export const saveAlert = zact(savePersonAlertSchema)(async (data) => {
  const docID = nanoid();
  await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_PERSONS!)
    .doc(docID)
    .set(data);
  revalidatePath("/persons");
  const center = [Number(data.geoloc.lat), Number(data.geoloc.lng)];
  const notification = {
    title: data.fullname,
    body: "has just been reported missing in your area",
    icon: data.images[0],
    click_action: `https://amber-alerts.vercel.app/persons/${docID}`,
    type: "person" as TAlertType,
  };
  const successfullyNotified = await sendNotifications({
    center,
    radius: parseInt(data.alertRadius),
    notification,
  });
  const notifiedList = [];
  for (const user of successfullyNotified) {
    const distanceInKm = geofire.distanceBetween(center, [user.lat, user.lng]);
    notifiedList.push({
      userId: user.userId,
      distance: distanceInKm,
      points: 10, // TODO: calculate points based on distance
      redeemed: false,
      seen: false,
    });
  }

  await saveNotification({
    content: `${data.fullname} has been reported missing`,
    ownerId: data.createdBy,
    resourceId: docID,
    resourceType: "person",
    createdAt: Date.now(),
    image: data.images[0],
    lat: data.geoloc.lat,
    lng: data.geoloc.lng,
    notifiedUsers: notifiedList,
  });

  return {
    success: true,
    id: docID,
    notificationSent: successfullyNotified.length > 0,
    numUsersNotified: successfullyNotified.length,
  };
});

export const saveMotorAlert = zact(saveMotorAlertSchema)(async (data) => {
  const docID = nanoid();
  await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_MOTORS!)
    .doc(docID)
    .set(data);
  let action = "";
  if (data.motorType === "vehicle") {
    revalidatePath("/vehicles");
    action = `https://amber-alerts.vercel.app/vehicles/${docID}`;
  }
  if (data.motorType === "bike") {
    revalidatePath("/bikes");
    action = `https://amber-alerts.vercel.app/bikes/${docID}`;
  }
  const center = [Number(data.geoloc.lat), Number(data.geoloc.lng)];
  const notification = {
    title: data.licencePlate,
    body: "has just been reported missing in your area",
    icon: data.images[0],
    click_action: action,
    type: data.motorType as TAlertType,
  };
  const successfullyNotified = await sendNotifications({
    center,
    radius: parseInt(data.alertRadius),
    notification,
  });
  const notifiedList = [];
  for (const user of successfullyNotified) {
    notifiedList.push({
      userId: user.userId,
      distance: user.subscribedDistance!,
      points: 10, // TODO: calculate points based on distance
      redeemed: false,
      seen: false,
    });
  }

  await saveNotification({
    content: `${data.licencePlate} has been reported missing`,
    ownerId: data.createdBy,
    resourceId: docID,
    resourceType: data.motorType as TAlertType,
    createdAt: Date.now(),
    image: data.images[0],
    lat: data.geoloc.lat,
    lng: data.geoloc.lng,
    notifiedUsers: notifiedList,
  });

  return {
    success: true,
    id: docID,
    motorType: data.motorType,
    notificationSent: successfullyNotified.length > 0,
    numUsersNotified: successfullyNotified.length,
  };
});

export const saveBloodAppealAlert = zact(saveMedicalAlertSchema)(
  async (data) => {
    const docID = nanoid();
    await serverDB
      .collection(process.env.FIREBASE_FIRESTORE_BLOOD_APPEALS!)
      .doc(docID)
      .set(data);
    //TODO: add action
    let action = "";
    revalidatePath("/missing/blood-appeals");
    const center = [Number(data.geoloc.lat), Number(data.geoloc.lng)];
    const notification = {
      title: "Urgent Blood Appeal",
      body: `${data.fullname} admitted at ${data.hospitalName} needs ${data.bUnits} units of ${data.bloodGroup} blood`,
      icon: "https://firebasestorage.googleapis.com/v0/b/amber-alerts-ke.appspot.com/o/blood.png?alt=media&token=8b5b5b1a-7b0a-4b0a-9b0a-5b0a5b0a5b0a",
      click_action: action,
      type: "bloodAppeal" as TAlertType,
    };
    const successfullyNotified = await sendNotifications({
      center,
      radius: parseInt(data.alertRadius),
      notification,
    });
    const notifiedList = [];
    for (const user of successfullyNotified) {
      notifiedList.push({
        userId: user.userId,
        distance: user.subscribedDistance!,
        points: 10, // TODO: calculate points based on distance
        redeemed: false,
        seen: false,
      });
    }

    await saveNotification({
      content: `${data.fullname} needs ${data.bloodGroup} blood urgently.`,
      ownerId: data.createdBy,
      resourceId: docID,
      resourceType: "bloodAppeal" as TAlertType,
      createdAt: Date.now(),
      image: "",
      lat: data.geoloc.lat,
      lng: data.geoloc.lng,
      notifiedUsers: notifiedList,
    });

    return {
      success: true,
      id: docID,
      notificationSent: successfullyNotified.length > 0,
      numUsersNotified: successfullyNotified.length,
    };
  }
);

export const updateUser = zact(updateUserSchema)(
  async (
    data
  ): Promise<{
    success: boolean;
    data: z.infer<typeof updateUserSchema> | null;
  }> => {
    try {
      await serverDB
        .collection(process.env.FIREBASE_FIRESTORE_USER_COLLECTION!)
        .doc(data.id)
        .set(JSON.parse(JSON.stringify(data)), { merge: true });
      revalidatePath("/profile");
      return { success: true, data: data as z.infer<typeof updateUserSchema> };
    } catch (error) {
      console.log("error fetching user", error);
      return { success: false, data: null };
    }
  }
);

export const getLoggedUser = async (id: string): Promise<User | null> => {
  console.log(id, "getting user with id");
  try {
    const user = await serverDB
      .collection(process.env.FIREBASE_FIRESTORE_USER_COLLECTION!)
      .doc(id)
      .get();
    if (!user.exists) return Promise.resolve(null);
    return Promise.resolve(user.data() as User);
  } catch (error) {
    console.log("error fetching user", error);
    return Promise.resolve(null);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const tenant = await getTenantFromCookies(cookies);
    const user = await serverDB
      .collection(process.env.FIREBASE_FIRESTORE_USER_COLLECTION!)
      .doc(tenant?.uid!)
      .get();
    if (!user.exists) return Promise.resolve(null);
    return Promise.resolve(user.data() as User);
  } catch (error) {
    console.log("error fetching user", error);
    return Promise.resolve(null);
  }
};

export const registerMobileNumber = zact(registerMobileNumberSchema)(
  async (data): Promise<{ success: boolean; mobile: string }> => {
    try {
      const response = await twilioClient.verify.v2
        .services("VA7d5b858fb0469e1515d03c762977a9b0")
        .verifications.create({ to: data.mobile, channel: "sms" });
      return { success: true, mobile: data.mobile };
    } catch (error) {
      console.log("error sending otp", error);
      return { success: false, mobile: data.mobile };
    }
  }
);

export const verifyMobileNumber = zact(verifyMobileNumberSchema)(
  async (data): Promise<boolean> => {
    try {
      const { phoneNumber, otpCode, email, id, photoUrl } = data;

      const response = await twilioClient.verify.v2
        .services("VA7d5b858fb0469e1515d03c762977a9b0")
        .verificationChecks.create({ to: phoneNumber, code: otpCode });
      console.log(response.status, "verification status");
      if (response.status === "approved") {
        let data;
        data = {
          id: id,
          email: email,
          phoneNumber: {
            number: phoneNumber,
            verified: true,
          },
          photoUrl: photoUrl,
        };
        const docID = id;
        await serverDB
          .collection(process.env.FIREBASE_FIRESTORE_USER_COLLECTION!)
          .doc(docID)
          .set(JSON.parse(JSON.stringify(data)), { merge: true });
        return true;
      }

      return false;
    } catch (error) {
      console.log("error fetching verifying otp", error);
      return false;
    }
  }
);

export const sendNotifications = async ({
  center,
  radius,
  notification,
}: TNotificationInput): Promise<TUserDevice[]> => {
  const radiusInM = 100 * 1000; // radius ? radius * 1000 : 100 * 1000; //100km - should come from user input in future - default should be 5km
  const nearbyUsers = await getUsersWithinRadiusOfCase(radiusInM, center);
  const tenant = await getTenantFromCookies(cookies);
  const tokenData: TUserDevice[] = [];
  const validUsers: TUserDevice[] = [];
  nearbyUsers.forEach((user) => {
    if (user.data().notificationToken && user.data().id !== tenant?.uid) {
      tokenData.push({
        token: user.data().notificationToken,
        userId: user.data().id,
        lat: user.data().lat,
        lng: user.data().lng,
        subscriptions: [
          "person",
          "sighting",
          user.data().missingVehicleAlerts && "vehicle",
          user.data().missingBikeAlerts && "bike",
          user.data().bloodAppealAlerts && "bloodAppeal",
        ],
        subscribedDistance: user.data().alertRadius ?? 5,
      });
    }
  });

  for (const device of tokenData) {
    const distanceInKm = geofire.distanceBetween(center, [
      device.lat,
      device.lng,
    ]);
    if (
      distanceInKm <= device.subscribedDistance! &&
      device.subscriptions!.includes(notification.type!)
    ) {
      validUsers.push({
        ...device,
        subscribedDistance: distanceInKm,
      });
    }
  }

  if (!validUsers.length) {
    console.log("No nearby Users found. No notifications sent.");
    return [];
  }

  const successfullyNotified = await sendAlertToUserDevices(
    validUsers,
    notification
  );
  return successfullyNotified;
};

const getUsersWithinRadiusOfCase = async (
  radiusInM: number,
  caseLocation: number[]
) => {
  const bounds = await geofire.geohashQueryBounds(caseLocation, radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = serverDB
      .collection(process.env.FIREBASE_FIRESTORE_USER_COLLECTION!)
      .orderBy("geohash")
      .startAt(b[0])
      .endAt(b[1]);

    promises.push(q.get());
  }
  return Promise.all(promises).then((snapshots) => {
    const matchingDocs = [];

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = doc.get("lat");
        const lng = doc.get("lng");
        // filter out a few false positives due to GeoHash accuracy
        const distanceInKm = geofire.distanceBetween([lat, lng], caseLocation);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc);
        }
      }
    }

    return matchingDocs;
  });
};

export const getAppealsWithinRadiusOfUser = async (
  radiusInM: number,
  userLocation: number[]
) => {
  const bounds = await geofire.geohashQueryBounds(userLocation, radiusInM);
  const promises = [];
  for (const b of bounds) {
    const q = serverDB
      .collection(process.env.FIREBASE_FIRESTORE_BLOOD_APPEALS!)
      .orderBy("geohash")
      .startAt(b[0])
      .endAt(b[1]);

    promises.push(q.get());
  }
  return Promise.all(promises).then((snapshots) => {
    const matchingDocs = [];

    for (const snap of snapshots) {
      for (const doc of snap.docs) {
        const lat = doc.get("geoloc.lat");
        const lng = doc.get("geoloc.lng");
        // filter out a few false positives due to GeoHash accuracy
        const distanceInKm = geofire.distanceBetween([lat, lng], userLocation);
        const distanceInM = distanceInKm * 1000;
        if (distanceInM <= radiusInM) {
          matchingDocs.push(doc);
        }
      }
    }

    return matchingDocs;
  });
};

const sendAlertToUserDevices = async (
  userDevices: TUserDevice[],
  notification: TNotification
) => {
  const tokensToRemove: Promise<any>[] = [];
  const failedTokens: string[] = [];
  const successfullyNotified: TUserDevice[] = [];
  let successCount: TUserDevice[];
  let failureCount = 0;

  const message = {
    webpush: {
      notification: {
        title: notification.title,
        body: notification.body,
        icon: notification.icon,
        click_action: notification.click_action,
      },
    },
    tokens: userDevices.map((device) => device.token),
  };
  const response = await admin.messaging().sendEachForMulticast(message);

  response.responses.forEach((resp, idx) => {
    if (!resp.success) {
      if (
        resp.error?.code === "messaging/invalid-registration-token" ||
        resp.error?.code === "messaging/registration-token-not-registered"
      ) {
        failedTokens.push(userDevices[idx].userId);
      }
    } else {
      successfullyNotified.push(userDevices[idx]);
    }
  });
  failedTokens.forEach((id) => {
    tokensToRemove.push(
      serverDB
        .collection(process.env.FIREBASE_FIRESTORE_USER_COLLECTION!)
        .doc(id)
        .update({
          notificationToken: null,
          // enabledNotifications: false,
        })
    );
  });

  // Remove devices which are not registered anymore.
  await Promise.all(tokensToRemove);
  return successfullyNotified;
};

// save notification object to firebase realtime db
export const saveNotification = async (data: TSaveNotification) => {
  const notificationRef = serverRTDB.ref(`notifications`);
  const newKey = notificationRef.push().key;
  await notificationRef.child(newKey!).set({ id: newKey, ...data });
  return { success: true, id: newKey };
};

export const markNotificationsAsSeen = async (data: {
  tenantID: string;
  list: TSaveNotification[];
}) => {
  const updatePromises: Promise<any>[] = [];
  for (const item of data.list) {
    const notificationRef = serverRTDB.ref(`notifications/${item.id}`);
    const notifiedUsers: TNotifiedUser[] = item.notifiedUsers.map((user) => {
      if (user.userId === data.tenantID) {
        return { ...user, seen: true };
      }
      return user;
    });
    updatePromises.push(
      notificationRef.update({
        notifiedUsers: notifiedUsers,
      })
    );
  }
  Promise.all(updatePromises);
};

export const getStatus = async () => {
  const tenant = await getTenantFromCookies(cookies);
  if (tenant?.email != null) {
    try {
      const response = await fetch("http://localhost:3000/api/status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // next: { revalidate: 60 },
      });
      console.log(await response.json(), "data");
      const resp = await response.json();
      return resp as User;
    } catch (error) {
      console.log(error, "error");
    }
  }

  // if (response.status === 200) {
  //   const data = await response.json();
  //   console.log(data, "data");
  //   return data as User;
  // }
  //return null;
};

export const deleteAuthCookies = () => {
  cookies().delete("AuthToken");
  revalidatePath("/");
};
