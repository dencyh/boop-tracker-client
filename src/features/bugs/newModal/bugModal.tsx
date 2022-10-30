import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../..";
import Button from "../../../components/controls/button";
import Input from "../../../components/inputs/input";
import Textarea from "../../../components/inputs/textarea";
import CheckboxDropdown from "./checkboxDropdown";
import MuiPicker from "./muiPicker";
import SimpleDropdown from "./simpleDropdown";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { observer } from "mobx-react-lite";
import BugModalError from "./bugModalError";
import dayjs from "dayjs";

export interface BugValues {
  title: string;
  description: string;
  assignedTo: string[];
  status: string;
  priority: string;
  due: Date;
  projectId: number;
}

export interface BugModalErrors {
  message: string;
  passed: boolean;
}

export const statusData = ["open", "done", "won't do", "duplicate"].reduce(
  (acc, item) => {
    return { ...acc, [item]: item };
  },
  {}
);
export const priorityData = ["lowest", "low", "medium", "high", "highest"]
  .reverse()
  .reduce((acc, item) => {
    return { ...acc, [item]: item };
  }, {});

type BugModalProps = {
  onClose: () => void;
};

const BugModal = ({ onClose }: BugModalProps) => {
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
    due: dayjs().add(1, "day").toDate(),
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

  const handleChange = ({
    name,
    value
  }: {
    name: string;
    value: string | string[] | Date | undefined;
  }) => {
    setBugValues({ ...bugValues, [name]: value });

    if (name === "projectId") {
      store.projects.forEach((project) => {
        if (Number(project.id) === Number(value)) {
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

    setBugValues((prev) => ({ ...prev, projectId: store.currentProject.id }));
    const createdBy = store.user;

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
      assignedTo: userIds,
      createdBy: createdBy,
      projectId: store.currentProject.id
    });

    onClose();
  };

  useEffect(() => {
    store.setCurrentProjectById(bugValues.projectId);
  }, [store.projects]);

  return (
    <form className="mx-auto flex flex-col" onSubmit={handleSumbit}>
      <div className="flex-gap-4 flex justify-between">
        <div className="w-3/5">
          <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-gray-400">
            Current project
          </label>
          <SimpleDropdown
            label={store.currentProject.title}
            name="projectId"
            menuItems={availableProjects}
            handleChange={handleChange}
          />
          <BugModalError {...validationErrors.emptyProject} />
          <Input label="Title" handleChange={handleChange} name="title" />
          <BugModalError {...validationErrors.emptyTitle} />
          <Textarea
            label="Description"
            name="description"
            rows={5}
            handleChange={handleChange}
          />
          <div className="mt-5 w-fit">
            <Button name="Create" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MuiPicker
                label="Choose due date"
                name="due"
                handleChange={handleChange}
                initValue={dayjs(bugValues.due)}
              />
            </LocalizationProvider>
          </div>
          <CheckboxDropdown
            label="Assign to"
            name="assignedTo"
            menuItems={store.users}
            handleChange={handleChange}
          />
          <SimpleDropdown
            label="Status"
            name="status"
            menuItems={statusData}
            handleChange={handleChange}
          />
          <SimpleDropdown
            label="Priority"
            name="priority"
            menuItems={priorityData}
            handleChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default observer(BugModal);
