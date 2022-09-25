import api from "../http";
import { Axios, AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/authResponse";

export class AuthService {
  static async signUp(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/signup", {
      first_name,
      last_name,
      email,
      password
    });
  }

  static async signIn(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/signin", { email, password });
  }

  static async signOut(): Promise<void> {
    return api.post("/signout");
  }
}
