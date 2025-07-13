import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import CreateBook from '@/views/CreateBook.vue'
import EditBook from '@/views/EditBook.vue'
import HistoryBook from '@/views/HistoryBook.vue'
import BorrowBook from '@/views/BorrowBook.vue'
// import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/book/create',
    component: CreateBook,
    meta: { requiresAuth: true },
  },
  {
    path: '/book/edit/:id',
    component: EditBook,
    meta: { requiresAuth: true },
  },
  {
    path: '/history',
    component: HistoryBook,
    meta: { requiresAuth: true },
  },
  {
    path: '/borrow',
    component: BorrowBook,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Proteksi rute
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
