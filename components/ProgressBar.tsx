import React from "react";
import { Progress } from "./ui/progress";

type Props = {
  progress: number;
};

function ProgressBar({ progress }: Props) {
  return <Progress value={progress} className="w-full" />;
}

export default ProgressBar;
