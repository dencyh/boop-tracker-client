import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import Button from "../../controls/button";
import Input from "../../inputs/input";
import Textarea from "../../inputs/textarea";
import CheckboxDropdown from "./checkboxDropdown";
import LocalizedTimePicker from "./muiPicker";
import MuiPicker from "./muiPicker";
import SimpleDropdown from "./simpleDropdown";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

export interface BugValues {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignedTo: any;
  status: string;
  priority: string;
  due: Date;
}

const statusData = ["open", "done", "won't do", "duplicate"];
const priorityData = ["lowest", "low", "medium", "high", "highest"].reverse();

const BugModal = () => {
  const { store } = useContext(Context);
  const initialBugValues: BugValues = {
    title: "",
    description: "",
    assignedTo: {},
    status: "",
    priority: "",
    due: new Date()
  };

  const [bugValues, setBugValues] = useState<BugValues>(initialBugValues);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    setBugValues({ ...bugValues, [target.name]: target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewers = (ids: any) => {
    setBugValues({
      ...bugValues,
      assignedTo: ids
    });
  };

  const handleValues = (option: string, value: keyof BugValues) => {
    setBugValues({
      ...bugValues,
      [value]: option
    });
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(bugValues);
    const { title, description, status, priority, due, assignedTo } = bugValues;

    // const viewerIds = Object.keys(viewers).filter(
    //   (key) => viewers[key] === true
    // );
    // await store.createProject(title, description, viewerIds, closed);

    // to refresh projects sidebar
    // await store.getUserProjects();
  };
  return (
    <form className="flex flex-col mx-auto" onSubmit={handleSumbit}>
      <div className="flex flex-gap-4 justify-between">
        <div className="w-3/5">
          <Input
            label={"Current project"}
            placeholder={
              store.currentProject.title || "CHOOSE A PROJECT ON THE LEFT"
            }
            disabled
          />
          <Input label="Title" onChange={onChange} name="title" required />
          <Textarea
            label="Description"
            name="description"
            rows={5}
            onChange={onChange}
          />
          <div className="w-fit mt-5">
            <Button name="Create" />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <LocalizedTimePicker />
          </LocalizationProvider>
          <CheckboxDropdown
            buttonLabel="Assign to"
            handleViewers={handleViewers}
          />
          {/* <div className="mt-4">
        <Toggle label="Closed" name="closed" onChange={handleCheck} />
      </div> */}
          <SimpleDropdown
            label="Status"
            name="status"
            menuItems={statusData}
            handleValues={handleValues}
          />
          <SimpleDropdown
            label="Priority"
            name="priority"
            menuItems={priorityData}
            handleValues={handleValues}
          />
        </div>
      </div>
    </form>
  );
};

export default BugModal;
