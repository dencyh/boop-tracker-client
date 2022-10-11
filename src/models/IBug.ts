import { IProject } from "./IProject";
import { IUser } from "./IUser";

export interface IBugClient {
  title: string;
  description: string;
  status: string;
  priority: string;
  due: Date;
  assigned_to: number[];
  created_by: IUser;
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
  created_at: Date;
  updated_at: Date;
}

export interface IBug extends Omit<IBugClient, "assigned_to"> {
  id: string;
  project: IProject;
  created_by: IUser;
  created_at: Date;
  updated_at: Date;
  comments: IComment[];
  assigned_to: IUser[];
}
