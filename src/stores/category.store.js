import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/services/category.services";
import { defineStore } from "pinia";

export const categoryStore = defineStore("category", {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getAllCategories() {
      const response = await getAllCategories();
      this.categories = response;
    },
    async createCategory(category) {
      const response = await createCategory(category);
      this.categories.push(response);
    },
    async updateCategory(category) {
      const response = updateCategory(category);
      const index = this.categories.findIndex((c) => c.id === response.id);
      this.categories[index] = response;
    },
    async deleteCategory(id) {
      await deleteCategory(id);
      this.categories = this.categories.filter((c) => c.id !== id);
    },
  },
});
