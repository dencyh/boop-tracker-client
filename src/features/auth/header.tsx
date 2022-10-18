import { Link } from "react-router-dom";
import React from "react";
import AppLogo from "../../components/misc/appLogo";

export function Header() {
  return (
    <div className="container mx-auto">
      <nav className="rounded border-gray-200 bg-white px-2 py-2.5 dark:bg-gray-900 sm:px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <AppLogo />
        </div>
      </nav>
    </div>
  );
}
