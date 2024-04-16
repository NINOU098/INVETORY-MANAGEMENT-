<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container mx-auto py-12">
    <div
      class="text-center mb-8 min-h-[70vh] flex items-center flex-col md:flex-row"
    >
      <div class="flex-1 text-center">
        <h1 class="text-3xl font-semibold">
          <span class="text-indigo-500">Inventory Management</span> for Products
          , Suppliers, and More
        </h1>
        <RouterLink to="/login">
          <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Get Started
          </button>
        </RouterLink>
      </div>
      <img
        src="@/assets/stock.webp"
        alt="Inventory Management"
        class="w-full md:w-3/2 mx-auto mt-8 flex-1 rounded-md"
      />
    </div>
    <h1 class="text-2xl font-semibold text-center mb-8">
      Features of Our Inventory Management System
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Product Management Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Product Management</h2>
        <p class="text-gray-700">
          Easily add, edit, and delete products from your inventory.
        </p>
        <!-- Add more features or details here -->
      </div>

      <!-- Supplier Management Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Supplier Management</h2>
        <p class="text-gray-700">
          Keep track of your suppliers and manage your relationships with them.
        </p>
        <!-- Add more features or details here -->
      </div>

      <!-- Inventory Tracking Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Inventory Tracking</h2>
        <p class="text-gray-700">
          Monitor your inventory levels in real-time and prevent stockouts.
        </p>
        <!-- Add more features or details here -->
      </div>

      <!-- Order Management Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Order Management</h2>
        <p class="text-gray-700">
          Streamline your order fulfillment process and manage incoming orders
          efficiently.
        </p>
        <!-- Add more features or details here -->
      </div>

      <!-- Analytics and Reporting Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Analytics and Reporting</h2>
        <p class="text-gray-700">
          Gain insights into your inventory performance with comprehensive
          analytics.
        </p>
        <!-- Add more features or details here -->
      </div>

      <!-- User-Friendly Interface Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">User-Friendly Interface</h2>
        <p class="text-gray-700">
          Enjoy an intuitive and user-friendly interface designed for ease of
          use.
        </p>
        <!-- Add more features or details here -->
      </div>

      <!-- Mobile Compatibility Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Mobile Compatibility</h2>
        <p class="text-gray-700">
          Access your inventory management system from anywhere, anytime with
          mobile compatibility.
        </p>
        <!-- Add more features or details here -->
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto text-center">
      <p>&copy; 2024 Inventory System. All rights reserved.</p>
    </div>
  </footer>
</template>
