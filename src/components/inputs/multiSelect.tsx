import React from "react";
import Select, { MultiValue } from "react-select";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  name: string;
  options: Option[];
  value?: Option[];
  handleChange: ({
    name,
    value
  }: {
    name: string;
    value: MultiValue<Option>;
  }) => void;
};

const MultiSelect = ({
  name,
  options,
  value,
  handleChange
}: MultiSelectProps) => {
  return (
    <Select
      isMulti
      name={name}
      value={value}
      closeMenuOnSelect={false}
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(value) => handleChange({ name, value })}
    />
  );
};

export default MultiSelect;
