import { IBugClient, ICommentClient } from "./../models/IBug";
import { AxiosResponse } from "axios";
import api from "../http";
import { IBug } from "../models/IBug";

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
    assigned_to,
    created_by,
    project_id
  }: IBugClient) {
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

  static async postComment({ text, userId, bugId }: ICommentClient) {
    return api.post("/comments", {
      text,
      userId,
      bugId
    });
  }
}
