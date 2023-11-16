"use client";
import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { clientConfig } from "@/config/client-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TSaveNotification } from "@/types/missing_person.model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AlertCard from "./AlertCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/auth/context";
import { markNotificationsAsSeen } from "../actions/actions";

export default function AlertsList() {
  // const tenant = useSelector((state: RootState) => state.auth.tenant);
  const { user } = useAuth();
  //   if (!tenant || tenant?.isAnonymous) return;
  const [notificationsLoaded, setNotificationsLoaded] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [notificationList, setNotificationList] = useState<TSaveNotification[]>(
    []
  );
  const [personList, setPersonList] = useState<TSaveNotification[]>([]);
  const [motorsList, setMotorsList] = useState<TSaveNotification[]>([]);

  const [sightingsList, setSightingsList] = useState<TSaveNotification[]>([]);

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
          if (notified.userId === user?.uid) {
            notificationsArray = [...notificationsArray, notification];
          }
        });
      });
      // group notifications by resource type
      const persons = notificationsArray?.filter(
        (notification) => notification.resourceType === "person"
      );
      const motors = notificationsArray?.filter(
        (notification) =>
          notification.resourceType === "vehicle" ||
          notification.resourceType === "bike"
      );
      const sightings = notificationsArray?.filter(
        (notification) => notification.resourceType === "sighting"
      );
      setPersonList(persons);
      setMotorsList(motors);
      setSightingsList(sightings);
      setNotificationList(notificationsArray);
      markNotificationsAsSeen({
        tenantID: user?.uid!,
        list: notificationsArray,
      });
      setNotificationsLoaded(true);
    });
  }, [user, db]);

  return (
    <Tabs defaultValue="all" className="w-full lg:w-6/12 px-4 pt-4 mx-auto">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="persons">Persons</TabsTrigger>
        <TabsTrigger value="motors">Motors</TabsTrigger>
        <TabsTrigger value="sightings">Sightings</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        {!notificationsLoaded &&
          notificationList.length === 0 &&
          Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((itm: any) => {
            return (
              <Skeleton
                key={itm}
                className="w-full aspect-square rounded-xl h-[94px] mb-2"
              ></Skeleton>
            );
          })}
        {notificationList.length > 0 && (
          <>
            {notificationList.map((notification) => {
              return (
                <AlertCard key={notification.id} notification={notification} />
              );
            })}
          </>
        )}
      </TabsContent>
      <TabsContent value="persons">
        {personList.length > 0 && (
          <>
            {personList.map((notification) => {
              return (
                <AlertCard key={notification.id} notification={notification} />
              );
            })}
          </>
        )}
      </TabsContent>
      <TabsContent value="motors">
        {motorsList.length > 0 && (
          <>
            {motorsList.map((notification) => {
              return (
                <AlertCard key={notification.id} notification={notification} />
              );
            })}
          </>
        )}
      </TabsContent>
      <TabsContent value="sightings">
        {sightingsList.length > 0 && (
          <>
            {sightingsList.map((notification) => {
              return (
                <AlertCard key={notification.id} notification={notification} />
              );
            })}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}
