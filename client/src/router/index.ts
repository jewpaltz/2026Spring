import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductList.vue'),
    },
    {
      path: '/admin/products',
      name: 'admin-products',
      component: () => import('../views/Admin/ProductList.vue'),
    },
    {
      path: '/admin/products/edit/:id?',
      name: 'admin-product-edit',
      component: () => import('../views/Admin/ProductEdit.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

export default router
