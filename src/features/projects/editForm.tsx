import React, { useContext, useState } from "react";
import { Context } from "../..";
import Button from "../../components/controls/button";
import Textarea from "../../components/inputs/textarea";
import { IBug } from "../../models/IBug";
import { IProject } from "../../models/IProject";

type EditFormProps = {
  setEditing: (boolean) => void;
  name: keyof IProject | keyof IBug;
  entityName: "project" | "bug";
};
const EditForm = ({ setEditing, name, entityName }: EditFormProps) => {
  const { store } = useContext(Context);

  const [value, setValue] = useState(
    entityName === "project" ? store.project[name] : store.bug[name]
  );

  const onChange = ({ value }: { value: string }) => {
    setValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (entityName === "project") {
      store.updateProject({
        projectId: store.project.id,
        key: name,
        newValue: value.toString()
      });
    }
    if (entityName === "bug") {
      store.updateBug({ key: name, newValue: value.toString() });
    }
    setEditing(false);
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
        setValue("");
      }}
    >
      <Textarea
        rows={3}
        name="projectField"
        handleChange={onChange}
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
