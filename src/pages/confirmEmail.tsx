import React, { useContext } from "react";
import { Header } from "../features/auth/header";
import featureImg from "../assets/feature-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import SignHeader from "../features/auth/signHeader";
import { Context } from "..";

const signInHeader = {
  header: "",
  text: "Already have account?",
  button: "Sign in"
};

const ConfirmEmail = () => {
  const { store } = useContext(Context);
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="container relative mx-auto flex max-w-5xl items-center justify-between">
        <img
          src={featureImg}
          alt="feature image"
          className="-z10 absolute top-1/2 -right-1/2 rounded-2xl"
        />
        <div className="container absolute top-48 max-w-lg flex-1 justify-self-center p-10 font-semibold text-gray-700">
          <h1>Welcome to Boop Tracker</h1>
          <h2 className="my-4 text-3xl">
            Verification link sent!
            <FontAwesomeIcon icon={faEnvelope} className="mx-3" />
          </h2>
          <p className="text-lg font-normal">
            Check you email for a link to sign in
          </p>
          <div className="mt-12">
            <SignHeader
              onSignOption={() => store.signOut()}
              {...signInHeader}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
