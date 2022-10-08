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
  created_at?: Date;
}
