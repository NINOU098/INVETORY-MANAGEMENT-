import axiosInstance from "@/config/axios";
import {
  getAllRoles,
  createRole,
  deleteRole,
  updateRole,
} from "@/services/role.services";
import {
  loginUser,
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
  getLoggedUser,
} from "@/services/user.services";
import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => ({
    user: null,
    users: [],
    token: "",
  }),
  actions: {
    async loginUser(data) {
      const res = await loginUser(data);
      this.token = res.token;

      const me = await getLoggedUser(res.token);
      this.user = me;
    },

    async logoutUser() {
      this.user = {};
      this.token = "";
      window.location.reload();
    },

    async getAllUsers() {
      const users = await getUsers();
      this.users = users;
    },

    async updateUser(data) {
      const user = await updateUser(data);
      //update the user in the users array
      this.users = this.users.map((u) => {
        if (u.id === user.id) {
          u = data;
          return user;
        }
        return u;
      });
    },

    async createUser(data) {
      const user = await createUser(data);
      this.users.push(user);
    },

    async deleteUser(id) {
      await deleteUser(id);
      this.users = this.users.filter((u) => u.id !== id);
    },
  },
  persist: {
    paths: ["token", "user"],
  },
});
