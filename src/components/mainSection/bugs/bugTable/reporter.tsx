import React from "react";
import { IBug } from "../../../../models/IBug";

const Reporter = (bug: IBug) => {
  return (
    <p>
      {bug.createdBy.firstName} {bug.createdBy.lastName}
    </p>
  );
};

export default Reporter;
