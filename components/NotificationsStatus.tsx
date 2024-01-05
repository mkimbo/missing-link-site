"use client";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { UserFull } from "@/types/redux";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/context";
import { setVerifiedCookie } from "@/lib/functions";
import { getDatabase, onValue, ref } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import localforage from "localforage";
import { TSaveNotification } from "@/types/missing_person.model";
import { clientConfig } from "@/config/client-config";
import { SettingsErrorDialog } from "./SettingsErrorDialog";
import { useUser } from "@/context/UserContext";

function NotificationsStatus() {
  const { user } = useAuth();
  const { saveUser } = useUser();

  const tenant = user;
  const [count, setCount] = useState(0);
  const router = useRouter();
  const fetcher = async (url: string) => {
    if (!tenant?.email) {
      return null;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const resp = await response.json();

    return resp.user as UserFull;
  };
  const { data, error, isLoading } = useSWR(
    `/api/status/${tenant?.uid}`,
    fetcher,
    { revalidateOnFocus: true }
  );

  useEffect(() => {
    if (data?.phoneNumber?.verified) {
      setVerifiedCookie("true");
    }
    if (data) {
      saveUser(data);
    }
    console.log("data", data);
    localforage.setItem("enabledNotifications", data?.enabledNotifications);
    localforage.setItem("enabledLocation", data?.enabledLocation);
  }, [data]);

  const db = getDatabase(
    !getApps().length ? initializeApp(clientConfig) : getApp()
  );

  useEffect(() => {
    if (!user?.email) return;
    const notificationsRef = ref(db, "notifications");
    onValue(notificationsRef, (snapshot) => {
      let notificationsArray: TSaveNotification[] = [];
      snapshot?.forEach(function (childSnapshot) {
        const notification: TSaveNotification = childSnapshot.val();
        notification?.notifiedUsers?.forEach((notified) => {
          console.log(notified.userId, "notification", user?.uid);
          if (notified.userId === user?.uid && !notified.seen) {
            setCount((prev) => prev + 1);
          }
        });
      });
    });
  }, [user, db]);

  if (error) return <SettingsErrorDialog />;
  if (isLoading) return <></>;

  return tenant?.email ? (
    <>
      {!data?.enabledLocation || !data?.enabledNotifications ? (
        <SettingsErrorDialog />
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="mr-4"
          aria-label="Notifications"
          onClick={() => {
            setCount(0);
            router.push("/alerts");
          }}
        >
          <Bell
            className={`h-5 w-5 ${count > 0 && "animate-ping text-primary"} `}
          />
          <span className="sr-only">Notifications</span>
        </Button>
      )}
    </>
  ) : (
    <></>
  );
}

export default NotificationsStatus;
