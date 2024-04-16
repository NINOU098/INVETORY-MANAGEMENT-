import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
} from "@/services/role.services";
import { defineStore } from "pinia";

export const roleStore = defineStore("role", {
  state: () => ({
    roles: [],
  }),

  actions: {
    async getAllRoles() {
      const roles = await getAllRoles();
      this.roles = roles;
    },

    async createRole(data) {
      const role = await createRole(data);
      this.roles.push(role);
    },

    async updateRole(data) {
      const role = await updateRole(data);
      this.roles = this.roles.map((r) => {
        if (r.id === role.id) {
          r = role;
        }
        return r;
      });
    },

    async deleteRole(id) {
      await deleteRole(id);
      this.roles = this.roles.filter((r) => r.id !== id);
    },
  },
});
