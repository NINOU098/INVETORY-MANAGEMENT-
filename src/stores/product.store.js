import {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/services/product.service";
import { defineStore } from "pinia";

export const productStore = defineStore("product", {
  state: () => ({
    products: [],
    totalPages: 0,
    totalCount: 0,
  }),

  actions: {
    async getAllProducts(page = 1, perPage = 2) {
      const products = await getAllProducts(page, perPage);
      this.products = products.products;
      this.totalPages = products.totalPages;
      this.totalCount = products.totalCount;
    },

    async createProduct(data) {
      const product = await createProduct(data);
      this.products.push(product);
    },

    async updateProduct(data) {
      const product = await updateProduct(data);
      this.products = this.products.map((p) => {
        if (p.id === product.id) {
          p = product;
        }
        return p;
      });
    },

    async deleteProduct(id) {
      await deleteProduct(id);
      this.products = this.products.filter((p) => p.id !== id);
    },
  },
});
