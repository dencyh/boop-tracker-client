import React, { ReactNode } from "react";
import _ from "lodash";
import { IBug } from "../../../../models/IBug";

type Column = {
  text: string;
  class: string;
  path: string;
  component?: React.FC;
};

type TableBodyProps = {
  data: IBug[];
  columns: Column[];
};
const TableBody = ({ data, columns }: TableBodyProps) => {
  const renderContent = (item, path) => {
    if (columns[path].component) {
      const component = columns[path].component;
      if (typeof component === "function") {
        return component(item);
      }
      return component;
    }
    return _.get(item, columns[path].path);
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {Object.keys(columns).map((path) => (
            <td className={columns[path].class} key={path}>
              {renderContent(item, path)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
