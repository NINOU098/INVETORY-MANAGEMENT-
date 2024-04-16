<template>
  <div class="flex flex-col p-2">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4"
    >
      <h1 class="text-2xl font-semibold">Categories</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-4"
        @click="openAddModal"
      >
        Add Category
      </button>
    </div>
    <table class="w-full mt-4 border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left border-b border-gray-200">Category Name</th>
          <th class="p-3 text-left border-b border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.id"
          class="hover:bg-gray-50"
        >
          <td class="p-3 border-b border-gray-200">
            {{ category.category_name }}
          </td>
          <td class="p-3 border-b border-gray-200">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
              @click="openEditModal(category.id)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              @click="toggleDeleteModal(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Modal :modalActive="modalActive" @close-modal="toggleModal">
    <h1 class="text-2xl font-semibold">
      {{ isEditing ? "Edit Category" : "Add Category" }}
    </h1>
    <form class="mt-4" @submit.prevent="onSubmit">
      <div class="flex flex-col">
        <label for="category_name" class="text-sm font-medium"
          >Category Name</label
        >
        <input
          type="text"
          id="category_name"
          name="category_name"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="categoryName"
          v-bind="categoryNameAttrs"
        />
        <p v-if="errors.category_name" class="text-red-500 text-xs italic mt-1">
          {{ errors.category_name }}
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
    <h1>Are you sure you want to delete this Category?</h1>
    <div class="flex mt-4">
      <button
        class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
        @click="deleteCategory"
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

import { categoryStore } from "@/stores/category.store";

const categoriesStore = categoryStore();
const toast = useToast();
const categories = ref([]);
const isEditing = ref(false);
const rowId = ref(null);
const modalActive = ref(false);
const deleteModalActive = ref(false);

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
      category_name: z.string(),
    })
  ),
});

// Define fields for category form
const [categoryName, categoryNameAttrs] = defineField("category_name");

const fetchCategories = async () => {
  await categoriesStore.getAllCategories();
  categories.value = categoriesStore.categories;
};

const onSubmit = handleSubmit(async (values) => {
  if (isEditing.value) {
    await categoriesStore.updateCategory({ id: rowId.value, ...values });
    toast.success("Category updated successfully");
  } else {
    await categoriesStore.createCategory(values);
    toast.success("Category created successfully");
  }

  await fetchCategories();
  toggleModal();
});

const toggleDeleteModal = (id) => {
  rowId.value = id;
  deleteModalActive.value = !deleteModalActive.value;
};

const deleteCategory = async () => {
  await categoriesStore.deleteCategory(rowId.value);
  await fetchCategories();
  toggleDeleteModal();
  toast.success("Category deleted successfully");
};

onMounted(async () => {
  await fetchCategories();
});
</script>
