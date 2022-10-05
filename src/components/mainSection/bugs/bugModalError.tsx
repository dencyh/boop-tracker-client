import React from "react";
// eslint-disable-next-line import/namespace
import { BugModalErrors } from "./bugModal";

const BugModalError = ({ passed, message }: BugModalErrors) => {
  //   console.log(passed, message);
  return (
    <>
      {passed ? (
        ""
      ) : (
        <p className="py-1 px-3 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 w-fit">
          {message}
        </p>
      )}
    </>
  );
};

export default BugModalError;
