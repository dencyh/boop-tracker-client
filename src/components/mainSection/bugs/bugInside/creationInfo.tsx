import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React from "react";

type CreationInfoProps = {
  firstName: string;
  lastName: string;
  projectTitle: string;
  createdAt: Date;
  updatedAt: Date;
};
const CreationInfo = ({
  firstName,
  lastName,
  projectTitle,
  createdAt,
  updatedAt
}: CreationInfoProps) => {
  return (
    <div className="flex flex-col gap-1 text-sm text-gray-500">
      <p>
        {firstName} {lastName} created at{" "}
        {dayjs(createdAt).format("HH:mm DD-MM-YYYY")}, last time updated{" "}
        {dayjs(updatedAt).fromNow()}
      </p>
      <p>
        <FontAwesomeIcon icon={faLink} />
        <span className="ml-2">Project - {projectTitle}</span>
      </p>
    </div>
  );
};

export default CreationInfo;
