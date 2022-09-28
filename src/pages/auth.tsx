import React, { useState } from "react";
import SignIn from "./views/auth/signIn";
import SignUp from "./views/auth/signUp";
import { Header } from "../components/header";

export function Auth() {
  const [haveAccount, setHaveAccount] = useState(false);

  return (
    <>
      <Header />
      <div className="container mx-auto">
        {haveAccount ? <SignIn /> : <SignIn />}
      </div>
    </>
  );
}
