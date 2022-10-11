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

export interface IBug extends Omit<IBugClient, "assigned_to"> {
  id: string;
  project: IProject;
  created_by: IUser;
  created_at: Date;
  updated_at: Date;
  comments: string[];
  assigned_to: IUser[];
}
