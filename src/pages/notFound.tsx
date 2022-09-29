import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/controls/button";

const NotFound = () => {
  return (
    <div className="container bg-white z-10 flex flex-col justify-center items-center border-l">
      <div>
        <h2 className="text-5xl mb-2">404</h2>
        <h3 className="text-3xl mb-1">Ooops!</h3>
        <h3 className="text-3xl mb-2">Page Not Found</h3>
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
