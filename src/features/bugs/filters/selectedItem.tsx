import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SelectedItem = () => {
  return (
    <div className="border-l border-gray-500 px-2">
      <span>SelectedItem</span>
      <button className="ml-1 duration-100 hover:scale-110">
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default SelectedItem;
