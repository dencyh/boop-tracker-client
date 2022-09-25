import api from "../http/";
import { Axios, AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/authResponse";
import { IUser } from "../models/IUser";

export class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>("/users");
  }
}
