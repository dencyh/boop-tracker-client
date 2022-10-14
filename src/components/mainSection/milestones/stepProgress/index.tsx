import React, { useState } from "react";
import Step from "./step";
import StepButton from "./stepButton";
import StepInput from "./stepInput";

const Line = () => {
  return (
    <div className="relative flex w-1 flex-col items-center justify-between rounded-xl bg-indigo-600">
      <Step first />
      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
      <Step last />
    </div>
  );
};

export default Line;
