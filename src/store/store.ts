import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import {AuthService} from "../services/authService";
import axios from "axios";
import {AuthResponse} from "../models/response/authResponse";
import {API_URL} from "../http";

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(value: boolean) {
    this.isAuth = value;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async signIn(email: string, password: string) {
    try {
      const response = await AuthService.signIn(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser((response.data.user));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async signUp(first_name: string, last_name: string, email: string, password: string) {
    try {
      const response = await AuthService.signUp(first_name, last_name, email, password);
      console.log(response);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser((response.data.user));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async signOut() {
    try {
      const response = await AuthService.signOut();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }


  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
      console.log(response);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser((response.data.user));
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }
}
