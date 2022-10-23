import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SelectedItem = ({
  name,
  removeFilter
}: {
  name: string;
  removeFilter: (name: string) => void;
}) => {
  return (
    <div className="border-l border-gray-500 px-2">
      <span>{name}</span>
      <button
        className="ml-2 duration-100 hover:scale-125"
        onClick={() => removeFilter(name)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default SelectedItem;
