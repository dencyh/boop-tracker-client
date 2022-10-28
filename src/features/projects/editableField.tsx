import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import { IProject } from "../../models/IProject";
import EditForm from "./editForm";

const EditableField = ({
  text,
  valueName,
  entityName
}: {
  text?: string;
  valueName: keyof IProject;
  entityName: "project" | "bug";
}) => {
  const { store } = useContext(Context);

  const editingEntity =
    entityName === "project"
      ? store.project.createdBy.id === store.user.id
      : store.bug.createdBy.id === store.user.id;

  const [editing, setEditing] = useState(false);
  return (
    <>
      {text}
      {editingEntity && (
        <>
          <button
            className="ml-2 text-gray-600"
            onClick={() => setEditing(true)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          {editing && (
            <EditForm
              setEditing={setEditing}
              valueName={valueName}
              entityName={entityName}
            />
          )}
        </>
      )}
    </>
  );
};

export default EditableField;
