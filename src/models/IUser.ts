export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  email_confirmed: boolean;
  confirmation_link: string;
  created_at: string;
  updated_at: string;
}
