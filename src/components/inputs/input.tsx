import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { IBaseInput } from "./interfaces/IBaseInput";

const Input = ({
  label,
  errorMessage,
  name,
  handleChange,
  hideShow,
  type,
  submitErrors,
  ...rest
}: IBaseInput) => {
  const [focusLoss, setFocusLoss] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className={`text-sm font-medium text-gray-900 dark:text-gray-400`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className="peer mt-1 block w-full rounded-lg border-2 border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm text-gray-900 placeholder:text-slate-500 focus:border-blue-500  focus:ring-blue-500 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type={show ? "text" : type}
          id={name}
          {...rest}
          onBlur={() => {
            setFocusLoss(true);
          }}
          onFocus={() => {
            label === "Confirm password" && setFocusLoss(true);
          }}
          onChange={(e) => {
            handleChange({ name, value: e.target.value });
          }}
        />
        {hideShow && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
            type="button"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        )}
      </div>
      {(focusLoss || submitErrors) && (
        <p className={`mt-1 text-xs text-red-600`}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
