import { IUser } from "./../../../models/IUser";
import { IBug } from "./../../../models/IBug";
import { checkBugTime } from "../../../services/utils/checkBugTime";

export interface filter {
  active: boolean;
  name: string;
  value?: keyof IBug;
  callback?: (bug, user) => void;
  children?: filter[];
}

export const filterMenuItems: filter[] = [
  {
    active: false,
    name: "Status",
    value: "status",

    children: [
      { active: false, name: "Open" },
      { active: false, name: "Done" },
      { active: false, name: "Duplicate" },
      { active: false, name: "Won't do" }
    ]
  },
  {
    active: false,
    name: "Priority",
    value: "priority",
    children: [
      { active: false, name: "Highest" },
      { active: false, name: "High" },
      { active: false, name: "Medium" },
      { active: false, name: "Low" },
      { active: false, name: "Lowest" }
    ]
  },
  {
    active: false,
    name: "Due",
    value: "due",
    children: [
      {
        active: false,
        name: "Today",
        callback: (bug: IBug) => checkBugTime(bug) === 0
      },
      {
        active: false,
        name: "In 7 days",
        callback: (bug: IBug) => checkBugTime(bug) >= 0 && checkBugTime(bug) < 7
      },
      {
        active: false,
        name: "Overdue",
        callback: (bug: IBug) => checkBugTime(bug) < 0
      }
    ]
  },
  {
    active: false,
    name: "Assigned to me",
    value: "assignedTo",
    callback: (bug: IBug, user: IUser) =>
      bug.assignedTo.some((assignedTo) => assignedTo.id === user.id)
  }
];
