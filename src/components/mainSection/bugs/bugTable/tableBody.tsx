import React, { ReactNode } from "react";
import _ from "lodash";
import { IBug } from "../../../../models/IBug";

type Column = {
  text: string;
  class: string;
  key: string;
  component?: React.FC;
};

type TableBodyProps = {
  data: IBug[];
  columns: Column[];
};
const TableBody = ({ data, columns }: TableBodyProps) => {
  console.log("data", data);
  console.log("columns", columns);
  const renderContent = (item, key) => {
    if (columns[key].component) {
      const component = columns[key].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[key].key);
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {Object.keys(columns).map((key) => (
            <td className={columns[key].class} key={key}>
              {renderContent(item, key)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
