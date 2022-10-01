import React from "react";

const serverErrors = {
  0: {
    top: "Server is not available. Try again later.",
    bottom: ""
  },
  400: {
    top: "We couldn’t find an account matching the email and password you entered.",
    bottom: "Please check your email and password and try again."
  },
  500: {
    top: "Something went wrong. Try again later.",
    bottom: ""
  }
};

type AuthErrorProps = {
  status: keyof typeof serverErrors;
};

const AuthError = ({ status }: AuthErrorProps) => {
  console.log("prop", status);
  return (
    <div className="fixed w-full bottom-0 left-0 bg-red-500 text-center text-white font-medium text-lg p-2">
      <p className="mb-1">{serverErrors[status].top}</p>
      <p>{serverErrors[status].bottom}</p>
    </div>
  );
};

export default AuthError;
