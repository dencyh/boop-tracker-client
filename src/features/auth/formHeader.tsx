import React from "react";

export function FormHeader() {
  return (
    <>
      <h3 className="mb-5 text-3xl font-semibold">Sign up</h3>
      <p className="mb-5">
        Have an account?{" "}
        <a href="/" className="text-blue-600 underline dark:text-blue-500">
          Sign in
        </a>
      </p>
    </>
  );
}
