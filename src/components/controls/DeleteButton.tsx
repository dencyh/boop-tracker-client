import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { IBaseControl } from "./interfaces/baseControl";

const DeleteButton = ({ ...rest }: IBaseControl) => {
  return (
    <button
      {...rest}
      className="inline-flex w-fit items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeleteButton;
