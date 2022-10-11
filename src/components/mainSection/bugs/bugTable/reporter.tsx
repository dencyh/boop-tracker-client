import React from "react";
import { IBug } from "../../../../models/IBug";

const Reporter = (bug: IBug) => {
  return (
    <p>
      {bug.created_by.first_name} {bug.created_by.last_name}
    </p>
  );
};

export default Reporter;
