import React, { useContext, useState } from "react";
import { Context } from "../..";
import Button from "../controls/button";
import Input from "../inputs/input";
import Textarea from "../inputs/textarea";
import CheckboxDropdown from "./checkboxDropdown";
import SimpleDropdown from "./simpleDropdown";

type BugValues = {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignedTo: any;
  status: string;
  priority: string;
  due: Date;
};

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
  const handleCheck = (e: any) => {
    const checked = e.target.checked;
    setBugValues({ ...bugValues, [e.target.name]: checked });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewers = (ids: any) => {
    setBugValues({
      ...bugValues,
      assignedTo: ids
    });
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const { title, description, viewers, closed } = bugValues;
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
        <div className="flex flex-col gap-4 items-end">
          <CheckboxDropdown
            buttonLabel="Assign to"
            handleViewers={handleViewers}
          />
          {/* <div className="mt-4">
        <Toggle label="Closed" name="closed" onChange={handleCheck} />
      </div> */}
          <SimpleDropdown name="Status" menuItems={statusData} />
          <SimpleDropdown name="Priority" menuItems={priorityData} />
        </div>
      </div>
    </form>
  );
};

export default BugModal;
