import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../..";
import Button from "../../components/controls/button";
import Textarea from "../../components/inputs/textarea";
import { IProject } from "../../models/IProject";

type EditFormProps = {
  setEditing: (boolean) => void;
  valueName: keyof IProject;
};
const EditForm = ({ setEditing, valueName }: EditFormProps) => {
  const { store } = useContext(Context);
  const [value, setValue] = useState(store.project[valueName]);

  const onChange = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    store.updateProject({
      projectId: store.project.id,
      option: valueName,
      newValue: value.toString()
    });
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
        color="bg-sky-400 hover:bg-sky-500"
        onClick={() => setEditing(false)}
      />
    </form>
  );
};

export default EditForm;
