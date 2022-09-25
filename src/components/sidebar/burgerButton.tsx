import React from "react";

const BurgerButton = () => {
  return (
    <button type="button" data-drawer-dismiss="drawer-navigation" aria-controls="drawer-navigation"
            className="h-1/2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5  inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" fill="currentColor">
        <path
          d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
      </svg>
      <span className="sr-only">Close menu</span>
    </button>
  );
};

export default BurgerButton;
