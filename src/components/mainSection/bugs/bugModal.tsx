import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import Button from "../../controls/button";
import Input from "../../inputs/input";
import Textarea from "../../inputs/textarea";
import CheckboxDropdown from "./checkboxDropdown";
import MuiPicker from "./muiPicker";
import SimpleDropdown from "./simpleDropdown";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { observer } from "mobx-react-lite";
import { ProjectValues } from "./projectModal";
import BugModalError from "./bugModalError";

export interface BugValues {
  title: string;
  description: string;
  assignedTo: string[];
  status: string;
  priority: string;
  due: Date;
  projectId: string;
}

export interface BugModalErrors {
  message: string;
  passed: boolean;
}

const statusData = ["open", "done", "won't do", "duplicate"].reduce(
  (acc, item) => {
    return { ...acc, [item]: item };
  },
  {}
);
const priorityData = ["lowest", "low", "medium", "high", "highest"]
  .reverse()
  .reduce((acc, item) => {
    return { ...acc, [item]: item };
  }, {});

const BugModal = () => {
  const { store } = useContext(Context);

  const availableProjects = store.projects.reduce((acc, project) => {
    return { ...acc, [project.id]: project.title.toLowerCase() };
  }, {});

  useEffect(() => {
    store.getViewers();
  }, []);

  const initialBugValues: BugValues = {
    title: "",
    description: "",
    assignedTo: [],
    status: "open",
    priority: "medium",
    due: new Date(),
    projectId: store.currentProject.id
  };

  const [bugValues, setBugValues] = useState<BugValues>(initialBugValues);

  const initErrors = {
    emptyProject: {
      message: "You have to choose a project",
      passed: Boolean(store.currentProject.id)
    },
    emptyTitle: {
      message: "Title can not be empty",
      passed: Boolean(bugValues.title)
    }
  };
  const [validationErrors, setValidationErrors] = useState({
    emptyProject: {
      message: "You have to choose a project",
      passed: true
    },
    emptyTitle: {
      message: "Title can not be empty",
      passed: true
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    setBugValues({ ...bugValues, [target.name]: target.value });
  };

  const handleValues = (
    option: string | string[] | Date | undefined,
    value: keyof BugValues | keyof ProjectValues
  ) => {
    setBugValues({
      ...bugValues,
      [value]: option
    });

    if (value === "projectId") {
      store.projects.forEach((project) => {
        if (Number(project.id) === Number(option)) {
          store.setCurrentProject(project);
        }
      });
    }
  };

  const checkErrors = () => {
    setValidationErrors(initErrors);
    const errors: string[] = [];
    for (const error in initErrors) {
      if (!initErrors[error].passed) {
        errors.push(initErrors[error].message);
      }
    }
    return errors;
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectId = Number(store.currentProject.id);
    const createdBy = store.user.id;
    const { title, description, status, priority, due, assignedTo } = bugValues;
    const errors = checkErrors();
    if (errors[0]) return;

    const userIds = assignedTo.map((userId) => Number(userId));
    await store.createBug({
      title,
      description,
      status,
      priority,
      due,
      assigned_to: userIds,
      created_by: Number(createdBy),
      project_id: projectId
    });

    // to refresh projects sidebar
    // await store.getUserProjects();
  };
  return (
    <form className="flex flex-col mx-auto" onSubmit={handleSumbit}>
      <div className="flex flex-gap-4 justify-between">
        <div className="w-3/5">
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400">
            Current project
          </label>
          <SimpleDropdown
            label={store.currentProject.title}
            name="projectId"
            menuItems={availableProjects}
            handleValues={handleValues}
          />
          <BugModalError {...validationErrors.emptyProject} />
          <Input label="Title" onChange={onChange} name="title" />
          <BugModalError {...validationErrors.emptyTitle} />
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
          <div className="mb-2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MuiPicker
                label="Choose due date"
                name="due"
                handleValues={handleValues}
              />
            </LocalizationProvider>
          </div>
          <CheckboxDropdown
            label="Assign to"
            name="assignedTo"
            menuItems={store.users}
            handleValues={handleValues}
          />
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

export default observer(BugModal);
