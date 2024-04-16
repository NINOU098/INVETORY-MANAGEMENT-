<template>
  <div class="flex">
    <!-- Fixed Sidebar -->
    <div class="w-1/5 bg-gray-800 h-screen sticky top-0">
      <div class="p-0 md:p-4">
        <h1 class="hidden md:block text-white text-2xl font-semibold">
          Dashboard
        </h1>

        <ul class="mt-6">
          <li v-for="link in DashboardLinks" :key="link.name" class="my-4">
            <router-link
              :to="'/dashboard' + link.path"
              :class="[
                'flex py-4 px-4 hover:bg-white text-black hover:text-black rounded-md',
                { 'bg-white text-black': isCurrentPath(link.path) },
              ]"
            >
              <component :is="link.icon" class="mr-2 h-5 w-5" />
              <p class="hidden md:block">{{ link.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="w-4/5 ml-auto">
      <h1
        class="text-4xl mt-4 font-semibold text-center"
        v-if="route.path === '/dashboard/'"
      >
        Welcome to Dashboard
      </h1>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import {
  CaUserMultiple,
  MdProductionQuantityLimits,
  BxCategory,
  CaScisTransparentSupply,
  CaUserRole,
  CaBorderFull,
  UnTransaction,
} from "@kalimahapps/vue-icons";

const route = useRoute();

const DashboardLinks = [
  { name: "Users", path: "/users", icon: CaUserMultiple },
  { name: "Roles", path: "/roles", icon: CaUserRole },
  { name: "Products", path: "/products", icon: MdProductionQuantityLimits },
  { name: "Suppliers", path: "/suppliers", icon: CaScisTransparentSupply },
  { name: "Categories", path: "/categories", icon: BxCategory },
  { name: "Orders", path: "/orders", icon: CaBorderFull },
  {
    name: "StockTransaction",
    path: "/stock-transaction",
    icon: UnTransaction,
  },
];

const isCurrentPath = (path) => {
  return route.path === `/dashboard${path}`;
};
</script>
