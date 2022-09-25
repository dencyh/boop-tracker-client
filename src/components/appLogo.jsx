import shibaLogo from "../assets/my-shiba-512.png";
import { Link } from "react-router-dom";
import React from "react";

const AppLogo = () => {
  return (
    <div className="container mx-auto">
      <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/auth" className="flex items-center">
            <img src={shibaLogo} className="h-10 mr-4" alt="Shiba Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Boop Tracker
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AppLogo;
