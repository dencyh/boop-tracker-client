import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/controls/button";

const NotFound = () => {
  return (
    <div className="container z-10 flex flex-col items-center justify-center border-l bg-white">
      <div>
        <h2 className="mb-2 text-5xl">404</h2>
        <h3 className="mb-1 text-3xl">Ooops!</h3>
        <h3 className="mb-2 text-3xl">Page Not Found</h3>
        <p>This page doesn&apos;t exist or was removed</p>
        <p className="mb-4">We suggest you go back to home</p>
        <Link to="/">
          <Button name="Back to Home" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
