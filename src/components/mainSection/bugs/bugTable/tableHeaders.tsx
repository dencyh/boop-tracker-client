import React from "react";

const TableHeaders = ({ columns }) => {
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((path) => (
          <td className={columns[path].class} key={columns[path].path}>
            {columns[path].text}
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
