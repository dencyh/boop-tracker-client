import React from "react";
import { BugModalErrors } from "./bugModal";

const BugModalError = ({ passed, message }: BugModalErrors) => {
  return (
    <>
      {passed ? (
        ""
      ) : (
        <p className="mt-2 w-fit rounded-lg bg-red-100 py-1 px-3 text-sm text-red-700 dark:bg-red-200 dark:text-red-800">
          {message}
        </p>
      )}
    </>
  );
};

export default BugModalError;
