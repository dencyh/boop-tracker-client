import dayjs from "dayjs";
import React from "react";
import { IBug } from "../../../../models/IBug";

const CreatedAt = (bug: IBug) => {
  return <p>{dayjs(bug.createdAt).format("DD/MM/YYYY")}</p>;
};

export default CreatedAt;
