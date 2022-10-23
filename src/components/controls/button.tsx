import React from "react";
import { IBaseControl } from "./interfaces/baseControl";

const Button = ({ name, color, ...rest }: IBaseControl) => {
  return (
    <button
      className={`mr-2 mb-2 w-fit rounded-lg  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
        color ? color : "bg-primary-400"
      }`}
      {...rest}
    >
      {name}
    </button>
  );
};

export default Button;
