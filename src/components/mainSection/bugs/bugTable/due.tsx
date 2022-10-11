import dayjs from "dayjs";
import React from "react";
import { IBug } from "../../../../models/IBug";

const Due = (bug: IBug) => {
  return (
    <>
      <p>{dayjs(bug.due).format("DD/MM HH:mm")}</p>
      <p>{dayjs(bug.due).fromNow()}</p>
    </>
  );
};

export default Due;
