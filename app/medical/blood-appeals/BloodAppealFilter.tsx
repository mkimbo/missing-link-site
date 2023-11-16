"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TPerson } from "@/types/missing_person.model";
import { TMotor } from "@/types/misssing_motor.model";

import React from "react";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";
import { useAuth } from "@/auth/context";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ListFilter, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { set } from "lodash";
type Props = {
  searchParams: { search: string; bloodGroup: string; radius: string };
};

export function BloodAppealFilter({ searchParams }: Props) {
  const { search, bloodGroup, radius } = searchParams;
  const { user } = useAuth();
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [bGroup, setBGorup] = React.useState("");
  const [filterRadius, setFilterRadius] = React.useState(radius ?? "5");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ListFilter className="w-6 h-6 mt-1" />
      </DialogTrigger>
      <DialogContent className="w-[280px] sm:max-w-[350px] pointer-events-auto mx-auto px-2">
        <Label className="">Blood group</Label>
        <RadioGroup
          defaultValue={bloodGroup}
          onValueChange={(value) => {
            setBGorup(value);
          }}
        >
          {bloodGroups.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </RadioGroup>
        {/* <Select
          onValueChange={(value) => {
            setBGorup(value);
          }}
        >
          <SelectTrigger className="w-10/12 lg:w-8/12">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Blood Group</SelectLabel>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}
        <Label className="">Radius</Label>
        <RadioGroup
          defaultValue={radius}
          onValueChange={(value) => {
            setFilterRadius(value);
          }}
        >
          {["5", "10", "20"].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <RadioGroupItem value={item} id={item} />
              <Label htmlFor={item}>{item} km</Label>
            </div>
          ))}
        </RadioGroup>
        <Button
          onClick={() => {
            const params = new URLSearchParams();
            params.append("search", `${search ?? ""}`);
            params.append("bloodGroup", `${bGroup}`);
            params.append("radius", `${filterRadius}`);
            const url = `/medical/blood-appeals?${params.toString()}`;
            router.push(url);
            setOpen(false);
          }}
          variant="default"
          className="w-full mt-4"
        >
          Apply Filter
        </Button>
        <Button
          onClick={() => {
            const params = new URLSearchParams();
            params.append("search", `${search ?? ""}`);
            params.append("bloodGroup", "");
            params.append("radius", "");
            const url = `/medical/blood-appeals?${params.toString()}`;
            router.push(url);
            setOpen(false);
          }}
          variant="default"
          className="w-full "
        >
          Reset
        </Button>
      </DialogContent>
    </Dialog>
  );
}
