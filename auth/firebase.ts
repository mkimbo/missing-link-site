import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  getApps,
  initializeApp,
} from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { clientConfig } from "../config/client-config";
import { nanoid } from "nanoid";
const getFirebaseApp = (options: FirebaseOptions) => {
  return (!getApps().length ? initializeApp(options) : getApp()) as FirebaseApp;
};

export const useFirebaseAuth = () => {
  const getFirebaseAuth = () => {
    const auth = getAuth(getFirebaseApp(clientConfig));

    if (process.env.NEXT_PUBLIC_EMULATOR_HOST) {
      // https://stackoverflow.com/questions/73605307/firebase-auth-emulator-fails-intermittently-with-auth-emulator-config-failed
      (auth as unknown as any)._canInitEmulator = true;
      connectAuthEmulator(auth, process.env.NEXT_PUBLIC_EMULATOR_HOST, {
        disableWarnings: true,
      });
    }

    return auth;
  };

  return { getFirebaseAuth };
};

// const getAuth = async (options: FirebaseOptions) => {
//   const app = await getFirebaseApp(options);
//   const { getAuth } = await import("firebase/auth");

//   return getAuth(app);
// };

const getFirestore = async (options: FirebaseOptions) => {
  const app = await getFirebaseApp(options);
  const { getFirestore } = await import("firebase/firestore");

  return getFirestore(app);
};

export const getMessaging = async (options: FirebaseOptions) => {
  const app = await getFirebaseApp(options);
  const { getMessaging } = await import("firebase/messaging");

  return getMessaging(app);
};

export const getOnMessage = async (options: FirebaseOptions) => {
  const app = await getFirebaseApp(options);
  const messaging = await getMessaging(options);
  const { onMessage } = await import("firebase/messaging");

  return onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    const body = JSON.parse(payload.notification?.body!);
    const title = JSON.parse(payload.notification?.title!);
    var options = {
      body,
    };
    //new self.registration.showNotification(title,options)
    new self.Notification(title, options);
    // toast.info(`${title} ${body}}`, {
    //   position: "bottom-left",
    // });
    console.log("Message received. ", payload);
  });
};

export const getFCMToken = async (options: FirebaseOptions) => {
  const messaging = await getMessaging(options);
  const { getToken } = await import("firebase/messaging");
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
  });
  return token;
};

export const useFirebaseDb = (options: FirebaseOptions) => {
  const getFirebaseDb = async () => {
    return getFirestore(options);
  };

  return { getFirebaseDb };
};

export const getFirebaseRTDB = async (options: FirebaseOptions) => {
  const app = await getFirebaseApp(options);
  const { getDatabase } = await import("firebase/database");

  return getDatabase(app);
};

export const useFirebaseRTDB = (options: FirebaseOptions) => {
  const getRTDB = async () => {
    return getFirebaseRTDB(options);
  };

  return { getRTDB };
};

export const getStorage = async (options: FirebaseOptions) => {
  const app = await getFirebaseApp(options);
  const { getStorage } = await import("firebase/storage");

  return getStorage(app);
};

export const uploadFileToCloud = async (file: any) => {
  try {
    const id = nanoid();
    const storage = await getStorage(clientConfig);
    const fileName = `${Date.now()}-${id}`;
    const storageRef = ref(storage, "files/" + fileName);
    const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);
    const downloadUrl = await getDownloadURL(uploadTaskSnapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.log("error uploading to storage", error);
  }
};
