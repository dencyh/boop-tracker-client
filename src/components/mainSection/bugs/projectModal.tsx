import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import Button from "../../controls/button";
import Input from "../../inputs/input";
import Textarea from "../../inputs/textarea";
import Toggle from "../../inputs/toggle";
import { BugValues } from "./bugModal";
import CheckboxDropdown from "./checkboxDropdown";

export interface ProjectValues {
  title: string;
  description: string;
  viewers: string[];
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
    option: string | string[],
    value: keyof ProjectValues | keyof BugValues
  ) => {
    setProjectValues({
      ...projectValues,
      [value]: option
    });
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, viewers, closed } = projectValues;
    const viewerIds = Object.keys(viewers).filter(
      (key) => viewers[key] === true
    );
    await store.createProject(title, description, viewerIds, closed);

    // to refresh projects sidebar
    await store.getUserProjects();
    onClose();
  };
  return (
    <form className="mx-auto flex flex-col" onSubmit={handleSumbit}>
      <Input label="Title" onChange={onChange} name="title" required />
      <Textarea
        label="Description"
        name="description"
        rows={5}
        onChange={onChange}
      />
      <CheckboxDropdown
        label="Add viewers"
        name="viewers"
        menuItems={store.users}
        handleValues={handleValues}
      />
      <div className="mt-4">
        <Toggle label="Closed" name="closed" onChange={handleCheck} />
      </div>
      <div className="mt-5 w-fit">
        <Button name="Create" />
      </div>
    </form>
  );
};

export default observer(ProjectModal);
