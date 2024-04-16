import {
  getAllStockTransactions,
  createStockTransaction,
  deleteStockTransaction,
  updateStockTransaction,
} from "@/services/stockTransaction.services";
import { defineStore } from "pinia";

export const stockTransactionStore = defineStore("stockTransactionStore", {
  state: () => ({
    stockTransactions: [],
    totalPages: 0,
    totalCount: 0,
  }),
  actions: {
    async getAllStockTransactions(page, limit) {
      const response = await getAllStockTransactions(page, limit);
      this.stockTransactions = response.stockTransactions;
      this.totalPages = response.totalPages;
      this.totalCount = response.totalCount;
    },

    async createStockTransaction(data) {
      const response = await createStockTransaction(data);
      this.stockTransactions.push(response);
    },
    async updateStockTransaction(data) {
      const response = await updateStockTransaction(data);
      this.stockTransactions = this.stockTransactions.map(
        (stockTransaction) => {
          if (stockTransaction.id === data.id) {
            stockTransaction = data;
          }
          return stockTransaction;
        }
      );
    },

    async deleteStockTransaction(id) {
      await deleteStockTransaction(id);
      this.stockTransactions = this.stockTransactions.filter(
        (stockTransaction) => stockTransaction.id !== id
      );
    },
  },
});
