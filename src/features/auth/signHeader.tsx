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
      <h3 className="mb-5 text-3xl font-semibold">{header}</h3>
      <p className="mb-5">
        {text}{" "}
        <button
          type="button"
          className="text-blue-600 underline dark:text-blue-500"
          onClick={onSignOption}
        >
          {button}
        </button>
      </p>
    </>
  );
};

export default SignHeader;
