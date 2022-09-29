import React from "react";

interface SignHeaderProps {
  onSignOption: () => void;
}
const SignHeader = ({ onSignOption }: SignHeaderProps) => {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-5">Sign in</h3>
      <p className="mb-5">
        New user?{" "}
        <button
          type="button"
          className="text-blue-600 dark:text-blue-500 underline"
          onClick={onSignOption}
        >
          Create an account
        </button>
      </p>
    </>
  );
};

export default SignHeader;
