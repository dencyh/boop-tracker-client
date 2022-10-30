import { IUser } from "./../models/IUser";
import { IProject } from "./../models/IProject";
import { IBugClient, ICommentClient, IBug } from "../models/IBug";
import { AxiosResponse } from "axios";
import api from "../http";

export class BugService {
  static async getBug(id: number): Promise<AxiosResponse<IBug>> {
    return api.get<IBug>(`/bugs/${id}`);
  }

  static async createBug({
    title,
    description,
    status,
    priority,
    due,
    assignedTo,
    createdBy,
    projectId
  }: IBugClient) {
    return api.post("/bugs", {
      title,
      description,
      status,
      priority,
      due,
      assignedTo,
      createdBy,
      projectId
    });
  }

  static async updateBug({
    id,
    key,
    newValue
  }: {
    id: number;
    key: keyof IBug | keyof IProject;
    newValue: string | string[] | Date | undefined | IUser[];
  }) {
    return api.patch(`bugs/${id}`, { key, newValue });
  }

  static async deleteBug(id: number) {
    return api.delete(`/bugs/${id}`);
  }

  static async postComment({ text, userId, bugId, parentId }: ICommentClient) {
    return api.post("/comments", {
      text,
      userId,
      bugId,
      parentId
    });
  }

  static async updateComment({
    text,
    commentId,
    userId
  }: {
    text: string;
    commentId: number;
    userId: number;
  }) {
    return api.patch(`comments/${commentId}`, {
      text,
      userId
    });
  }
}
