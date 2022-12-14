import React from "react";
import { IBaseControl } from "../../../components/controls/interfaces/baseControl";

const StepButton = ({ name, ...rest }: IBaseControl) => {
  return (
    <button
      className="h-6 w-6 rounded-sm border border-indigo-500 bg-white text-center hover:visible hover:bg-indigo-600 hover:text-white"
      {...rest}
    >
      {name}
    </button>
  );
};

export default StepButton;
