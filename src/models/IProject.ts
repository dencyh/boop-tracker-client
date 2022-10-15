import { IBug } from "./IBug";
export interface IProject {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  closed: boolean;
  deadline: Date;
  stages: IStage[];
  bugs: IBug[];
}

export interface IStage {
  id: string;
  text: string;
  next: IStage;
  createdAt: string;
  updatedAt: string;
  from: Date;
  till: Date;
}
