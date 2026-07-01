<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const open = ref(false)

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Productos' },
  { to: '/contacto', label: 'Contacto' }
]

// En mobile el menú se teleporta al <body> (para que el blur tipo cristal
// tome el contenido de la página). En desktop NO se teleporta: queda dentro
// de la navbar como botonera en línea.
const isDesktop = ref(false)
let mq
const syncDesktop = (e) => {
  isDesktop.value = e.matches
  if (e.matches) open.value = false // al pasar a desktop, cerrar el panel mobile
}

onMounted(() => {
  mq = window.matchMedia('(min-width: 760px)')
  isDesktop.value = mq.matches
  mq.addEventListener('change', syncDesktop)
})
onUnmounted(() => mq && mq.removeEventListener('change', syncDesktop))

function toggle() {
  open.value = !open.value
}

// Al elegir una pantalla: cerrar el menú y navegar.
function go(to) {
  open.value = false
  router.push(to)
}
</script>

<template>
  <header class="barra">
    <nav class="nav">
      <!-- Logo a la izquierda -->
      <router-link to="/" class="logo-link" @click="open = false">
        <img class="logo" src="/img/logos/logo-Pooolpng.png" alt="El Billarista" />
      </router-link>

      <!-- Botón burger (tres líneas), ícono blanco -->
      <button
        class="nav-toggle"
        :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="open"
        @click="toggle"
      >
        <i :class="open ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>

      <!-- Menú de navegación.
           Mobile: se teleporta al <body> para que el blur tipo cristal
           tome el contenido de la página (si quedara anidado en .nav,
           que ya tiene backdrop-filter, el blur no funcionaría).
           Desktop: Teleport deshabilitado -> queda dentro de .nav como
           botonera en línea. -->
      <Teleport to="body" :disabled="isDesktop">
        <ul class="nav-menu" :class="{ 'nav-menu_visible': open }">
          <li v-for="link in links" :key="link.to" class="nav-menu-item">
            <a
              href="#"
              class="nav-menu-link nav-link"
              @click.prevent="go(link.to)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </Teleport>
    </nav>
  </header>
</template>

<style scoped>
/* Portado de css/nav.css y adaptado al tema oscuro mobile-first */
.barra {
  width: 100%;
  height: var(--nav-h);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.nav {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.92), rgba(0, 0, 0, 0.35));
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  height: 100%;
}

.logo {
  width: 70px;
  height: auto;
  margin-left: 12px;
}

.nav-link {
  color: white;
  text-decoration: none;
  letter-spacing: 1.4px;
  font-weight: bold;
}

/* Botón burger blanco */
.nav-toggle {
  color: white;
  background: none;
  border: none;
  font-size: 28px;
  padding: 0 20px;
  line-height: var(--nav-h);
  cursor: pointer;
  z-index: 1001;
}

.nav-toggle:focus:not(:focus-visible) {
  outline: none;
}

/* Menú: panel a pantalla completa que entra desde la derecha,
   fondo con blur y opacidad negra, texto blanco. */
.nav-menu {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin: 0;
  padding: 40px 0;

  position: fixed;
  top: var(--nav-h);
  left: 100%;
  width: 100%;
  height: calc(100vh - var(--nav-h));
  overflow-y: auto;
  z-index: 990; /* sobre el contenido, debajo de la barra (1000) */

  /* mismo efecto frosted que la navbar: tinte oscuro + blur del fondo */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.62),
    rgba(0, 0, 0, 0.42)
  );
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  transition: left 0.3s ease;
}

.nav-menu_visible {
  left: 0;
}

.nav-menu-item {
  font-family: var(--font-display);
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.nav-menu-link {
  display: block;
  padding: 12px 28px;
  border-radius: 13px;
  transition: color 0.3s ease, background 0.3s ease;
}

.nav-menu-link:hover {
  color: var(--accent);
}

/* En pantallas anchas el panel desaparece y los links van en línea.
   (mobile-first: esto es un extra para que no rompa en desktop) */
@media (min-width: 760px) {
  .nav-toggle {
    display: none;
  }
  .nav-menu {
    position: static;
    flex-direction: row;
    width: auto;
    height: auto;
    padding: 0;
    margin-right: 24px;
    background: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
  .nav-menu-item {
    font-size: 1.05rem;
  }
}
</style>
