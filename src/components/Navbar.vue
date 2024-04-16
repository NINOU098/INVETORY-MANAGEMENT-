<script setup>
import { userStore } from "@/stores/user.store";

const { user, token, logoutUser } = userStore();

const logout = () => {
  logoutUser();
};
</script>

<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <!-- Logo -->
            <img
              class="block lg:hidden h-8 w-auto cursor-pointer"
              src="@/assets/logo.svg"
              alt="Logo"
              onclick="location.href='/'"
            />
            <img
              class="hidden lg:block h-8 w-auto cursor-pointer"
              src="@/assets/logo.svg"
              alt="Logo"
              onclick="location.href='/'"
            />
          </div>
        </div>
        <div class="flex items-center" v-if="token">
          <div class="ml-4 flex items-center md:ml-6">
            <div class="flex items-center cursor-pointer" v-if="token">
              <img class="h-8 w-8 rounded-full" :src="user.photoPath" />
              <span class="text-white ml-2">{{ user.firstName }}</span>
            </div>
            <button
              class="ml-3 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              @click="logout"
            >
              Log out
            </button>
          </div>
        </div>
        <div class="flex items-center" v-if="!token">
          <div class="ml-4 flex items-center md:ml-6">
            <button
              class="bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              onclick="location.href='/login'"
            >
              Log in
            </button>
            <button
              class="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              onclick="location.href='/register'"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
