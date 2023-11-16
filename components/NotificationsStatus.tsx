"use client";
import { AlertTriangle, Bell, Loader } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
import { User } from "@/types/redux";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/context";
import { setVerifiedCookie } from "@/lib/functions";
import localforage from "localforage";
type Props = {};

function NotificationsStatus() {
  const { user } = useAuth();
  const tenant = user; //useSelector((state: RootState) => state.auth.tenant);

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

  if (error)
    return (
      <div>
        <AlertTriangle className="mr-2 h-6 w-6 animate-pulse text-destructive" />
      </div>
    );
  if (isLoading) return <></>;

  return tenant?.email ? (
    <>
      {!data?.enabledLocation || !data?.enabledNotifications ? (
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications Warning"
          onClick={() => router.push("/alerts")}
        >
          <AlertTriangle className="h-6 w-6 animate-bounce text-destructive" />
          <span className="sr-only">Notifications Warning</span>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>
      )}
    </>
  ) : (
    <></>
  );
}

export default NotificationsStatus;
