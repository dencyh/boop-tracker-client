import React from "react";
import Select, { MultiValue, SingleValue } from "react-select";

export interface ReactSelectOption {
  label: string;
  value: string;
}

type MultiSelectProps = {
  name: string;
  options: ReactSelectOption[];
  value?: ReactSelectOption[];
  handleChange: ({
    name,
    value
  }: {
    name: string;
    value: MultiValue<ReactSelectOption> | SingleValue<ReactSelectOption>;
  }) => void;
  isMulti?: boolean;
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
