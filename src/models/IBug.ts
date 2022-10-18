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
  project_id?: number;
}

export interface ICommentClient {
  text: string;
  userId: number;
  bugId: number;
  childId?: number;
  parentId?: number | null;
}

export interface IComment {
  id: number;
  text: string;
  bug: IBug;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
  children: IComment[];
  parent: IComment;
}

export interface IBug extends Omit<IBugClient, "assignedTo"> {
  id: number;
  project: IProject;
  createdBy: IUser;
  createdAt: Date;
  updatedAt: Date;
  comments: IComment[];
  assignedTo: IUser[];
}
