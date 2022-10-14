import React from "react";
import { IProject } from "../../../../models/IProject";
import Step from "./step";

const StagesLine = ({ project }: { project: IProject }) => {
  return (
    <div className="relative flex h-full min-h-fit w-1 flex-col items-center justify-between rounded-xl bg-indigo-600">
      <Step first />
      <Step />
      <Step last />
    </div>
  );
};

export default StagesLine;
