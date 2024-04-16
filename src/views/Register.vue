<template>
  <div class="flex items-center justify-center h-[90vh]">
    <div class="w-full md:w-1/3">
      <h1 class="text-2xl font-semibold mb-4 text-center">Create Account</h1>
      <form
        @submit="onSubmit"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
          <label
            for="lastName"
            class="block text-gray-700 text-sm font-bold mb-2"
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
            Sign up
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
import { registerUser } from "@/services/user.services";
import { ref } from "vue";
import { uploadImage } from "@/services/image.services";

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      birthDate: z.date(),
      phoneNumber: z.string().min(1),
      photo: z.object({
        name: z.string().min(1),
        type: z.string().min(1),
        size: z.number().min(1),
      }),
      email: z.string().min(1).email(),
      password: z.string().min(6),
    })
  ),
});
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [firstName, firstNameAttrs] = defineField("firstName");
const [lastName, lastNameAttrs] = defineField("lastName");
const [birthDate, birthDateAttrs] = defineField("birthDate");
const [phoneNumber, phoneNumberAttrs] = defineField("phoneNumber");
const [photo, photoAttrs] = defineField("photo");

const photoRef = ref(null);

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

  const res = await registerUser({
    ...values,
    photo: photoRes.url,
  });

  if (res.status === 201) {
    window.location.href = "/login";
  }
});
</script>
