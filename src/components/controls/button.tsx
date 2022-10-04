import React from "react";
import { BaseControl } from "./interfaces/baseControl";

const Button = ({ name, ...rest }: BaseControl) => {
  return (
    <button
      className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      {...rest}
    >
      {name}
    </button>
  );
};

export default Button;
