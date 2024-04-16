import { defineStore } from "pinia";

import {
  getAllSuppliers,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "@/services/supplier.service";

export const supplierStore = defineStore("supplier", {
  state: () => ({
    suppliers: [],
  }),

  actions: {
    async getAllSuppliers() {
      const suppliers = await getAllSuppliers();
      this.suppliers = suppliers;
    },

    async createSupplier(data) {
      const supplier = await createSupplier(data);
      this.suppliers.push(supplier);
    },

    async updateSupplier(data) {
      const supplier = await updateSupplier(data);
      this.suppliers = this.suppliers.map((p) => {
        if (p.id === supplier.id) {
          p = supplier;
        }
        return p;
      });
    },

    async deleteSupplier(id) {
      await deleteSupplier(id);
      this.suppliers = this.suppliers.filter((p) => p.id !== id);
    },
  },
});
