<template>
  <div class="flex flex-col p-2 overflow-x-auto">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4 overflow-x-auto"
    >
      <h1 class="text-2xl font-semibold">Stock Transactions</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-4"
        @click="openAddModal"
      >
        Add Transaction
      </button>
    </div>
    <table class="w-full mt-4 border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left border-b border-gray-200">
            Transaction Date
          </th>
          <th class="p-3 text-left border-b border-gray-200">Type</th>
          <th class="p-3 text-left border-b border-gray-200">Quantity</th>
          <th class="p-3 text-left border-b border-gray-200">Product</th>
          <th class="p-3 text-left border-b border-gray-200">Remarks</th>
          <th class="p-3 text-left border-b border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="transaction in transactionsStore.stockTransactions"
          :key="transaction.id"
          class="hover:bg-gray-50"
        >
          <td class="p-3 border-b border-gray-200">
            {{ new Date(transaction.transaction_date).toDateString() }}
          </td>
          <td class="p-3 border-b border-gray-200">{{ transaction.type }}</td>
          <td class="p-3 border-b border-gray-200">
            {{ transaction.quantity }}
          </td>
          <td class="p-3 border-b border-gray-200">
            {{
              productsStore.products.find(
                (product) => product.id === transaction.product_id
              ).name
            }}
          </td>
          <td class="p-3 border-b border-gray-200">
            {{ transaction.remarks }}
          </td>
          <td class="p-3 border-b border-gray-200">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
              @click="openEditModal(transaction.id)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              @click="toggleDeleteModal(transaction.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex flex-col gap-4 mt-4">
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold mr-2">Page {{ page }}</span>
        <span class="text-lg font-bold mr-2"
          >Total Pages {{ transactionsStore.totalPages }}</span
        >
      </div>
      <div>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium"
          @click="onPreviousPage"
        >
          Previous Page
        </button>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium ml-2"
          @click="onNextPage"
        >
          Next Page
        </button>
      </div>
    </div>

    <Modal :modalActive="modalActive" @close-modal="toggleModal">
      <h1 class="text-2xl font-semibold">
        {{ isEditing ? "Edit Transaction" : "Add Transaction" }}
      </h1>
      <form class="mt-4" @submit.prevent="onSubmit">
        <div class="flex flex-col">
          <label for="transaction_date" class="text-sm font-medium"
            >Transaction Date</label
          >
          <input
            type="date"
            id="transaction_date"
            name="transaction_date"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-bind="transactionDateAttrs"
            v-on:change="handleDateChange"
          />
          <p
            v-if="errors.transaction_date"
            class="text-red-500 text-xs italic mt-1"
          >
            {{ errors.transaction_date }}
          </p>
        </div>

        <div class="flex flex-col mt-4">
          <label for="type" class="text-sm font-medium">Type</label>
          <select
            id="type"
            name="type"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-model="type"
            v-bind="typeAttrs"
          >
            <option value="in">In</option>
            <option value="out">Out</option>
          </select>
          <p v-if="errors.type" class="text-red-500 text-xs italic mt-1">
            {{ errors.type }}
          </p>
        </div>

        <div class="flex flex-col mt-4">
          <label for="quantity" class="text-sm font-medium">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-model="quantity"
            v-bind="quantityAttrs"
          />
          <p v-if="errors.quantity" class="text-red-500 text-xs italic mt-1">
            {{ errors.quantity }}
          </p>
        </div>

        <div class="flex flex-col mt-4">
          <label for="product_id" class="text-sm font-medium">Product</label>
          <select
            id="product_id"
            name="product_id"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-model="productId"
            v-bind="productIdAttrs"
          >
            <option
              v-for="product in productsStore.products"
              :key="product.id"
              :value="product.id"
            >
              {{ product.name }}
            </option>
          </select>
          <p v-if="errors.product_id" class="text-red-500 text-xs italic mt-1">
            {{ errors.product_id }}
          </p>
        </div>

        <div class="flex flex-col mt-4">
          <label for="remarks" class="text-sm font-medium">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-model="remarks"
            v-bind="remarksAttrs"
          ></textarea>
          <p v-if="errors.remarks" class="text-red-500 text-xs italic mt-1">
            {{ errors.remarks }}
          </p>
        </div>

        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-4"
        >
          Save
        </button>
      </form>
    </Modal>

    <Modal :modalActive="deleteModalActive" @close-modal="toggleDeleteModal">
      <h1>Are you sure you want to delete this Transaction?</h1>
      <div class="flex mt-4">
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
          @click="deleteTransaction"
        >
          Yes
        </button>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium"
          @click="toggleDeleteModal"
        >
          No
        </button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Modal from "@/components/Modal.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useToast } from "vue-toast-notification";

import { stockTransactionStore } from "@/stores/stockTransaction.store";
import { productStore } from "@/stores/product.store";

const transactionsStore = stockTransactionStore();
const productsStore = productStore();
const toast = useToast();
const transactions = ref([]);
const isEditing = ref(false);
const rowId = ref(null);
const modalActive = ref(false);
const deleteModalActive = ref(false);
const page = ref(1);

const openAddModal = () => {
  isEditing.value = false;
  toggleModal();
};

const openEditModal = (id) => {
  isEditing.value = true;
  rowId.value = id;
  toggleModal();
};

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      transaction_date: z.date(),
      type: z.string(),
      quantity: z.number().positive(),
      product_id: z.number(),
      remarks: z.string(),
    })
  ),
});

// Define fields for transaction form
const [transactionDate, transactionDateAttrs] = defineField("transaction_date");
const [type, typeAttrs] = defineField("type");
const [quantity, quantityAttrs] = defineField("quantity");
const [productId, productIdAttrs] = defineField("product_id");
const [remarks, remarksAttrs] = defineField("remarks");

const fetchTransactions = async () => {
  await transactionsStore.getAllStockTransactions(page.value, 2);
  await productsStore.getAllProducts();

  transactions.value = transactionsStore.stockTransactions;
};

const handleDateChange = (e) => {
  const date = e.target.value;

  transactionDate.value = new Date(date);
};

// Pagination methods
const onNextPage = () => {
  const totalPages = transactionsStore.totalPages;

  if (page.value < totalPages) {
    page.value += 1;
    fetchTransactions();
  }
};

const onPreviousPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    fetchTransactions();
  }
};

const onSubmit = handleSubmit(async (values) => {
  if (isEditing.value) {
    await transactionsStore.updateStockTransaction({
      id: rowId.value,
      ...values,
    });
    toast.success("Transaction updated successfully");
  } else {
    await transactionsStore.createStockTransaction(values);
    toast.success("Transaction created successfully");
  }

  await fetchTransactions();
  toggleModal();
});

const toggleDeleteModal = (id) => {
  rowId.value = id;
  deleteModalActive.value = !deleteModalActive.value;
};

const deleteTransaction = async () => {
  await transactionsStore.deleteStockTransaction(rowId.value);
  await fetchTransactions();
  toggleDeleteModal();
  toast.success("Transaction deleted successfully");
};

onMounted(async () => {
  await fetchTransactions();
});
</script>
