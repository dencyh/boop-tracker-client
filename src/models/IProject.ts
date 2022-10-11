import { IBug } from "./IBug";
export interface IProject {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  closed: boolean;
  bugs: IBug[];
}
