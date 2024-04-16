<template>
  <div class="flex items-center justify-center h-[90vh]">
    <div class="w-full md:w-1/3">
      <h1 class="text-2xl font-semibold mb-4 text-center">Log in</h1>
      <form
        @submit="onSubmit"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
          <label
            for="password"
            class="block text-gray-700 text-sm font-bold mb-2"
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
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { userStore } from "@/stores/user.store";
import { useToast } from "vue-toast-notification";

const usersStore = userStore();
const toast = useToast();

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().min(1).email(),
      password: z.string().min(6),
    })
  ),
});

const onSubmit = handleSubmit(async (values) => {
  await usersStore
    .loginUser(values)
    .then((res) => {
      toast.success("Logged in successfully");
      window.location.reload();
    })
    .catch((err) => {
      toast.error("Invalid credentials");
    });
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
</script>
