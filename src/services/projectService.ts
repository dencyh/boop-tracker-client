import { IBug } from "./../models/IBug";
import api from "../http/";
import { AxiosResponse } from "axios";
import { IProject } from "../models/IProject";

type ProjectClient = {
  title: string;
  description: string;
  viewers: [];
  closed: boolean;
};

export class ProjectService {
  static async getProjects(): Promise<AxiosResponse<IProject[]>> {
    return api.get<IProject[]>("/projects");
  }

  static async createProject(
    title: string,
    description: string,
    viewers: string[],
    closed: boolean
  ): Promise<AxiosResponse<IProject[]>> {
    return api.post("/projects", { title, description, viewers, closed });
  }

  static async createBug({
    title,
    description,
    status,
    priority,
    due,
    assigned_to,
    created_by,
    project_id
  }: IBug) {
    return api.post("/bugs", {
      title,
      description,
      status,
      priority,
      due,
      assigned_to,
      created_by,
      project_id
    });
  }
}
