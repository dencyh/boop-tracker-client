import { BugValues } from "../components/mainSection/bugs/modal/bugModal";
import { BugService } from "../services/bugService";
import { IBug, IBugClient, ICommentClient } from "../models/IBug";
import { UserService } from "../services/userService";
import { IProject } from "../models/IProject";
import { ProjectService } from "../services/projectService";
import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import { AuthService } from "../services/authService";
import axios from "axios";
import { AuthResponse } from "../models/response/authResponse";
import { API_URL } from "../http";

export default class Store {
  user = {} as IUser;
  projects = [] as IProject[];
  filteredProjects = [] as IProject[];
  currentProject = {} as IProject;
  bug = {} as IBug;
  users = [] as IUser[];
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

  setBug(bug: IBug) {
    this.bug = bug;
  }

  setProjects(projects: IProject[]) {
    this.projects = projects;
  }

  setCurrentProject(project: IProject) {
    this.currentProject = project;
  }

  setFilteredProjects(projects: IProject[]) {
    this.filteredProjects = projects;
  }

  setUsers(users: IUser[]) {
    this.users = users;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  async signIn(email: string, password: string) {
    try {
      const response = await AuthService.signIn(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log(e);
      return e.response.status;
    }
  }

  async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    try {
      const response = await AuthService.signUp(
        firstName,
        lastName,
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
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: unknown) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getUserProjects() {
    try {
      const response = await ProjectService.getProjects();
      this.setProjects(response.data);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async createProject({
    title,
    description,
    viewers,
    deadline,
    closed
  }: {
    title: string;
    description: string;
    viewers: string[];
    deadline: Date;
    closed: boolean;
  }) {
    const response = await ProjectService.createProject({
      title,
      description,
      viewers,
      deadline,
      closed
    });
  }

  async getBug(id: number) {
    try {
      const response = await BugService.getBug(id);

      this.setBug(response.data);
    } catch (e: unknown) {
      console.log(e);
    }
  }

  async createBug({
    title,
    description,
    status,
    priority,
    due,
    assignedTo,
    createdBy,
    project_id
  }: IBugClient) {
    const response = await BugService.createBug({
      title,
      description,
      status,
      priority,
      due,
      assignedTo,
      createdBy,
      project_id
    });
    console.log(response);
    return response;
  }

  async postComment(text: string, parentId: string | null) {
    const userId = Number(this.user.id);
    const bugId = Number(this.bug.id);
    const response = await BugService.postComment({
      text,
      userId,
      bugId,
      parentId
    });
    this.getBug(bugId);
    console.log(response);
    return response;
  }

  async updateComment(text: string, commentId: string) {
    const response = await BugService.updateComment({
      text,
      commentId,
      userId: this.user.id
    });
    this.getBug(Number(this.bug.id));
    console.log(response);
  }

  async updateBug(
    field: keyof BugValues,
    newValue: string | string[] | Date | undefined
  ) {
    const response = await BugService.updateBug(
      Number(this.bug.id),
      field,
      newValue
    );
    console.log(response);
  }

  async getViewers() {
    try {
      const response = await UserService.getUsers();
      const users = response.data.filter((user) => user.id !== this.user.id);
      this.setUsers(users);
    } catch (e: unknown) {
      console.log(e);
    }
  }
}
