import React, { useContext, useState } from "react";
import { Context } from "../../..";
import Button from "../../controls/button";
import Input from "../../inputs/input";
import Textarea from "../../inputs/textarea";
import Toggle from "../../inputs/toggle";
import CheckboxDropdown from "./checkboxDropdown";

type ProjectValues = {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewers: any;
  closed: boolean;
};

const ProjectModal = () => {
  const { store } = useContext(Context);
  const initialProjectValues = {
    title: "",
    description: "",
    viewers: {},
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewers = (ids: any) => {
    setProjectValues({
      ...projectValues,
      viewers: ids
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
  };
  return (
    <form className="flex flex-col mx-auto" onSubmit={handleSumbit}>
      <Input label="Title" onChange={onChange} name="title" required />
      <Textarea
        label="Description"
        name="description"
        rows={5}
        onChange={onChange}
      />
      <CheckboxDropdown
        buttonLabel="Add viewers"
        handleViewers={handleViewers}
      />
      <div className="mt-4">
        <Toggle label="Closed" name="closed" onChange={handleCheck} />
      </div>
      <div className="w-fit mt-5">
        <Button name="Create" />
      </div>
    </form>
  );
};

export default ProjectModal;
