import React, { useState } from "react";
import { IBaseInput } from "./IBaseInput";

const Input = ({ label, errorMessage, serverError, ...rest }: IBaseInput) => {
  const [focusLoss, setFocusLoss] = useState(false);
  return (
    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400">
      {label}
      <input
        className="peer bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full mt-1 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        {...rest}
        onBlur={() => {
          setFocusLoss(true);
        }}
        onFocus={() => {
          label === "Confirm password" && setFocusLoss(true);
        }}
      />
      <p
        className={`${
          focusLoss ? "invisible peer-invalid:visible" : "invisible"
        } mt-1 text-xs text-red-600`}
      >
        {errorMessage}
      </p>
      {serverError ? (
        <p className="-mt-4 text-xs text-red-600">{serverError}</p>
      ) : (
        ""
      )}
    </label>
  );
};

export default Input;
