import api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";

export class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>("/users");
  }

  static async updateUser({
    id,
    firstName,
    lastName,
    email,
    password
  }: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return api.patch(`/users/${id}`, { firstName, lastName, email, password });
  }
}
