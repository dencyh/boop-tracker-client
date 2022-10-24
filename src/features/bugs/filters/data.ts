import { IProject } from "./../../../models/IProject";
import { IBug } from "./../../../models/IBug";
export interface filter {
  active: boolean;
  name: string;
  value?: keyof IBug;
  callback?: (projectsArr: IProject[]) => void;
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
      { active: false, name: "Today" },
      { active: false, name: "In 7 days" },
      { active: false, name: "Overdue" }
    ]
  }
  // { active: false, name: "Assigned to me", value: "assignedTo" }
];
