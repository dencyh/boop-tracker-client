import React, { useEffect, useState } from "react";
import { Filters } from "./projectsList";

interface ICompletionFilter {
  filter: Filters;
  handleFilters: (filterName: string, checked: boolean) => void;
}

const CompletionFilter = ({ filter, handleFilters }: ICompletionFilter) => {
  const { name, isClosed, color } = filter;

  const [focus, setFocus] = useState(false);
  const [isChecked, setIsCheck] = useState(true);
  const ringColor = color === "green" ? "ring-green-600" : "ring-violet-600";
  const ringHover =
    color === "green" ? "hover:ring-green-600" : "hover:ring-violet-600";
  const bgColor = color === "green" ? "bg-green-600" : "bg-violet-600";

  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  return (
    <label className="flex items-center mr-1">
      <div
        className={`m-2 w-5 h-5 bg-white rounded-sm shadow-md p-1 hover:cursor-pointer outline-none ${
          focus ? ringColor : "ring-gray-100"
        } ring-2 ${ringHover} drop-shadow-sm  flex justify-center items-center transition-all`}
      >
        <input
          type="checkbox"
          className="hidden-checkbox"
          value={name}
          checked={isChecked}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handleFilters(e.target.value, e.target.checked);
            setIsCheck(e.target.checked);
          }}
        />
        {isChecked ? (
          <span
            aria-hidden={true}
            className={`w-full h-full ${bgColor} rounded-sm transition-all`}
          ></span>
        ) : (
          ""
        )}
      </div>
      <div className="uppercase text-xs font-semibold text-slate-600">
        {name}
      </div>
    </label>
  );
};

export default CompletionFilter;
