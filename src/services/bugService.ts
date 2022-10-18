import { IBugClient, ICommentClient } from "../models/IBug";
import { AxiosResponse } from "axios";
import api from "../http";
import { IBug } from "../models/IBug";
import { BugValues } from "../features/bugs/newModal/bugModal";

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
    project_id
  }: IBugClient) {
    return api.post("/bugs", {
      title,
      description,
      status,
      priority,
      due,
      assignedTo,
      createdBy,
      project_id
    });
  }

  static async updateBug(
    id: number,
    field: keyof BugValues,
    newValue: string | string[] | Date | undefined
  ) {
    return api.patch(`bugs/${id}`, { field, newValue });
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
