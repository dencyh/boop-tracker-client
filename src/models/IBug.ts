import { IProject } from "./IProject";
import { IUser } from "./IUser";
export interface IBug {
  id?: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  due: Date;
  assigned_to: number[];
  created_by: IUser;
  project_id: string;
  project?: IProject;
  created_at?: Date;
  updated_at?: Date;
  comments?: string[];
}
