export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailConfirmed: boolean;
  confirmationLink: string;
  createdAt: string;
  updatedAt: string;
}
