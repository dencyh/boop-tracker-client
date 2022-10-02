import React, { useState } from "react";
import SignIn from "./views/auth/signIn";
import SignUp from "./views/auth/signUp";
import { Header } from "./views/auth/header";
import WelcomeText from "./views/auth/welcomeText";

export function Auth() {
  const [haveAccount, setHaveAccount] = useState(false);

  const handleSignOptions = () => {
    setHaveAccount(!haveAccount);
  };

  return (
    <div className="flex flex-col h-screen">
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
    </div>
  );
}
