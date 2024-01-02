"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
type Props = {};

export function SettingsErrorDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="mr-4"
          aria-label="Notifications Warning"
        >
          <AlertTriangle className="h-6 w-6 animate-ping text-destructive" />{" "}
          <span className="sr-only">Notifications Warning</span>
        </Button>
      </DialogTrigger>{" "}
      <DialogContent className="sm:max-w-[425px] pointer-events-auto">
        <form className="w-full space-y-6">
          <DialogHeader>
            <DialogTitle className="text-center">Action Required</DialogTitle>
            <DialogDescription className="text-center">
              Please allow notifications and update your location settings as
              they are essential for receiving timely and relevant alerts. By
              enabling notifications, you&#39;ll never miss important updates
              related to your preferences. Additionally, updating your location
              settings ensures that you receive alerts that are from your area.
              Take full advantage of this platform&#39;s features by granting
              these permissions and stay informed on important updates in your
              community.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="default"
              className="w-full "
              onClick={() => {
                setOpen(false);
                router.push("/profile#settings");
              }}
            >
              Update Settings
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
