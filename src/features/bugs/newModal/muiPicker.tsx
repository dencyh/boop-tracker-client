import * as React from "react";
import { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/ar-sa";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BugValues } from "./bugModal";
import { ProjectValues } from "./projectModal";

type TimePickerProps = {
  label: string;
  name: keyof BugValues | keyof ProjectValues;
  handleChange: ({
    name,
    value
  }: {
    name: string;
    value: string | string[] | Date | undefined;
  }) => void;
  initValue?: Dayjs | null;
};
export default function MuiPicker({
  label,
  name,
  handleChange,
  initValue
}: TimePickerProps) {
  const locale = "ru";
  const [value, setValue] = React.useState<Dayjs | null | undefined>(initValue);

  React.useEffect(() => {
    handleChange({ name, value: value?.toDate() });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          handleChange({ name, value: newValue?.toDate() });
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        ampm={false}
      />
    </LocalizationProvider>
  );
}
