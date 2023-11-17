"use client";
import { AlertTriangle, Bell, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
import { User } from "@/types/redux";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/context";
import { setVerifiedCookie } from "@/lib/functions";
import { getDatabase, onValue, ref } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import localforage from "localforage";
import { TSaveNotification } from "@/types/missing_person.model";
import { clientConfig } from "@/config/client-config";
import { set } from "lodash";
type Props = {};

function NotificationsStatus() {
  const { user } = useAuth();
  const tenant = user; //useSelector((state: RootState) => state.auth.tenant);
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

    return resp.user as User;
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
        //get all notifications that match the tenant id
        // console.log("notification", notification);
        notification?.notifiedUsers?.forEach((notified) => {
          console.log(notified.userId, "notification", user?.uid);
          if (notified.userId === user?.uid && !notified.seen) {
            setCount((prev) => prev + 1);
          }
        });
      });
      // group notifications by resource type
    });
  }, [user, db]);

  if (error)
    return (
      <Button
        variant="ghost"
        size="icon"
        className="mr-4"
        aria-label="Notifications Warning"
        onClick={() => router.push("/profile")}
      >
        <AlertTriangle className="h-6 w-6 animate-pulse text-destructive" />
        <span className="sr-only">Notifications Warning</span>
      </Button>
    );
  if (isLoading) return <></>;

  return tenant?.email ? (
    <>
      {!data?.enabledLocation || !data?.enabledNotifications ? (
        <Button
          variant="ghost"
          size="icon"
          className="mr-4"
          aria-label="Notifications Warning"
          onClick={() => router.push("/profile")}
        >
          <AlertTriangle className="h-6 w-6 animate-bounce text-destructive" />
          <span className="sr-only">Notifications Warning</span>
        </Button>
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
          <Bell className={`h-5 w-5 ${count > 0 && "animate-ping"}`} />
          <span className="sr-only">Notifications</span>
        </Button>
      )}
    </>
  ) : (
    <></>
  );
}

export default NotificationsStatus;
