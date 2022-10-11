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
    <div className="fixed bottom-0 left-0 w-full bg-red-500 p-2 text-center text-lg font-medium text-white">
      <p className="mb-1">{serverErrors[status].top}</p>
      <p>{serverErrors[status].bottom}</p>
    </div>
  );
};

export default AuthError;
