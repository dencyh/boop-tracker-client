import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Context } from "../..";
import Button from "../controls/button";
import CloseButton from "../controls/closeButton";
import Toggle from "../inputs/toggle";
import Input from "../inputs/input";
import Textarea from "../inputs/textarea";
import DropdownSearch from "./dropdownSearch";
import { ProjectService } from "../../services/projectService";
import { observer } from "mobx-react-lite";

interface IModal {
  isOpen: boolean;
  onClose: () => void;
}

type ProjectValues = {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewers: any;
  closed: boolean;
};

const Modal = ({ isOpen, onClose }: IModal) => {
  const { store } = useContext(Context);
  const initialValues = {
    title: "",
    description: "",
    viewers: {},
    closed: false
  };
  const [values, setValues] = useState<ProjectValues>(initialValues);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    setValues({ ...values, [target.name]: target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCheck = (e: any) => {
    const checked = e.target.checked;
    setValues({ ...values, [e.target.name]: checked });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewers = (ids: any) => {
    setValues({
      ...values,
      viewers: ids
    });
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, viewers, closed } = values;
    const viewerIds = Object.keys(viewers).filter(
      (key) => viewers[key] === true
    );
    console.log("raw", viewers);
    console.log("edit", viewerIds);
    await store.createProject(title, description, viewerIds, closed);

    // to refresh projects sidebar
    await store.getUserProjects();
  };
  return (
    <>
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-16 w-2/3 m-5">
          <h2 className="text-xl">Project</h2>
          <form className="flex flex-col mx-auto" onSubmit={handleSumbit}>
            <CloseButton onClick={onClose} />
            <Input label="Title" onChange={onChange} name="title" required />
            <Textarea
              label="Description"
              name="description"
              rows={5}
              onChange={onChange}
            />
            <DropdownSearch handleViewers={handleViewers} />
            <div className="mt-4">
              <Toggle label="Closed" name="closed" onChange={handleCheck} />
            </div>
            <div className="w-fit mt-5">
              <Button name="Create" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default observer(Modal);
