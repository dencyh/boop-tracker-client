import React, { useState } from "react";
// eslint-disable-next-line import/namespace
import SignIn from "./views/auth/signIn";
import SignUp from "./views/auth/signUp";
import { Header } from "../components/header";
import WelcomeText from "./views/auth/welcomeText";

export function Auth() {
  const [haveAccount, setHaveAccount] = useState(false);

  const handleSignOptions = () => {
    setHaveAccount(!haveAccount);
  };

  return (
    <>
      <Header />
      <div className="flex justify-between items-center container mx-auto max-w-5xl">
        <div className="flex-1 p-10 max-w-lg container mx-auto">
          {haveAccount ? (
            <SignUp onSignOption={handleSignOptions} />
          ) : (
            <SignIn onSignOption={handleSignOptions} />
          )}
        </div>
        <WelcomeText />
      </div>
    </>
  );
}
