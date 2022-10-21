import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../..";
import { IProject } from "../../models/IProject";
import EditForm from "./editForm";

const EditableField = ({
  text,
  valueName
}: {
  text?: string;
  valueName: keyof IProject;
}) => {
  const { store } = useContext(Context);

  useEffect(() => console.log("text changed"), [text]);

  const [editing, setEditing] = useState(false);
  return (
    <>
      {text}
      {store.project.createdBy.id === store.user.id && (
        <>
          <button
            className="ml-2 text-gray-600"
            onClick={() => setEditing(true)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          {editing && (
            <EditForm setEditing={setEditing} valueName={valueName} />
          )}
        </>
      )}
    </>
  );
};

export default EditableField;
