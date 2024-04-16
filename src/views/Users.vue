<template>
  <div class="flex flex-col p-2 overflow-x-auto">
    <div
      class="flex justify-between items-center border-b border-gray-200 pb-4"
    >
      <h1 class="text-2xl font-semibold">Users</h1>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mt-4"
        @click="openAddModal"
      >
        Add User
      </button>
    </div>
    <table
      class="w-full mt-4 border-collapse border border-gray-200 overflow-scroll overflow-x-scroll"
    >
      <thead>
        <tr class="bg-gray-100">
          <th class="p-3 text-left border-b border-gray-200">First Name</th>
          <th class="p-3 text-left border-b border-gray-200">Last Name</th>
          <th class="p-3 text-left border-b border-gray-200">Birth Date</th>
          <th class="p-3 text-left border-b border-gray-200">Phone Number</th>
          <th class="p-3 text-left border-b border-gray-200">Email</th>
          <th class="p-3 text-left border-b border-gray-200">Role</th>
          <th class="p-3 text-left border-b border-gray-200">Photo</th>
          <th class="p-3 text-left border-b border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
          <td class="p-3 border-b border-gray-200">{{ user.firstName }}</td>
          <td class="p-3 border-b border-gray-200">{{ user.lastName }}</td>
          <td class="p-3 border-b border-gray-200">{{ user.birthDate }}</td>
          <td class="p-3 border-b border-gray-200">{{ user.phoneNumber }}</td>
          <td class="p-3 border-b border-gray-200">{{ user.email }}</td>
          <td class="p-3 border-b border-gray-200">
            {{ rolesStore.roles.find((role) => role.id === user.role_id).name }}
          </td>
          <td class="p-3 border-b border-gray-200">
            <img
              :src="user.photoPath"
              alt="User Photo"
              class="w-10 h-10 rounded-full"
            />
          </td>
          <td class="p-3 border-b border-gray-200">
            <button
              class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
              @click="openEditModal(user.id)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
              @click="toggleDeleteModal(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <Modal :modalActive="modalActive" @close-modal="toggleModal">
    <form @submit="onSubmit">
      <div class="mb-4">
        <label
          for="firstName"
          class="block text-gray-700 text-sm font-bold mb-2"
          >First Name</label
        >
        <input
          type="text"
          id="firstName"
          name="firstName"
          v-model="firstName"
          v-bind="firstNameAttrs"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors.firstName" class="text-red-500 text-xs italic mt-1">
          {{ errors.firstName }}
        </p>
      </div>

      <div class="mb-4">
        <label for="lastName" class="block text-gray-700 text-sm font-bold mb-2"
          >Last Name</label
        >
        <input
          type="text"
          id="lastName"
          name="lastName"
          v-model="lastName"
          v-bind="lastNameAttrs"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors.lastName" class="text-red-500 text-xs italic mt-1">
          {{ errors.lastName }}
        </p>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
          >Email</label
        >
        <input
          type="email"
          id="email"
          name="email"
          v-model="email"
          v-bind="emailAttrs"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors.email" class="text-red-500 text-xs italic mt-1">
          {{ errors.email }}
        </p>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2"
          >Password</label
        >
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          v-bind="passwordAttrs"
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors.password" class="text-red-500 text-xs italic mt-1">
          {{ errors.password }}
        </p>
      </div>

      <div class="mb-4">
        <label
          for="birthDate"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Birth Date</label
        >
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          v-on:change="handleDateChange"
          v-bind="birthDateAttrs"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors.birthDate" class="text-red-500 text-xs italic mt-1">
          {{ errors.birthDate }}
        </p>
      </div>

      <div class="mb-4">
        <label
          for="phoneNumber"
          class="block text-gray-700 text-sm font-bold mb-2"
          >Phone Number</label
        >
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          v-model="phoneNumber"
          v-bind="phoneNumberAttrs"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors.phoneNumber" class="text-red-500 text-xs italic mt-1">
          {{ errors.phoneNumber }}
        </p>
      </div>

      <div class="mb-4">
        <label for="role" class="block text-gray-700 text-sm font-bold mb-2"
          >Role</label
        >
        <select
          id="role"
          name="role"
          v-model="role"
          v-bind="roleAttrs"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option
            v-for="role in rolesStore.roles"
            :key="role.id"
            :value="role.id"
          >
            {{ role.name }}
          </option>
        </select>
        <p v-if="errors.role" class="text-red-500 text-xs italic mt-1">
          {{ errors.role }}
        </p>
      </div>

      <div class="mb-4">
        <label for="photo" class="block text-gray-700 text-sm font-bold mb-2"
          >Photo</label
        >
        <input
          type="file"
          id="photo"
          accept="image/*"
          name="photo"
          v-on:change="handlePhotoChange"
          v-bind="photoAttrs"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <p v-if="errors.photo" class="text-red-500 text-xs italic mt-1">
          {{ errors.photo }}
        </p>
      </div>

      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create User
        </button>
      </div>
    </form>
  </Modal>

  <Modal :modalActive="deleteModalActive" @close-modal="toggleDeleteModal">
    <h1>Are you sure you want to delete this User?</h1>
    <div class="flex mt-4">
      <button
        class="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium mr-2"
        @click="deleteUser"
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
import { userStore } from "@/stores/user.store";
import { roleStore } from "@/stores/role.store";
import { uploadImage } from "@/services/image.services";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const users = ref([]);
const isEditing = ref(false);
const rowId = ref(null);
const modalActive = ref(false);
const deleteModalActive = ref(false);
const usersStore = userStore();
const rolesStore = roleStore();
const photoRef = ref(null);

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
      firstName: z.string(),
      lastName: z.string(),
      birthDate: z.date(),
      phoneNumber: z.string(),
      email: z.string().email("Invalid email"),
      password: z.string().min(6),
      role: z.number(),

      photo: z.object({
        name: z.string().min(1),
        type: z.string().min(1),
        size: z.number().min(1),
      }),
    })
  ),
});

const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");
const [birthDate, birthDateAttrs] = defineField("birthDate");
const [phoneNumber, phoneNumberAttrs] = defineField("phoneNumber");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [role, roleAttrs] = defineField("role");
const [photo, photoAttrs] = defineField("photo");

const fetchUsers = async () => {
  await usersStore.getAllUsers();
  users.value = usersStore.users;
};

const handlePhotoChange = async (e) => {
  const file = e.target.files[0];

  photo.value = file;
  photoRef.value = file;
};

const handleDateChange = (e) => {
  const date = e.target.value;

  birthDate.value = new Date(date);
};

const onSubmit = handleSubmit(async (values) => {
  const photoRes = await uploadImage(photoRef.value);

  values.photo = photoRes.url;
  values.role_id = role.value;

  // Submit user form data
  if (isEditing.value) {
    // Update user
    await usersStore.updateUser({ id: rowId.value, ...values });
    toast.success("User updated successfully");
  } else {
    // Create new user
    await usersStore.createUser(values);
    toast.success("User created successfully");
  }

  // Refresh user list
  await fetchUsers();
  toggleModal();
});

const toggleDeleteModal = (id) => {
  rowId.value = id;
  deleteModalActive.value = !deleteModalActive.value;
};

const deleteUser = async () => {
  // Delete user
  await usersStore.deleteUser(rowId.value);
  // Refresh user list
  await fetchUsers();
  toggleDeleteModal();
  toast.success("User deleted successfully");
};

onMounted(async () => {
  // Fetch users when component is mounted
  await fetchUsers();
  await rolesStore.getAllRoles();
});
</script>
