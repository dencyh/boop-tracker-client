import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
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
  handleValues: (
    option: Date | undefined,
    value: keyof BugValues | keyof ProjectValues
  ) => void;
  initValue?: Dayjs | null;
};
export default function MuiPicker({
  label,
  name,
  handleValues,
  initValue
}: TimePickerProps) {
  const locale = "ru";
  const [value, setValue] = React.useState<Dayjs | null | undefined>(initValue);

  React.useEffect(() => {
    handleValues(value?.toDate(), name);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={(newValue) => {
          handleValues(newValue?.toDate(), name);
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        ampm={false}
      />
    </LocalizationProvider>
  );
}
