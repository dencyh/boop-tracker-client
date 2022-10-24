import React, { useState } from "react";
import { IBaseControl } from "../controls/interfaces/baseControl";
import { IBaseInput } from "./interfaces/IBaseInput";

const Toggle = ({ label, ...rest }: IBaseInput) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" value="" className="peer sr-only" {...rest} />
      <div className="dark:peer-purple:ring-blue-800 peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
};

export default Toggle;
