"use client";
import { useZact } from "zact/client";
type Props = {
  itemId: string;
  found?: boolean;
  type: "person" | "vehicle" | "bike";
};
import { useEffect } from "react";
import { markMotorFound, markPersonFound } from "@/app/actions/actions";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

export default function MarkAsFoundButton({ itemId, found, type }: Props) {
  const {
    mutate: sendit,
    data: res,
    isLoading: isRunning,
  } = useZact(markPersonFound);
  const { mutate, data, isLoading } = useZact(markMotorFound);
  useEffect(() => {
    if (data?.success || res?.success) {
      toast({
        title: "Updated Successfully",
      });
    }
  }, [data, res]);
  return (
    <Button
      className="w-full mt-2"
      disabled={isLoading || isRunning || found}
      onClick={() => {
        if (type === "person") {
          sendit({ itemId, type });
        } else {
          mutate({ itemId, type });
        }
      }}
    >
      {" "}
      {isLoading ||
        (isRunning && <Loader className="mr-2 h-4 w-4 animate-spin" />)}
      {found ? "Found" : "Mark as Found"}
    </Button>
  );
}
