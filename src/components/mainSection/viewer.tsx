import React from "react";
import { IBaseInput } from "../inputs/interfaces/IBaseInput";

interface ViewerProps extends Omit<IBaseInput, "label"> {
  id: string;
  firstName: string;
  lastName: string;
  //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Viewer = ({
  id,
  firstName,
  lastName,
  onChange,
  ...rest
}: ViewerProps) => {
  return (
    <li>
      <div className="">
        <label className="flex items-center p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <input
            onChange={onChange}
            type="checkbox"
            value={id}
            {...rest}
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          />
          <div className="ml-2">
            {firstName} {lastName}
          </div>
        </label>
      </div>
    </li>
  );
};

export default Viewer;
