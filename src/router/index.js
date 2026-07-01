import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  { path: '/', name: 'inicio', component: HomeView, meta: { title: 'Inicio' } },
  { path: '/productos', name: 'productos', component: ProductsView, meta: { title: 'Productos' } },
  { path: '/contacto', name: 'contacto', component: ContactView, meta: { title: 'Contacto' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Cada cambio de pantalla arranca arriba de todo
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta?.title
    ? `El Billarista | ${to.meta.title}`
    : 'El Billarista | Mesas de Pool'
})

export default router
