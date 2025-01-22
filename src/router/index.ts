import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/pos',
          name: 'pos',
          component: HomeView,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'inventory',
          name: 'inventory',
          component: () => import('../views/stock/InventoryView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'inventory/input',
          name: 'inventory-input',
          component: () => import('../views/stock/InputInventoryView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('../views/product/MenuView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/product/CategoryView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/auth/LoginView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  }
  if (to.name === 'dashboard') next('/pos')
  next()
})

export default router
