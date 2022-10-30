import Button from "../../../components/controls/button";
import React, { useState } from "react";
import Textarea from "../../../components/inputs/textarea";

type CommentFormProps = {
  handleComment: (e, value, parentId) => void;
  parentId?: number | null;
  initialValue?: string;
};
const CommentForm = ({
  handleComment,
  parentId = null,
  initialValue = ""
}: CommentFormProps) => {
  const [value, setValue] = useState(initialValue);

  const onChange = ({ value }: { value: string }) => {
    setValue(value);
  };

  return (
    <form
      onSubmit={(e) => {
        handleComment(e, value, parentId);
        setValue("");
      }}
    >
      <Textarea rows={3} handleChange={onChange} value={value} required />
      <Button name="Send" type="submit" />
    </form>
  );
};

export default CommentForm;
