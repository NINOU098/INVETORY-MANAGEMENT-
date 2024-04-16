<template>
  <div class="flex flex-col p-2">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4"
    >
      <h1 class="text-2xl font-semibold">Suppliers</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-4"
        @click="openAddModal"
      >
        Add Supplier
      </button>
    </div>
    <table class="w-full mt-4 border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left border-b border-gray-200">Name</th>
          <th class="p-3 text-left border-b border-gray-200">Phone</th>
          <th class="p-3 text-left border-b border-gray-200">Email</th>
          <th class="p-3 text-left border-b border-gray-200">Address</th>
          <th class="p-3 text-left border-b border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="supplier in suppliers"
          :key="supplier.id"
          class="hover:bg-gray-50"
        >
          <td class="p-3 border-b border-gray-200">{{ supplier.name }}</td>
          <td class="p-3 border-b border-gray-200">{{ supplier.phone }}</td>
          <td class="p-3 border-b border-gray-200">{{ supplier.email }}</td>
          <td class="p-3 border-b border-gray-200">{{ supplier.address }}</td>
          <td class="p-3 border-b border-gray-200">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
              @click="openEditModal(supplier.id)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              @click="toggleDeleteModal(supplier.id)"
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
      {{ isEditing ? "Edit Supplier" : "Add Supplier" }}
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
        <label for="phone" class="text-sm font-medium">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="phone"
          v-bind="phoneAttrs"
        />
        <p v-if="errors.phone" class="text-red-500 text-xs italic mt-1">
          {{ errors.phone }}
        </p>
      </div>
      <div class="flex flex-col mt-4">
        <label for="email" class="text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="email"
          v-bind="emailAttrs"
        />
        <p v-if="errors.email" class="text-red-500 text-xs italic mt-1">
          {{ errors.email }}
        </p>
      </div>
      <div class="flex flex-col mt-4">
        <label for="address" class="text-sm font-medium">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          class="border border-gray-200 rounded-md p-2 mt-2"
          v-model="address"
          v-bind="addressAttrs"
        />
        <p v-if="errors.address" class="text-red-500 text-xs italic mt-1">
          {{ errors.address }}
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
    <h1>Are you sure you want to delete this Supplier?</h1>
    <div class="flex mt-4">
      <button
        class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
        @click="deleteSupplier"
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

import { supplierStore } from "@/stores/supplier.store";

const suppliersStore = supplierStore();
const toast = useToast();
const suppliers = ref([]);
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
      name: z.string(),
      phone: z.string(),
      email: z.string().email(),
      address: z.string(),
    })
  ),
});

// Define fields for supplier form
const [name, nameAttrs] = defineField("name");
const [phone, phoneAttrs] = defineField("phone");
const [email, emailAttrs] = defineField("email");
const [address, addressAttrs] = defineField("address");

const fetchSuppliers = async () => {
  await suppliersStore.getAllSuppliers();

  suppliers.value = suppliersStore.suppliers;
};

const onSubmit = handleSubmit(async (values) => {
  if (isEditing.value) {
    await suppliersStore.updateSupplier({ id: rowId.value, ...values });
    toast.success("Supplier updated successfully");
  } else {
    await suppliersStore.createSupplier(values);
    toast.success("Supplier created successfully");
  }

  await fetchSuppliers();
  toggleModal();
});

const toggleDeleteModal = (id) => {
  rowId.value = id;
  deleteModalActive.value = !deleteModalActive.value;
};

const deleteSupplier = async () => {
  await suppliersStore.deleteSupplier(rowId.value);
  await fetchSuppliers();
  toggleDeleteModal();
  toast.success("Supplier deleted successfully");
};

onMounted(async () => {
  await fetchSuppliers();
});
</script>
