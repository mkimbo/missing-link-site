"use client";

import * as React from "react";
import { useZact } from "zact/client";
import localforage from "localforage";
import { getFCMToken } from "@/auth/firebase";
import { clientConfig } from "@/config/client-config";

import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
import { updateUser } from "../actions/actions";
import { useAuth } from "@/auth/context";
const environment = process.env.NODE_ENV || "development";
type TButtonProps = {
  // enabledNotifications?: boolean;
};

export function AllowNotificationsButton() {
  const { user } = useAuth();
  const { mutate, data, isLoading } = useZact(updateUser);

  const handleSubscribe = async () => {
    const status = await Notification.requestPermission();
    if (!status || status !== "granted") {
      toast({
        title: "Please allow notifications from your browser settings",
      });
    }
    const fcm_token = await getFCMToken(clientConfig);
    if (fcm_token) {
      await mutate({
        id: user?.uid!,
        notificationToken: fcm_token,
        enabledNotifications: true,
      });
      localforage.setItem("fcm_token", fcm_token);
      localforage.setItem("enabledNotifications", true);
      //Todo
      //set enabled to true in user object
      //setUser({ ...user, enabledNotifications: true });
    } else {
      return toast({
        title: "FCM token not found",
      });
    }
  };

  if (!user) {
    return null;
  }

  if (data?.success) {
    // revalidatePath("/profile");
    toast({
      title: "Notifications enabled successfully!",
    });
  }

  return (
    <div className="flex items-center justify-between space-x-2">
      <Label htmlFor="necessary" className="flex flex-col space-y-1">
        <span>PUSH Notifications</span>
        <span className="font-normal leading-snug text-muted-foreground">
          Notifications are integral for this application to work.
        </span>
      </Label>
      {isLoading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Switch
          id="necessary"
          onCheckedChange={(val) => {
            if (val) {
              handleSubscribe();
            }
          }}
        />
      )}
    </div>
    // <Button
    //   loading={isLoading}
    //   disabled={isLoading || enabledNotifications}
    //   onClick={handleSubscribe}
    //   style={{ width: "100%" }}
    // >
    //   {enabledNotifications ? "Notifications enabled" : "Enable notifications"}
    // </Button>
  );
}
