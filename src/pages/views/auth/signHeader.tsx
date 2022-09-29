import React, { useState } from "react";

interface SignHeaderProps {
  onSignOption: () => void;
  header: string;
  text: string;
  button: string;
}
const SignHeader = ({
  onSignOption,
  header,
  text,
  button
}: SignHeaderProps) => {
  //
  return (
    <>
      <h3 className="text-3xl font-semibold mb-5">{header}</h3>
      <p className="mb-5">
        {text}{" "}
        <button
          type="button"
          className="text-blue-600 dark:text-blue-500 underline"
          onClick={onSignOption}
        >
          {button}
        </button>
      </p>
    </>
  );
};

export default SignHeader;
