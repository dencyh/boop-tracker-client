import shibaLogo from "../../assets/my-shiba-512.png";
import { Link } from "react-router-dom";
import React from "react";

const AppLogo = () => {
  return (
    <div className="container w-fit">
      <nav className="rounded border-gray-200 px-2 py-2.5 dark:bg-gray-800 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={shibaLogo} className="mr-4 h-10" alt="Shiba Logo" />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-primary-400 dark:text-white">
              Boop Tracker
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AppLogo;
