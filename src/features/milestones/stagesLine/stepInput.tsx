import React from "react";
import { IBaseInput } from "../../../components/inputs/interfaces/IBaseInput";

const StepInput = ({ value, handleChange, ...rest }: IBaseInput) => {
  return (
    <form className=" w-full rounded-lg border border-indigo-600">
      <input
        className="w-full rounded-lg p-1 text-sm font-bold text-gray-600"
        onChange={(e) => handleChange({ name: "", value: e.target.value })}
        value={value}
        {...rest}
      />
    </form>
  );
};

export default StepInput;
