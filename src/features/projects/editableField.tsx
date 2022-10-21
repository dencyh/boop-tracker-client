import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EditableField = ({ text }: { text: string }) => {
  return (
    <>
      <button className="mr-2 text-gray-600">
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      {text}
    </>
  );
};

export default EditableField;
