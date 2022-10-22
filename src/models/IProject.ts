import { IUser } from "./IUser";
import { IBug } from "./IBug";
export interface IProject {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  closed: boolean;
  deadline: Date;
  stages: IStage[];
  bugs: IBug[];
  createdBy: IUser;
  viewers: IUser[];
}

export interface IStage {
  id: number;
  text: string;
  next: IStage;
  createdAt: string;
  updatedAt: string;
  from: Date;
  till: Date;
  project: IProject;
}
