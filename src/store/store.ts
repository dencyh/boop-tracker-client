import { BugValues } from "../features/bugs/newModal/bugModal";
import { BugService } from "../services/bugService";
import { IBug, IBugClient } from "../models/IBug";
import { UserService } from "../services/userService";
import { IProject, IStage } from "../models/IProject";
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
  project = {} as IProject;
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

  setProject(project: IProject) {
    this.project = project;
  }

  setCurrentProject(project: IProject) {
    this.currentProject = project;
  }

  setCurrentProjectById(projectId: number) {
    this.projects.forEach((project) => {
      if (project.id === projectId) {
        this.setCurrentProject(project);
      }
    });
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
      // console.log(response);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(this.user);
      console.log(response);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
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
      // console.log(response);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(response);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      return e.response?.data?.message;
    }
  }

  async signOut() {
    try {
      const response = await AuthService.signOut();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      console.log(response);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async updateUser({
    firstName,
    lastName,
    email,
    password
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
  }) {
    try {
      const response = await UserService.updateUser({
        id: this.user.id,
        firstName,
        lastName,
        email,
        password
      });
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setUser(response.data.updatedUser);
      console.log(response);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      return e.response;
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
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getUserProjects() {
    try {
      const response = await ProjectService.getProjects();
      this.setProjects(response.data);
      this.setCurrentProject({ ...{} } as IProject);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async getProjectById(id: number) {
    try {
      const response = await ProjectService.getProjectById(id);
      console.log(response);
      this.setProject(response.data);
    } catch (e) {
      console.error(e);
      return e;
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
    viewers: number[];
    deadline: Date;
    closed: boolean;
  }) {
    try {
      const response = await ProjectService.createProject({
        title,
        description,
        viewers,
        deadline,
        closed
      });
      console.log(response);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async updateProject({
    projectId,
    option,
    newValue
  }: {
    projectId: number;
    option: keyof IProject | keyof IBug;
    newValue: string;
  }) {
    try {
      const response = await ProjectService.updateProject({
        projectId,
        option,
        newValue
      });
      await this.getUserProjects();
      await this.getProjectById(Number(projectId));
      console.log(response);
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async deleteProject(id: number) {
    try {
      const response = await ProjectService.deleteProject(id);
      await this.getUserProjects();
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  async createStage({
    text,
    projectId,
    nextId = null
  }: {
    text: string;
    projectId: number;
    nextId: number | null;
  }) {
    try {
      const response = await ProjectService.createStage({
        text,
        projectId,
        userId: this.user.id,
        nextId
      });
      await this.getUserProjects();
      if (this.currentProject.id) {
        this.setCurrentProjectById(projectId);
      } else {
        this.setCurrentProject({} as IProject);
      }
      console.log(response);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async deleteStage(stage: IStage) {
    try {
      const response = await ProjectService.deleteStage(stage);
      await this.getUserProjects();
      if (this.currentProject.id) {
        this.setCurrentProjectById(stage.project.id);
      } else {
        this.setCurrentProject({} as IProject);
      }
      console.log(response);
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async updateStage({
    text,
    stageId,
    projectId
  }: {
    text: string;
    stageId: number;
    projectId: number;
  }) {
    try {
      const response = await ProjectService.updateStage({
        text,
        stageId,
        projectId,
        userId: this.user.id
      });
      if (this.currentProject.id) {
        this.setCurrentProjectById(projectId);
      } else {
        this.setCurrentProject({} as IProject);
      }
      console.log(response);
      await this.getUserProjects();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getBug(id: number) {
    try {
      const response = await BugService.getBug(id);

      console.log(response);
      this.setBug(response.data);
    } catch (e: unknown) {
      console.error(e);
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
    projectId
  }: IBugClient) {
    try {
      const response = await BugService.createBug({
        title,
        description,
        status,
        priority,
        due,
        assignedTo,
        createdBy,
        projectId
      });
      console.log(response);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async postComment(text: string, parentId: number | null) {
    try {
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
    } catch (e) {
      console.error(e);
    }
  }

  async updateComment(text: string, commentId: number) {
    try {
      const response = await BugService.updateComment({
        text,
        commentId,
        userId: this.user.id
      });
      this.getBug(Number(this.bug.id));
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  async updateBug({
    field,
    newValue
  }: {
    field: keyof IBug | keyof IProject;
    newValue: string | string[] | Date | undefined | IUser[];
  }) {
    try {
      const response = await BugService.updateBug(
        Number(this.bug.id),
        field,
        newValue
      );
      this.getBug(this.bug.id);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteBug(id: number) {
    try {
      const response = await BugService.deleteBug(id);
      await this.getUserProjects();
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  async getViewers() {
    try {
      const response = await UserService.getUsers();
      const users = response.data.filter((user) => user?.id !== this.user?.id);
      this.setUsers(users);
    } catch (e: unknown) {
      console.error(e);
    }
  }
}
