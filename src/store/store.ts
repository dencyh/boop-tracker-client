import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/authService";
import axios from "axios";
import { AuthResponse } from "../models/response/authResponse";
import { API_URL } from "../http";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(value: boolean) {
    this.isAuth = value;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  async signIn(email: string, password: string) {
    try {
      const response = await AuthService.test(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      // console.log(e.response?.data?.message);
      return e.response?.data?.message;
    }
  }

  async signUp(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    try {
      const response = await AuthService.signUp(
        first_name,
        last_name,
        email,
        password
      );
      console.log(response);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      // console.log(e.response?.data?.message);
      return e.response?.data?.message;
    }
  }

  async signOut() {
    try {
      const response = await AuthService.signOut();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true
      });
      console.log(response);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: unknown) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
}
