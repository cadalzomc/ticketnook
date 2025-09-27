import type { TRole } from "~/types/app.types";

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  number: string;
  email: string;
  password: string;
  role: TRole;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IAuthState {
  user: IUser | null;
  isLoggedIn: boolean;
}
