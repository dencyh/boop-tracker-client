import { filter, filterMenuItems } from "./../features/bugs/filters/data";
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
  filteredProjectsWithBugs = [] as IProject[];
  bugFilters = filterMenuItems;
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
    this.filterBugs();
  }

  setFilteredProjectsWithBugs(projects: IProject[]) {
    this.filteredProjectsWithBugs = projects;
  }

  setBugFilters(filters: filter[]) {
    this.bugFilters = filters;
  }

  setUsers(users: IUser[]) {
    this.users = users;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  async refreshOnUpdate() {
    const projectId = this.currentProject.id;
    console.log(projectId);
    if (projectId) {
      await this.getUserProjects();
      this.setCurrentProjectById(projectId);
      console.log(this.currentProject.id);
    } else {
      await this.getUserProjects();
      this.setCurrentProject({} as IProject);
    }
  }

  filterBugs() {
    const activeFilters = this.bugFilters.filter(
      (filter) => filter.active === true
    );
    // Reset current project
    this.setCurrentProjectById(this.currentProject.id);

    const runFilters = (project: IProject) => {
      if (activeFilters.length === 0) {
        this.setCurrentProjectById(this.currentProject.id);
      }
      activeFilters.forEach((filter) => {
        let activeValues;
        if (!filter.children) {
          activeValues = filter.active
            ? filter.callback
              ? [filter.callback]
              : [filter.name]
            : [];
        } else {
          activeValues = filter.children
            .filter((child) => child.active === true)
            .map((child) => {
              if (child.callback) {
                return child.callback;
              } else {
                return child.name.toLowerCase();
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }) as any[];
        }

        let updatedBugs;

        if (activeValues[0]) {
          const isCallback = activeValues.every(
            (value) => typeof value === "function"
          );
          if (isCallback) {
            // If callback provided
            updatedBugs = project.bugs.filter((bug) =>
              activeValues.every((callback) => callback(bug, this.user))
            );
          } else if (typeof activeValues[0] === "string") {
            // If plain string
            updatedBugs = project.bugs.filter((bug) =>
              activeValues?.includes(bug[filter.value as string])
            );
          }
        }

        project = { ...project, bugs: updatedBugs };
      });

      return project;
    };

    if (this.currentProject.id) {
      this.setCurrentProject(runFilters(this.currentProject));
    } else {
      this.setFilteredProjectsWithBugs(
        this.filteredProjects
          .map((project) => {
            return runFilters(project);
          })
          .filter((project) => project.bugs.length > 0)
      );
    }
  }

  async signIn(email: string, password: string) {
    this.setLoading(true);
    try {
      const response = await AuthService.signIn(email, password);
      localStorage.setItem("token", response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log(response);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e);
      return e.response?.status;
    } finally {
      this.setLoading(false);
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
    this.setLoading(true);
    try {
      const response = await AuthService.signOut();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
      console.log(response);
    } catch (e: unknown) {
      console.error(e);
    } finally {
      this.setLoading(false);
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
    this.setLoading(true);
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
    } finally {
      this.setLoading(false);
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
      // ???
      this.setCurrentProject({ ...{} } as IProject);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async getProjectById(id: number) {
    this.setLoading(true);
    try {
      const response = await ProjectService.getProjectById(id);
      console.log(response);
      this.setProject(response.data);
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      this.setLoading(false);
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
    this.setLoading(true);
    try {
      const response = await ProjectService.createProject({
        title,
        description,
        viewers,
        deadline,
        closed
      });
      console.log(response);
      this.getUserProjects();
    } catch (e: unknown) {
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  }

  async updateProject({
    projectId,
    key,
    newValue
  }: {
    projectId: number;
    key: keyof IProject | keyof IBug;
    newValue: string | string[] | Date | undefined | IUser[];
  }) {
    try {
      this.setLoading(true);
      const response = await ProjectService.updateProject({
        projectId,
        key,
        newValue
      });
      await this.refreshOnUpdate();

      console.log(response);
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      this.setLoading(false);
    }
  }

  async deleteProject(id: number) {
    this.setLoading(true);
    try {
      const response = await ProjectService.deleteProject(id);
      await this.getUserProjects();
      console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      this.setLoading(false);
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
    this.setLoading(true);
    try {
      const response = await ProjectService.createStage({
        text,
        projectId,
        userId: this.user.id,
        nextId
      });

      await this.refreshOnUpdate();
      console.log(response);
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      this.setLoading(false);
    }
  }

  async deleteStage(stage: IStage) {
    this.setLoading(true);
    try {
      const response = await ProjectService.deleteStage(stage);
      await this.refreshOnUpdate();

      console.log(response);
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      this.setLoading(false);
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
    this.setLoading(true);
    try {
      const response = await ProjectService.updateStage({
        text,
        stageId,
        projectId,
        userId: this.user.id
      });
      await this.refreshOnUpdate();
      console.log(response);
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      this.setLoading(false);
    }
  }

  async getBug(id: number) {
    this.setLoading(true);
    try {
      const response = await BugService.getBug(id);

      console.log(response);
      this.setBug(response.data);
    } catch (e: unknown) {
      console.error(e);
    } finally {
      this.setLoading(false);
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
    this.setLoading(true);
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
      await this.refreshOnUpdate();
      return response;
    } catch (e) {
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  }

  async postComment(text: string, parentId: number | null) {
    this.setLoading(true);
    try {
      const userId = Number(this.user.id);
      const bugId = Number(this.bug.id);
      const response = await BugService.postComment({
        text,
        userId,
        bugId,
        parentId
      });
      await this.getBug(bugId);
      console.log(response);
      return response;
    } catch (e) {
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  }

  async updateComment(text: string, commentId: number) {
    this.setLoading(true);
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
    } finally {
      this.setLoading(false);
    }
  }

  async updateBug({
    key,
    newValue
  }: {
    key: keyof IBug | keyof IProject;
    newValue: string | string[] | Date | undefined | IUser[];
  }) {
    this.setLoading(true);
    try {
      const response = await BugService.updateBug({
        id: Number(this.bug.id),
        key: key,
        newValue
      });
      await this.getBug(this.bug.id);
      console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  }

  async deleteBug(id: number) {
    this.setLoading(true);
    try {
      const response = await BugService.deleteBug(id);
      await this.getUserProjects();
      console.log(response);
    } catch (e) {
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getViewers() {
    this.setLoading(true);
    try {
      const response = await UserService.getUsers();
      this.setUsers(response.data);
    } catch (e: unknown) {
      console.error(e);
    } finally {
      this.setLoading(false);
    }
  }
}
