import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IBug } from "../../../models/IBug";

type Column = {
  text: string;
  class: string;
  path: keyof IBug;
};

const TableHeaders = ({
  columns,
  handleSort,
  sortKey,
  sortOrder
}: {
  columns: Column[];
  handleSort: (value: keyof IBug) => void;
  sortKey: keyof IBug;
  sortOrder: "asc" | "desc";
}) => {
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((path) => (
          <td
            className={`${columns[path].class}`}
            role="button"
            key={columns[path].text}
            onClick={() => handleSort(columns[path].path)}
          >
            <span className="mr-0.5">{columns[path].text}</span>
            <span
              className={`${
                sortKey === columns[path].path ? "visible" : "invisible"
              }  text-primary-500`}
            >
              {sortOrder === "asc" ? (
                <FontAwesomeIcon icon={faChevronDown} />
              ) : (
                <FontAwesomeIcon icon={faChevronUp} />
              )}
            </span>
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
