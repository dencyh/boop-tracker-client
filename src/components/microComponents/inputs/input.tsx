import React from "react";
import { IBaseInput } from "./IBaseInput";

const Input = ({ label, placeholder = "" }: IBaseInput) => {
  return (
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
      {label}
      <input
        type="text"
        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mt-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
