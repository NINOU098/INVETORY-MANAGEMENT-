import {
  getAllOrders,
  createOrder,
  deleteOrder,
  updateOrder,
} from "@/services/order.services";
import { defineStore } from "pinia";

export const orderStore = defineStore("order", {
  state: () => ({
    orders: [],
    totalPages: 0,
    totalCount: 0,
  }),

  actions: {
    async getAllOrders(page = 1, limit = 2) {
      const response = await getAllOrders(page, limit);
      this.orders = response.orders;
      this.totalPages = response.totalPages;
      this.totalCount = response.totalCount;
    },

    async createOrder(data) {
      const response = await createOrder(data);
      this.orders.push(response);
    },

    async updateOrder(data) {
      const response = await updateOrder(data);
      this.orders = this.orders.map((order) => {
        if (order.id === data.id) {
          order = data;
        }
        return order;
      });
    },

    async deleteOrder(id) {
      await deleteOrder(id);
      this.orders = this.orders.filter((order) => order.id !== id);
    },
  },
});
