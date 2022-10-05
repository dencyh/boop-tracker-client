import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/ar-sa";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BugValues } from "./bugModal";

type TimePickerProps = {
  label: string;
  name: keyof BugValues;
  handleValues: (option: Date | undefined, value: keyof BugValues) => void;
};
export default function MuiPicker({
  label,
  name,
  handleValues
}: TimePickerProps) {
  const locale = "ru";
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs(Date.now() + 1000 * 60 * 60 * 24)
  );

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
