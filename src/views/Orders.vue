<template>
  <div class="flex flex-col p-2 overflow-x-auto">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4 overflow-x-auto"
    >
      <h1 class="text-2xl font-semibold">Orders</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-4"
        @click="openAddModal"
      >
        Add Order
      </button>
    </div>
    <table class="w-full mt-4 border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left border-b border-gray-200">Order Date</th>
          <th class="p-3 text-left border-b border-gray-200">Status</th>
          <th class="p-3 text-left border-b border-gray-200">Total Amount</th>
          <th class="p-3 text-left border-b border-gray-200">Product</th>
          <th class="p-3 text-left border-b border-gray-200">User</th>
          <th class="p-3 text-left border-b border-gray-200">Supplier</th>
          <th class="p-3 text-left border-b border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="hover:bg-gray-50">
          <td class="p-3 border-b border-gray-200">
            {{ new Date(order.order_date).toDateString() }}
          </td>
          <td class="p-3 border-b border-gray-200">{{ order.status }}</td>
          <td class="p-3 border-b border-gray-200">{{ order.total_amount }}</td>
          <td class="p-3 border-b border-gray-200">
            {{
              productsStore.products.find(
                (product) => product.id === order.product_id
              ).name
            }}
          </td>
          <td class="p-3 border-b border-gray-200">
            {{
              usersStore.users.find((user) => user.id === order.user_id)
                .firstName +
              " " +
              usersStore.users.find((user) => user.id === order.user_id)
                .lastName
            }}
          </td>
          <td class="p-3 border-b border-gray-200">
            {{
              suppliersStore.suppliers.find(
                (supplier) => supplier.id === order.supplier_id
              ).name
            }}
          </td>
          <td class="p-3 border-b border-gray-200">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
              @click="openEditModal(order.id)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              @click="toggleDeleteModal(order.id)"
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
          >Total Pages {{ ordersStore.totalPages }}</span
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
        {{ isEditing ? "Edit Order" : "Add Order" }}
      </h1>
      <form class="mt-4" @submit.prevent="onSubmit">
        <div class="flex flex-col">
          <label for="order_date" class="text-sm font-medium">Order Date</label>
          <input
            type="date"
            id="order_date"
            name="order_date"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-bind="orderDateAttrs"
            v-on:change="handleDateChange"
          />
          <p v-if="errors.order_date" class="text-red-500 text-xs italic mt-1">
            {{ errors.order_date }}
          </p>
        </div>

        <div class="flex flex-col mt-4">
          <label for="status" class="text-sm font-medium"> Status </label>
          <select
            id="status"
            name="status"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-model="status"
            v-bind="statusAttrs"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <p v-if="errors.status" class="text-red-500 text-xs italic mt-1">
            {{ errors.status }}
          </p>
        </div>

        <div class="flex flex-col mt-4">
          <label for="total_amount" class="text-sm font-medium"
            >Total Amount</label
          >
          <input
            type="number"
            id="total_amount"
            name="total_amount"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-model="totalAmount"
            v-bind="totalAmountAttrs"
          />
          <p
            v-if="errors.total_amount"
            class="text-red-500 text-xs italic mt-1"
          >
            {{ errors.total_amount }}
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
          <label for="user_id" class="text-sm font-medium">User</label>
          <select
            id="user_id"
            name="user_id"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-model="userId"
            v-bind="userIdAttrs"
          >
            <option
              v-for="user in usersStore.users"
              :key="user.id"
              :value="user.id"
            >
              {{ user.firstName + " " + user.lastName }}
            </option>
          </select>
          <p v-if="errors.user_id" class="text-red-500 text-xs italic mt-1">
            {{ errors.user_id }}
          </p>
        </div>

        <div class="flex flex-col mt-4">
          <label for="supplier_id" class="text-sm font-medium">Supplier</label>
          <select
            id="supplier_id"
            name="supplier_id"
            class="border border-gray-200 rounded-md p-2 mt-2"
            v-model="supplierId"
            v-bind="supplierIdAttrs"
          >
            <option
              v-for="supplier in suppliersStore.suppliers"
              :key="supplier.id"
              :value="supplier.id"
            >
              {{ supplier.name }}
            </option>
          </select>
          <p v-if="errors.supplier_id" class="text-red-500 text-xs italic mt-1">
            {{ errors.supplier_id }}
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
      <h1>Are you sure you want to delete this Order?</h1>
      <div class="flex mt-4">
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
          @click="deleteOrder"
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

import { orderStore } from "@/stores/order.store";
import { userStore } from "@/stores/user.store";
import { productStore } from "@/stores/product.store";
import { supplierStore } from "@/stores/supplier.store";

const ordersStore = orderStore();
const usersStore = userStore();
const productsStore = productStore();
const suppliersStore = supplierStore();
const toast = useToast();
const orders = ref([]);
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
      order_date: z.date(),
      status: z.string(),
      total_amount: z.number(),
      product_id: z.number(),
      user_id: z.number(),
      supplier_id: z.number(),
    })
  ),
});

// Define fields for order form
const [order_date, orderDateAttrs] = defineField("order_date");
const [status, statusAttrs] = defineField("status");
const [totalAmount, totalAmountAttrs] = defineField("total_amount");
const [productId, productIdAttrs] = defineField("product_id");
const [userId, userIdAttrs] = defineField("user_id");
const [supplierId, supplierIdAttrs] = defineField("supplier_id");

const fetchOrders = async () => {
  await ordersStore.getAllOrders(page.value, 2);
  await usersStore.getAllUsers();
  await productsStore.getAllProducts();
  await suppliersStore.getAllSuppliers();

  orders.value = ordersStore.orders;
};

const handleDateChange = (e) => {
  const date = e.target.value;

  order_date.value = new Date(date);
};

// Pagination methods
const onNextPage = () => {
  const totalPages = ordersStore.totalPages;

  if (page.value < totalPages) {
    page.value += 1;
    fetchOrders();
  }
};

const onPreviousPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    fetchOrders();
  }
};

const onSubmit = handleSubmit(async (values) => {
  if (isEditing.value) {
    await ordersStore.updateOrder({ id: rowId.value, ...values });
    toast.success("Order updated successfully");
  } else {
    await ordersStore.createOrder(values);
    toast.success("Order created successfully");
  }

  await fetchOrders();
  toggleModal();
});

const toggleDeleteModal = (id) => {
  rowId.value = id;
  deleteModalActive.value = !deleteModalActive.value;
};

const deleteOrder = async () => {
  await ordersStore.deleteOrder(rowId.value);
  await fetchOrders();
  toggleDeleteModal();
  toast.success("Order deleted successfully");
};

onMounted(async () => {
  await fetchOrders();
});
</script>
