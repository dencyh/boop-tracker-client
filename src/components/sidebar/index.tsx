import React, { useState } from "react";
import SidebarHeaderTabs from "./sidebarHeaderTabs";
import AppLogo from "../appLogo";

import SidebarContents from "./sidebarContents";
import { sidebarItems } from "../../data/sidebarItems";
import BurgerButton from "../controls/burgerButton";
import SidebarFooter from "./sidebarFooter";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleMenu = () => {
    setOpen((state) => !state);
  };
  return (
    <div
      className={`${
        open ? "lg:w-270px w-310px xl:w-80" : "w-20"
      } relative   shrink-0 border-r border-gray-200 bg-[#41312c]  drop-shadow-md duration-200 dark:bg-gray-800`}
      tabIndex={-1}
    >
      <div className="absolute top-7 right-6 z-30">
        <BurgerButton onClick={handleMenu} />
      </div>
      <div className="flex h-screen flex-col">
        <div
          className={`
           
           flex items-center justify-between bg-[#342219] p-4 text-gray-100`}
        >
          <div className={`${!open && "opacity-0"} origin-left duration-200`}>
            <AppLogo />
          </div>
        </div>
        <div className="px-4">
          <SidebarHeaderTabs open={open} />
        </div>
        <div className="flex h-full flex-col justify-between overflow-y-auto">
          <SidebarContents sidebarItems={sidebarItems} open={open} />
          <SidebarFooter open={open} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
