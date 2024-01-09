"use client";
import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { getApp, getApps, initializeApp } from "firebase/app";
import { clientConfig } from "@/config/client-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TSaveNotification } from "@/types/missing_person.model";
import AlertCard from "./AlertCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/auth/context";
import { markNotificationsAsSeen } from "../actions/actions";

export default function AlertsList() {
  const { user } = useAuth();
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationList, setNotificationList] = useState<TSaveNotification[]>(
    []
  );
  const [personList, setPersonList] = useState<TSaveNotification[]>([]);
  const [motorsList, setMotorsList] = useState<TSaveNotification[]>([]);
  const [bloodAppeals, setBloodAppeals] = useState<TSaveNotification[]>([]);

  const [sightingsList, setSightingsList] = useState<TSaveNotification[]>([]);

  const db = getDatabase(
    !getApps().length ? initializeApp(clientConfig) : getApp()
  );

  useEffect(() => {
    if (!user?.email) return;
    const notificationsRef = ref(db, "notifications");
    onValue(notificationsRef, (snapshot) => {
      setNotificationsLoading(true);
      let notificationsArray: TSaveNotification[] = [];
      snapshot?.forEach(function (childSnapshot) {
        const notification: TSaveNotification = childSnapshot.val();
        notification?.notifiedUsers?.forEach((notified) => {
          console.log(notified.userId, "notification", user?.uid);
          if (notified.userId === user?.uid) {
            notificationsArray = [...notificationsArray, notification];
          }
        });
      });
      const persons = notificationsArray?.filter(
        (notification) => notification.resourceType === "person"
      );
      const bloodAppeals = notificationsArray?.filter(
        (notification) => notification.resourceType === "bloodAppeal"
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
      setBloodAppeals(bloodAppeals);
      setMotorsList(motors);
      setSightingsList(sightings);
      setNotificationList(notificationsArray);
      markNotificationsAsSeen({
        tenantID: user?.uid!,
        list: notificationsArray,
      });
      setNotificationsLoading(false);
    });
  }, [user, db]);

  return (
    <Tabs defaultValue="persons" className="w-full lg:w-6/12 px-4 pt-2 mx-auto">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="persons">Persons</TabsTrigger>
        <TabsTrigger value="motors">Motors</TabsTrigger>
        <TabsTrigger value="sightings">Sightings</TabsTrigger>
        <TabsTrigger value="bloodAppeals">Medical</TabsTrigger>
      </TabsList>
      <TabsContent value="persons">
        {notificationList.length === 0 &&
          notificationsLoading &&
          Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).map((itm: any) => {
            return (
              <Skeleton
                key={itm}
                className="w-full aspect-square rounded-xl h-[94px] mb-2"
              ></Skeleton>
            );
          })}
        {personList.length > 0 && (
          <>
            {personList.map((notification) => {
              return (
                <AlertCard key={notification.id} notification={notification} />
              );
            })}
          </>
        )}
        {!notificationsLoading && personList.length == 0 && (
          <div className="text-center">
            <div>Nothing Yet.</div>
            <div className="text-sm text-muted-foreground">
              Missing person alerts will appear here.
            </div>
          </div>
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
        {!notificationsLoading && motorsList.length == 0 && (
          <div className="text-center">
            <div>Nothing Yet.</div>
            <div className="text-sm text-muted-foreground">
              Missing vehicle/bike alerts will appear here.
            </div>
          </div>
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
        {!notificationsLoading && sightingsList.length == 0 && (
          <div className="text-center">
            <div>Nothing Yet.</div>
            <div className="text-sm text-muted-foreground">
              Sightings will appear here.
            </div>
          </div>
        )}
      </TabsContent>
      <TabsContent value="bloodAppeals">
        {bloodAppeals.length > 0 && (
          <>
            {bloodAppeals.map((notification) => {
              return (
                <AlertCard key={notification.id} notification={notification} />
              );
            })}
          </>
        )}
        {!notificationsLoading && bloodAppeals.length == 0 && (
          <div className="text-center">
            <div>Nothing Yet.</div>
            <div className="text-sm text-muted-foreground">
              Blood donation appeals will appear here.
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
