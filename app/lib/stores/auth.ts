import { defineStore } from "pinia";
import type { IAuthState, IUser } from "../models";

const staticUsers: IUser[] = [
  {
    id: "1",
    firstname: "Admin",
    lastname: "User",
    username: "admin",
    number: "1234567890",
    email: "admin@cinemahub.com",
    password: "admin123",
    role: "admin",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    firstname: "John",
    lastname: "Doe",
    number: "9876543210",
    username: "john_doe",
    email: "john@example.com",
    password: "user123",
    role: "user",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    firstname: "Jane",
    lastname: "Smith",
    number: "5555555555",
    username: "jane_smith",
    email: "jane@example.com",
    password: "user123",
    role: "user",
    createdAt: new Date("2024-02-01"),
  },
];

export const useAuthStore = defineStore("auth", {
  state: (): IAuthState => ({
    user: null,
    isLoggedIn: false,
  }),

  getters: {
    isAdmin: (state) => state.user?.role === "admin",
    currentUser: (state) => state.user,
  },

  actions: {
    login(username: string, password: string): boolean {
      const user = staticUsers.find(
        (u) =>
          (u.username === username || u.email === username) &&
          u.password === password
      );

      return false;
    },

    register(username: string, email: string, password: string): boolean {
      const existingUser = staticUsers.find(
        (u) => u.username === username || u.email === email
      );

      if (existingUser) {
        return false;
      }

      const newUser: IUser = {
        id: (staticUsers.length + 1).toString(),
        firstname: "",
        lastname: "",
        number: "",
        username,
        email,
        password,
        role: "user",
        createdAt: new Date(),
      };

      staticUsers.push(newUser);
      this.user = newUser;
      this.isLoggedIn = true;

      return true;
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;
    },

    initializeAuth() {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          this.user = JSON.parse(storedUser);
          this.isLoggedIn = true;
        } catch (e) {
          localStorage.removeItem("user");
        }
      }
    },

    getAllUsers(): IUser[] {
      return staticUsers.map((user) => ({ ...user, password: "" }));
    },
  },
});
