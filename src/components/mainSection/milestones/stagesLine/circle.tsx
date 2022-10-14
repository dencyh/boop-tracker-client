import React, { MutableRefObject, RefObject } from "react";
import { BaseControl } from "../../../controls/interfaces/baseControl";

interface CircleProps extends BaseControl {
  selected: boolean;
}
const Circle = ({ name, selected, ...rest }: CircleProps) => {
  return (
    <button
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-indigo-600 ${
        selected ? "bg-indigo-600 text-white" : "bg-white"
      }`}
      {...rest}
    >
      {name}
    </button>
  );
};

export default Circle;
