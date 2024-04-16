import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Users from "@/views/Users.vue";
import { userStore } from "@/stores/user.store";
import Register from "@/views/Register.vue";
import Roles from "@/views/Roles.vue";
import Products from "@/views/Products.vue";
import Suppliers from "@/views/Suppliers.vue";
import Categories from "@/views/Categories.vue";
import Orders from "@/views/Orders.vue";
import StockTransaction from "@/views/StockTransaction.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        auth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        auth: false,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        auth: true,
      },
      children: [
        {
          path: "/dashboard/users",
          name: "Users",
          component: Users,
        },
        {
          path: "/dashboard/roles",
          name: "Roles",
          component: Roles,
        },
        {
          path: "/dashboard/products",
          name: "Products",
          component: Products,
        },
        {
          path: "/dashboard/suppliers",
          name: "Suppliers",
          component: Suppliers,
        },
        {
          path: "/dashboard/categories",
          name: "Categories",
          component: Categories,
        },

        {
          path: "/dashboard/orders",
          name: "Orders",
          component: Orders,
        },
        {
          path: "/dashboard/stock-transaction",
          name: "StockTransaction",
          component: () => StockTransaction,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from) => {
  const store = userStore();

  if (to.meta.auth) {
    if (!store.token) {
      return { name: "login" };
    }
  } else {
    if (store.token) {
      return { name: "dashboard" };
    }
  }
});

export default router;
