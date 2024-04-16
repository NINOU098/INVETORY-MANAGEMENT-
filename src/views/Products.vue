<template>
  <div class="flex flex-col p-2 overflow-x-auto">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4 overflow-x-auto"
    >
      <h1 class="text-2xl font-semibold">Products</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-4"
        @click="openAddModal"
      >
        Add Product
      </button>
    </div>
    <table class="w-full mt-4 border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left border-b border-gray-200">Name</th>
          <th class="p-3 text-left border-b border-gray-200">Description</th>
          <th class="p-3 text-left border-b border-gray-200">Price</th>
          <th class="p-3 text-left border-b border-gray-200">
            Quantity Available
          </th>
          <th class="p-3 text-left border-b border-gray-200">Supplier</th>
          <th class="p-3 text-left border-b border-gray-200">Category</th>
          <th class="p-3 text-left border-b border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in products"
          :key="product.id"
          class="hover:bg-gray-50"
        >
          <td class="p-3 border-b border-gray-200">{{ product.name }}</td>
          <td class="p-3 border-b border-gray-200">
            {{ product.description }}
          </td>
          <td class="p-3 border-b border-gray-200">{{ product.price }}</td>
          <td class="p-3 border-b border-gray-200">
            {{ product.quantity_available }}
          </td>
          <td class="p-3 border-b border-gray-200">
            {{
              suppliers.find((supplier) => supplier.id === product.supplier_id)
                .name
            }}
          </td>
          <td class="p-3 border-b border-gray-200">
            {{
              categories.find((category) => category.id === product.category_id)
                .category_name
            }}
          </td>
          <td class="p-3 border-b border-gray-200">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
              @click="openEditModal(product.id)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              @click="toggleDeleteModal(product.id)"
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
          >Total Pages {{ productsStore.totalPages }}</span
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
  </div>

  <Modal :modalActive="modalActive" @close-modal="toggleModal">
    <h1 class="text-2xl font-semibold">
      {{ isEditing ? "Edit Product" : "Add Product" }}
    </h1>
    <form class="mt-4" @submit.prevent="onSubmit">
      <div class="flex flex-col">
        <label for="name" class="text-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="name"
          v-bind="nameAttrs"
        />
        <p v-if="errors.name" class="text-red-500 text-xs italic mt-1">
          {{ errors.name }}
        </p>
      </div>
      <div class="flex flex-col mt-4">
        <label for="description" class="text-sm font-medium">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="description"
          v-bind="descriptionAttrs"
        />
        <p v-if="errors.description" class="text-red-500 text-xs italic mt-1">
          {{ errors.description }}
        </p>
      </div>
      <div class="flex flex-col mt-4">
        <label for="price" class="text-sm font-medium">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="price"
          v-bind="priceAttrs"
        />
        <p v-if="errors.price" class="text-red-500 text-xs italic mt-1">
          {{ errors.price }}
        </p>
      </div>
      <div class="flex flex-col mt-4">
        <label for="quantity_available" class="text-sm font-medium"
          >Quantity Available</label
        >
        <input
          type="number"
          id="quantity_available"
          name="quantity_available"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="quantityAvailable"
          v-bind="quantityAvailableAttrs"
        />
        <p
          v-if="errors.quantity_available"
          class="text-red-500 text-xs italic mt-1"
        >
          {{ errors.quantity_available }}
        </p>
      </div>
      <div class="flex flex-col mt-4">
        <label for="supplier_id" class="text-sm font-medium">Supplier ID</label>
        <select
          id="supplier_id"
          name="supplier_id"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="supplierId"
          v-bind="supplierIdAttrs"
        >
          <option value="" disabled>Select Supplier</option>
          <option
            v-for="supplier in suppliers"
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

      <div class="flex flex-col mt-4">
        <label for="category_id" class="text-sm font-medium">Category ID</label>
        <select
          id="category_id"
          name="category_id"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="categoryId"
          v-bind="categoryIdAttrs"
        >
          <option value="" disabled>Select Category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.category_name }}
          </option>
        </select>
        <p v-if="errors.category_id" class="text-red-500 text-xs italic mt-1">
          {{ errors.category_id }}
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
    <h1>Are you sure you want to delete this Product?</h1>
    <div class="flex mt-4">
      <button
        class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
        @click="deleteProduct"
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
</template>

<script setup>
import { onMounted, ref } from "vue";
import Modal from "@/components/Modal.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useToast } from "vue-toast-notification";

import { productStore } from "@/stores/product.store";
import { supplierStore } from "@/stores/supplier.store";
import { categoryStore } from "@/stores/category.store";

const productsStore = productStore();
const suppliersStore = supplierStore();
const categoriesStore = categoryStore();
const categories = ref([]);
const suppliers = ref([]);
const toast = useToast();
const products = ref([]);
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
      name: z.string(),
      description: z.string(),
      price: z.number(),
      quantity_available: z.number(),
      supplier_id: z.number(),
      category_id: z.number(),
    })
  ),
});

// Define fields for product form
const [name, nameAttrs] = defineField("name");
const [description, descriptionAttrs] = defineField("description");
const [price, priceAttrs] = defineField("price");
const [quantityAvailable, quantityAvailableAttrs] =
  defineField("quantity_available");
const [supplierId, supplierIdAttrs] = defineField("supplier_id");
const [categoryId, categoryIdAttrs] = defineField("category_id");

const fetchProducts = async () => {
  await productsStore.getAllProducts(page.value, 2);
  await suppliersStore.getAllSuppliers();
  await categoriesStore.getAllCategories();

  categories.value = categoriesStore.categories;
  suppliers.value = suppliersStore.suppliers;

  products.value = productsStore.products;
};

const onNextPage = () => {
  const totalPages = productsStore.totalPages;

  if (page.value < totalPages) {
    page.value += 1;
    fetchProducts();
  }
};

const onPreviousPage = () => {
  if (page.value > 1) {
    page.value -= 1;
    fetchProducts();
  }
};

const onSubmit = handleSubmit(async (values) => {
  if (isEditing.value) {
    await productsStore.updateProduct({ id: rowId.value, ...values });
    toast.success("Product updated successfully");
  } else {
    await productsStore.createProduct(values);
    toast.success("Product created successfully");
  }

  await fetchProducts();
  toggleModal();
});

const toggleDeleteModal = (id) => {
  rowId.value = id;
  deleteModalActive.value = !deleteModalActive.value;
};

const deleteProduct = async () => {
  await productsStore.deleteProduct(rowId.value);
  await fetchProducts();
  toggleDeleteModal();
  toast.success("Product deleted successfully");
};

onMounted(async () => {
  await fetchProducts();
});
</script>
