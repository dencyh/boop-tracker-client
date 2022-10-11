import React from "react";

const TableHeaders = ({ columns }) => {
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((key) => (
          <td className={columns[key].class} key={columns[key].key}>
            {columns[key].text}
          </td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
