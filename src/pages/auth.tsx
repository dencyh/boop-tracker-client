import React, { useState } from "react";
import SignIn from "../features/auth/signIn";
import SignUp from "../features/auth/signUp";
import { Header } from "../features/auth/header";
import WelcomeText from "../features/auth/welcomeText";

export function Auth() {
  const [haveAccount, setHaveAccount] = useState(false);

  const handleSignOptions = () => {
    setHaveAccount(!haveAccount);
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="container mx-auto flex max-w-5xl items-center justify-between">
        <div className="container mx-auto max-w-lg flex-1 p-10">
          {haveAccount ? (
            <SignUp onSignOption={handleSignOptions} />
          ) : (
            <SignIn onSignOption={handleSignOptions} />
          )}
        </div>
        <WelcomeText />
      </div>
    </div>
  );
}
