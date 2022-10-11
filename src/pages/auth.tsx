import React, { useState } from "react";
import SignIn from "../components/auth/signIn";
import SignUp from "../components/auth/signUp";
import { Header } from "../components/auth/header";
import WelcomeText from "../components/auth/welcomeText";

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
