<template>
  <div class="flex flex-col p-2">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4"
    >
      <h1 class="text-2xl font-semibold">Roles</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-4"
        @click="openAddModal"
      >
        Add Role
      </button>
    </div>
    <table class="w-full mt-4 border-collapse border border-gray-200">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left border-b border-gray-200">Name</th>
          <th class="p-3 text-left border-b border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id" class="hover:bg-gray-50">
          <td class="p-3 border-b border-gray-200">{{ role.name }}</td>
          <td class="p-3 border-b border-gray-200">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
              @click="openEditModal(role.id)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              @click="toggleDeleteModal(role.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Modal :modalActive="modalActive" @close-modal="toggleModal">
    <h1 class="text-2xl font-semibold">Add Role</h1>
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
      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-4"
      >
        Save
      </button>
    </form>
  </Modal>

  <Modal :modalActive="deleteModalActive" @close-modal="toggleDeleteModal">
    <h1>Are you sure you want to delete this Role ?</h1>
    <div class="flex mt-4">
      <button
        class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
        @click="deleteRole"
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
import { roleStore } from "@/stores/role.store";
import { onMounted, ref } from "vue";
import Modal from "@/components/Modal.vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const rolesStore = roleStore();
const roles = ref(rolesStore.roles);
const isEditing = ref(false);
const rowId = ref(null);
const modalActive = ref(null);
const deleteModalActive = ref(null);

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
      name: z.string().min(1),
    })
  ),
});

const [name, nameAttrs] = defineField("name");

const fetchRoles = async () => {
  await rolesStore.getAllRoles();
  roles.value = rolesStore.roles;
};

const onSubmit = handleSubmit(async (values) => {
  if (isEditing.value) {
    await rolesStore.updateRole({ id: rowId.value, ...values });
    toast.success("Role updated successfully");
  } else {
    await rolesStore.createRole(values);
    toast.success("Role created successfully");
  }

  await rolesStore.getAllRoles();
  toggleModal();
  await fetchRoles();
});

const toggleDeleteModal = (id) => {
  rowId.value = id;
  deleteModalActive.value = !deleteModalActive.value;
};

const deleteRole = async () => {
  await rolesStore.deleteRole(rowId.value);
  await fetchRoles();
  toggleDeleteModal();
  toast.success("Role deleted successfully");
};

onMounted(async () => {
  await fetchRoles();
});
</script>
