import React from "react";

interface HideButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handleHide: () => void;
  isHidden: boolean;
}
const HideButton = ({ handleHide, isHidden, ...rest }: HideButtonProps) => {
  return (
    <button
      type="button"
      className={
        "group absolute top-1/2 right-0 inline-flex h-16 w-5 items-center bg-gray-300 p-0.5 text-center text-sm font-medium text-white transition-all hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" +
        (isHidden ? " translate-x-full rounded-r-lg" : " rounded-l-lg")
      }
      {...rest}
      onClick={handleHide}
    >
      <svg
        aria-hidden="true"
        className={
          "h-full w-full transition-all" +
          (isHidden ? " rotate-0" : " rotate-180")
        }
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
      {/* <svg
        aria-hidden="true"
        className="w-3 h-8 -translate-x-2 absolute"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg> */}
      <span className="sr-only">Icon description</span>
    </button>
  );
};

export default HideButton;
