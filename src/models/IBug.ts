import { IProject } from "./IProject";
import { IUser } from "./IUser";

export interface IBugClient {
  title: string;
  description: string;
  status: string;
  priority: string;
  due: Date;
  assignedTo: number[];
  createdBy: IUser;
  project_id?: string;
}

export interface ICommentClient {
  text: string;
  userId: number;
  bugId: number;
}

export interface IComment {
  id: string;
  text: string;
  bug: IBug;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBug extends Omit<IBugClient, "assignedTo"> {
  id: string;
  project: IProject;
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
  comments: IComment[];
  assignedTo: IUser[];
}
