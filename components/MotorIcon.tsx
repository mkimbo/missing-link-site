"use client";
import Image from "next/image";
import React from "react";
import Motor from "../public/img/motor_icon.png";
import MotorWhite from "../public/img/motor_icon_white.png";
import { useTheme } from "next-themes";

export default function MotorIcon() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === "dark" ? MotorWhite : Motor}
      alt={"motor icon"}
      width={500}
      height={500}
      className={
        "h-24 w-24 lg:h-32 lg:w-32 object-cover transition-all hover:scale-105 aspect-square lg:ml-40"
      }
    />
  );
}
