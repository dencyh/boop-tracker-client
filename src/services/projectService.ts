import { IBug } from "../models/IBug";
import api from "../http";
import { AxiosResponse } from "axios";
import { IProject } from "../models/IProject";

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
}
