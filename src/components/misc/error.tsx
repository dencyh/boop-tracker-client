import React from "react";

const Error = ({ errorMessage }: { errorMessage: string }) => {
  return <p className="mt-1 text-xs text-red-600">{errorMessage}</p>;
};

export default Error;
