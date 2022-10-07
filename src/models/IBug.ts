import { IUser } from "./IUser";
export interface IBug {
  title: string;
  description: string;
  status: string;
  priority: string;
  due: Date;
  assigned_to: number[];
  created_by: IUser;
  project_id: number;
  created_at?: Date;
}
