import Button from "../../../controls/button";
import React, { useState } from "react";
import Textarea from "../../../inputs/textarea";

type CommentFormProps = {
  handleComment: (e, value, parentId) => void;
  parentId?: string | null;
  initialValue?: string;
};
const CommentForm = ({
  handleComment,
  parentId = null,
  initialValue = ""
}: CommentFormProps) => {
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

export default CommentForm;
