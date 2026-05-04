import { createBrowserRouter } from 'react-router-dom'
import HomeView from '../views/HomeView'
import AboutView from '../views/AboutView'

const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('../App').then((m) => ({ Component: m.default })),
    children: [
      {
        index: true,
        Component: HomeView,
      },
      {
        path: 'products',
        lazy: () => import('../views/ProductList').then((m) => ({ Component: m.default })),
      },
      {
        path: 'calendar',
        lazy: () => import('../views/CalendarEventList').then((m) => ({ Component: m.default })),
      },
      {
        path: 'admin/products',
        lazy: () => import('../views/Admin/ProductList').then((m) => ({ Component: m.default })),
      },
      {
        path: 'admin/products/edit/:id?',
        lazy: () => import('../views/Admin/ProductEdit').then((m) => ({ Component: m.default })),
      },
      {
        path: 'admin/users',
        lazy: () => import('../views/Admin/UserList').then((m) => ({ Component: m.default })),
      },
      {
        path: 'admin/users/edit/:id?',
        lazy: () => import('../views/Admin/UserEdit').then((m) => ({ Component: m.default })),
      },
      {
        path: 'about',
        Component: AboutView,
      },
    ],
  },
])

export default router
