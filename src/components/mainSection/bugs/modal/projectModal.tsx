import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../..";
import Button from "../../../controls/button";
import Input from "../../../inputs/input";
import Textarea from "../../../inputs/textarea";
import Toggle from "../../../inputs/toggle";
import { BugValues } from "./bugModal";
import CheckboxDropdown from "./checkboxDropdown";
import MuiPicker from "./muiPicker";

export interface ProjectValues {
  title: string;
  description: string;
  viewers: string[];
  deadline: Date;
  closed: boolean;
}

type ProjetModalProps = {
  onClose: () => void;
};
const ProjectModal = ({ onClose }: ProjetModalProps) => {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getViewers();
  }, []);

  const initialProjectValues = {
    title: "",
    description: "",
    viewers: [],
    deadline: dayjs().add(1, "year").toDate(),
    closed: false
  };
  const [projectValues, setProjectValues] =
    useState<ProjectValues>(initialProjectValues);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    setProjectValues({ ...projectValues, [target.name]: target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheck = (e: any) => {
    const checked = e.target.checked;
    setProjectValues({ ...projectValues, [e.target.name]: checked });
  };

  const handleValues = (
    option: string | string[] | Date | undefined,
    value: keyof ProjectValues | keyof BugValues
  ) => {
    setProjectValues({
      ...projectValues,
      [value]: option
    });
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, viewers, deadline, closed } = projectValues;
    const viewerIds = Object.keys(viewers).filter(
      (key) => viewers[key] === true
    );
    await store.createProject({
      title,
      description,
      viewers: viewerIds,
      deadline,
      closed
    });

    // to refresh projects sidebar
    await store.getUserProjects();
    onClose();
  };
  return (
    <form className="mx-auto flex gap-4" onSubmit={handleSumbit}>
      <div className="w-3/5">
        <Input label="Title" onChange={onChange} name="title" required />
        <Textarea
          label="Description"
          name="description"
          rows={5}
          onChange={onChange}
        />
        <div className="mt-4">
          <Toggle label="Closed" name="closed" onChange={handleCheck} />
        </div>
        <div className="mt-5 w-fit">
          <Button name="Create" />
        </div>
      </div>
      <div className="flex w-2/5 flex-col items-end">
        <div className="my-4">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiPicker
              label="Estimate deadline"
              name="deadline"
              handleValues={handleValues}
              initValue={dayjs(projectValues.deadline)}
            />
          </LocalizationProvider>
        </div>
        <CheckboxDropdown
          label="Add viewers"
          name="viewers"
          menuItems={store.users}
          handleValues={handleValues}
        />
      </div>
    </form>
  );
};

export default observer(ProjectModal);
