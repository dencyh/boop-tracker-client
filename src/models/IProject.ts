import { IBug } from "./IBug";
export interface IProject {
  id: number;
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
  id: number;
  text: string;
  next: IStage;
  createdAt: string;
  updatedAt: string;
  from: Date;
  till: Date;
}
