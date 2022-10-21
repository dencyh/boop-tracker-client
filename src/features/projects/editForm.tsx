import React, { useState } from "react";
import Button from "../../components/controls/button";
import Textarea from "../../components/inputs/textarea";

type EditFormProps = {
  handleComment: (e, value, parentId) => void;
  parentId?: number | null;
  initialValue?: string;
};
const EditForm = ({
  handleComment,
  parentId = null,
  initialValue = ""
}: EditFormProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <form
      onSubmit={(e) => {
        handleComment(e, value, parentId);
        setValue("");
      }}
    >
      <Textarea rows={3} onChange={onChange} value={value} required />
      <Button name="Send" type="submit" />
    </form>
  );
};

export default EditForm;
