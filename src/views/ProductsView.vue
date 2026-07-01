<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { PRODUCTOS, formatPrecio } from '../data/products.js'
import { CONTACTO } from '../config.js'
import GalleryModal from '../components/GalleryModal.vue'

const route = useRoute()
const destacada = ref(null) // id de la mesa a resaltar al llegar desde el inicio

// Modal/visualizador de fotos. null = cerrado.
const galeria = ref(null)
const abrirGaleria = (p) => (galeria.value = { images: p.fotos, alt: p.nombre })
const cerrarGaleria = () => (galeria.value = null)

// "Quiero saber más": arma el link de WhatsApp por modelo.
// Si el número aún no está cargado en config.js el botón queda
// presionable pero sin destino (listo para completar a mano).
function hrefModelo(producto) {
  if (!CONTACTO.whatsappNumero) return '#'
  return `https://wa.me/${CONTACTO.whatsappNumero}?text=${encodeURIComponent(
    producto.mensajeWhatsApp
  )}`
}

// Si venimos del inicio (?ver=<id>): scroll a esa mesa y resaltarla un toque.
onMounted(() => {
  const id = route.query.ver
  if (!id) return
  // pequeño delay para ganarle al scroll-to-top del router
  setTimeout(() => {
    const el = document.getElementById(`mesa-${id}`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    destacada.value = id
    setTimeout(() => (destacada.value = null), 1400)
  }, 120)
})
</script>

<template>
  <div class="page">
    <header class="head">
      <p class="eyebrow">Catálogo</p>
      <h1 class="display">Nuestras Mesas</h1>
      <p class="head__sub">
        Ofrecemos modelos especiales como tapas de Ping Pong y mesa comedor. Para mas información las consultas se hacen por
        WhatsApp.
      </p>
    </header>

    <div class="grid">
      <article
        v-for="p in PRODUCTOS"
        :key="p.id"
        :id="`mesa-${p.id}`"
        class="glass card"
        :class="{ 'is-highlight': destacada === p.id }"
      >
        <span class="card__cat">{{ p.categoria }}</span>

        <!-- Portada tocable: abre el visualizador de fotos en modal -->
        <button
          type="button"
          class="card__cover"
          :aria-label="`Ver fotos de ${p.nombre}`"
          @click="abrirGaleria(p)"
        >
          <img :src="p.fotos[0]" :alt="p.nombre" loading="lazy" />
          <span class="card__cover-badge">
            <i class="fas fa-images"></i> Ver fotos · {{ p.fotos.length }}
          </span>
        </button>

        <div class="card__body">
          <h2 class="card__name">{{ p.nombre }}</h2>
          <p class="card__price">{{ formatPrecio(p.precio) }}</p>

          <ul class="specs">
            <li><span>Medidas</span><strong>{{ p.medidas }}</strong></li>
            <li><span>Material</span><strong>{{ p.material }}</strong></li>
            <li>
              <span>Colores</span><strong>{{ p.colores.join(', ') }}</strong>
            </li>
            <li><span>Paño</span><strong>{{ p.pano }}</strong></li>
            <li>
              <span>Accesorios</span>
              <strong>{{ p.accesorios.join(' · ') }}</strong>
            </li>
          </ul>

          <!-- Botón "Quiero saber más" -> WhatsApp (instanciado) -->
          <a
            class="btn btn--primary btn--block card__cta"
            :href="hrefModelo(p)"
            target="_blank"
            rel="noopener"
          >
            <i class="fab fa-whatsapp"></i> Quiero saber más
          </a>
        </div>
      </article>
    </div>

    <!-- Visualizador de fotos a pantalla completa -->
    <GalleryModal
      v-if="galeria"
      :images="galeria.images"
      :alt="galeria.alt"
      @close="cerrarGaleria"
    />
  </div>
</template>

<style scoped>
.head {
  text-align: center;
  margin-bottom: 26px;
}

.head__sub {
  margin: 10px auto 0;
  max-width: 420px;
}

.grid {
  display: grid;
  gap: 22px;
}

.card {
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  /* al hacer scroll desde el inicio, deja aire bajo la navbar fija */
  scroll-margin-top: calc(var(--nav-h) + 14px);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

/* Resaltado momentáneo cuando se llega desde una tarjeta del inicio */
.card.is-highlight {
  animation: cardPulse 1.4s ease;
}

@keyframes cardPulse {
  0%,
  100% {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transform: translateY(0);
  }
  20% {
    box-shadow: 0 0 0 3px var(--accent), 0 14px 36px rgba(33, 188, 111, 0.35);
    transform: translateY(-4px);
  }
}

.card__cat {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 0.72rem;
  padding: 6px 12px;
  border-radius: 999px;
  color: #04130c;
  background: var(--accent);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

/* Portada tocable (abre el modal) */
.card__cover {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: var(--felt-deep);
  aspect-ratio: 4 / 3;
  overflow: hidden;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card__cover:active img {
  transform: scale(1.04);
}

.card__cover-badge {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.74rem;
  padding: 7px 13px;
  border-radius: 999px;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.card__body {
  padding: 18px 18px 20px;
}

.card__name {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.45rem;
  margin: 0;
  color: var(--cream);
}

.card__price {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--accent-soft);
  margin: 4px 0 16px;
}

.specs {
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
}

.specs li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.specs li span {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-dim);
}

.specs li strong {
  font-weight: 500;
  color: var(--text);
  font-size: 0.95rem;
}

.card__cta {
  margin-top: 4px;
}

@media (min-width: 760px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}
</style>
