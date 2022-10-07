import React from "react";
import { BaseControl } from "./interfaces/baseControl";

const Button = ({ name, ...rest }: BaseControl) => {
  return (
    <button
      className="mr-2 mb-2 w-fit rounded-lg bg-primary-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      {...rest}
    >
      {name}
    </button>
  );
};

export default Button;
