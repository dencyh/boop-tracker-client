import api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/authResponse";

export class AuthService {
  static async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/signup", {
      firstName,
      lastName,
      email,
      password
    });
  }

  static async signIn(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/signin", {
      email,
      password
    });
  }

  static async signOut(): Promise<void> {
    return api.post("/signout");
  }
}
