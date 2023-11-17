import { TSaveNotification } from "@/types/missing_person.model";
import React from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/context";
type Props = {
  notification: TSaveNotification;
};

function AlertCard({ notification }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const userObj = notification.notifiedUsers.find(
    (item) => item.userId === user?.uid
  );

  const getLink = (type: string) => {
    switch (type) {
      case "person":
        return `/missing/persons/${notification.resourceId}`;
      case "vehicle":
        return `/missing/vehicles/${notification.resourceId}`;
      case "bike":
        return `/missing/bikes/${notification.resourceId}`;
      case "bloodAppeal":
        return `/blood-appeal/${notification.resourceId}`;
      default:
        return `#`;
    }
  };
  return (
    <Card
      className="flex  p-5 cursor-pointer mb-2 transition-all hover:bg-accent hover:text-accent-foreground"
      onClick={() => router.push(getLink(notification.resourceType))}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">
          {notification.content}
        </p>
        <p className="text-sm text-muted-foreground">
          {format(new Date(notification.createdAt), "do MMM yyyy")}
        </p>
      </div>
      <div className="ml-auto text-xs text-primary">{`${userObj?.distance.toFixed(
        2
      )} km`}</div>
    </Card>
  );
}

export default AlertCard;
