import { Link } from "react-router-dom";
import React from "react";
import AppLogo from "./appLogo";

export function Header() {
  return (
    <div className="container mx-auto">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <AppLogo />
        </div>
      </nav>
    </div>
  );
}
