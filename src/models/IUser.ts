import { IProject } from "./IProject";
export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailConfirmed: boolean;
  confirmationLink: string;
  createdAt: string;
  updatedAt: string;
  trackingProjects: IProject[];
}
