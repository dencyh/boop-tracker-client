import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import Button from "../../components/controls/button";
import Textarea from "../../components/inputs/textarea";
import { IBug } from "../../models/IBug";
import { IProject } from "../../models/IProject";

type EditFormProps = {
  setEditing: (boolean) => void;
  valueName: keyof IProject | keyof IBug;
  entityName: "project" | "bug";
};
const EditForm = ({ setEditing, valueName, entityName }: EditFormProps) => {
  const { store } = useContext(Context);

  const [value, setValue] = useState(
    entityName === "project" ? store.project[valueName] : store.bug[valueName]
  );

  const onChange = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (entityName === "project") {
      store.updateProject({
        projectId: store.project.id,
        option: valueName,
        newValue: value.toString()
      });
    }
    if (entityName === "bug") {
      store.updateBug({ field: valueName, newValue: value.toString() });
    }
    setEditing(false);
  };

  return (
    <form
      onSubmit={(e) => {
        // handleComment(e, value, parentId);
        handleSubmit(e);
        setValue("");
      }}
    >
      <Textarea
        rows={3}
        onChange={onChange}
        value={value.toString()}
        required
      />
      <Button name="OK" type="submit" />
      <Button
        name="Cancel"
        color="bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-white"
        onClick={() => setEditing(false)}
      />
    </form>
  );
};

export default EditForm;
