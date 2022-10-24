import React from "react";
import { statusPriorityColors } from "../../../data/statusBgColors";
import { IBug } from "../../../models/IBug";

type StatusBadgeProps = {
  path: string;
  bug: IBug;
};
const StatusBadge = ({ bug, path }: StatusBadgeProps) => {
  return (
    <span
      className={`truncate rounded-xl ${
        statusPriorityColors[bug[path]]
      } px-2.5 py-1 font-medium text-white dark:bg-gray-700 dark:text-gray-300 `}
    >
      {bug[path]}
    </span>
  );
};

export default StatusBadge;
