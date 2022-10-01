import React, { useEffect, useState } from "react";

type Value = "open" | "closed";

interface ICompletionFilter {
  value: Value;
  checked: boolean;
  onCheck: (value: Value) => void;
}

const CompletionFilter = ({ value, checked, onCheck }: ICompletionFilter) => {
  const [focus, setFocus] = useState(false);
  const ringColor = value === "open" ? "ring-green-600" : "ring-violet-600";
  const ringHover =
    value === "open" ? "hover:ring-green-600" : "hover:ring-violet-600";
  const bgColor = value === "open" ? "bg-green-600" : "bg-violet-600";

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
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            onCheck(e.currentTarget.value as Value);
          }}
        />
        {checked ? (
          <span
            aria-hidden={true}
            className={`w-full h-full ${bgColor} rounded-sm transition-all`}
          ></span>
        ) : (
          ""
        )}
      </div>
      <div className="uppercase text-xs">{value}</div>
    </label>
  );
};

export default CompletionFilter;
