import api from "../http/";
import { AxiosResponse } from "axios";
import { IProject } from "../models/IProject";

export class ProjectService {
  static async getProjects(): Promise<AxiosResponse<IProject[]>> {
    return api.get<IProject[]>("/projects");
  }
}
