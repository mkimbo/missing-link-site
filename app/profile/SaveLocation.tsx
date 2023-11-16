"use client";

import { useAuth } from "@/auth/context";
import React, { useEffect } from "react";
import { useZact } from "zact/client";
import { updateUser } from "../actions/actions";
import { getGeoHash } from "@/lib/functions";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type TButtonProps = {
  enabledLocation?: boolean;
};

export function SaveLocation({ enabledLocation }: TButtonProps) {
  const { user } = useAuth();
  const { mutate, data, isLoading } = useZact(updateUser);
  const [disabled, setDisabled] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState<any>();

  // const handleClick = () => {
  //   setDisabled(true);
  //   const id = setTimeout(() => {
  //     setDisabled(false);
  //   }, 60000);
  //   setTimeoutId(id);
  // };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId); // Clear the timer if the component is unmounted before the timeout completes
    };
  }, []);

  const handleGetLocation = () => {
    const successCallback = async (geoPosition: GeolocationPosition) => {
      const position = {
        lat: geoPosition?.coords?.latitude,
        lng: geoPosition?.coords?.longitude,
      };
      const geohash = getGeoHash(position);
      await mutate({
        id: user?.uid!,
        email: user?.email!,
        photoUrl: user?.photoURL!,
        geohash: geohash,
        lat: geoPosition?.coords?.latitude,
        lng: geoPosition?.coords?.longitude,
        enabledLocation: true,
      });

      if (data?.success) {
        toast({
          title: "Location updated successfully!",
        });

        //  revalidatePath("/profile");

        // handleClick();
        return true;
      } else {
        return false;
      }
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.log(error);
      return false;
    };

    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    };

    if ("geolocation" in navigator) {
      // Access the API
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        geolocationOptions
      );
    } else {
      // Use a third-party geolocation service
      toast({
        title: "Browser does not support the Geolocation API",
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-between space-x-2">
      <Label htmlFor="necessary" className="flex flex-col space-y-1">
        <span>GeoLocation</span>
        <span className="font-normal leading-snug text-muted-foreground">
          Your location is necessary for this application to work.
        </span>
      </Label>
      <Switch
        id="necessary"
        onCheckedChange={(val) => {
          if (val) {
            handleGetLocation();
          }
        }}
      />
    </div>
  );
}
