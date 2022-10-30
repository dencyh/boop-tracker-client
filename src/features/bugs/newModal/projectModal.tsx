import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import Button from "../../../components/controls/button";
import Input from "../../../components/inputs/input";
import Textarea from "../../../components/inputs/textarea";
import Toggle from "../../../components/inputs/toggle";
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

  const handleChange = ({
    name,
    value
  }: {
    name: string;
    value: string | string[] | Date | undefined | boolean;
  }) => {
    setProjectValues({
      ...projectValues,
      [name]: value
    });
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, viewers, deadline, closed } = projectValues;
    const viewerIds = viewers.map((key) => Number(key));
    await store.createProject({
      title,
      description,
      viewers: viewerIds,
      deadline,
      closed
    });

    onClose();
  };
  return (
    <form className="mx-auto flex gap-4" onSubmit={handleSumbit}>
      <div className="w-3/5">
        <Input
          label="Title"
          handleChange={handleChange}
          name="title"
          required
        />
        <Textarea
          label="Description"
          name="description"
          rows={5}
          handleChange={handleChange}
        />
        <div className="mt-4">
          <Toggle
            label="Closed"
            name="closed"
            handleChange={handleChange}
            checked={projectValues.closed}
          />
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
              handleChange={handleChange}
              initValue={dayjs(projectValues.deadline)}
            />
          </LocalizationProvider>
        </div>
        <CheckboxDropdown
          label="Add viewers"
          name="viewers"
          menuItems={store.users}
          handleChange={handleChange}
        />
      </div>
    </form>
  );
};

export default observer(ProjectModal);
