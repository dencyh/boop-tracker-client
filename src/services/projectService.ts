import { IStage, IProject } from "./../models/IProject";
import api from "../http";
import { AxiosResponse } from "axios";
import { IBug } from "../models/IBug";
import { IUser } from "../models/IUser";

export class ProjectService {
  static async getProjects(): Promise<AxiosResponse<IProject[]>> {
    return api.get<IProject[]>("/projects");
  }

  static async createProject({
    title,
    description,
    viewers,
    deadline,
    closed
  }: {
    title: string;
    description: string;
    viewers: number[];
    deadline: Date;
    closed: boolean;
  }): Promise<AxiosResponse<IProject[]>> {
    return api.post("/projects", {
      title,
      description,
      viewers,
      deadline,
      closed
    });
  }

  static async updateProject({
    projectId,
    key,
    newValue
  }: {
    projectId: number;
    key: keyof IProject | keyof IBug;
    newValue: string | string[] | Date | undefined | IUser[];
  }) {
    return api.patch(`/projects/${projectId}`, { key, newValue });
  }

  static async getProjectById(id: number) {
    return api.get<IProject>(`/projects/${id}`);
  }

  static async deleteProject(id: number) {
    return api.delete(`/projects/${id}`);
  }

  static async createStage({
    text,
    projectId,
    userId,
    nextId = null
  }: {
    text: string;
    projectId: number;
    userId: number;
    nextId: number | null;
  }) {
    return api.post("/projects/stages", {
      text,
      projectId,
      userId,
      nextId
    });
  }
  static async updateStage({
    text,
    stageId,
    projectId,
    userId
  }: {
    text: string;
    stageId: number;
    projectId: number;
    userId: number;
  }) {
    return api.patch(`/projects/stages/${stageId}`, {
      text,
      projectId,
      userId
    });
  }

  static async deleteStage(stage: IStage) {
    return api.delete(`/projects/stages/${stage.id}`);
  }
}
