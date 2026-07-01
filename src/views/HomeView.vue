<script setup>
import { useRouter } from 'vue-router'
import { PRODUCTOS } from '../data/products.js'

const router = useRouter()

// Cada tarjeta lleva a Productos y resalta su mesa (?ver=<id>).
function verMesa(id) {
  router.push({ path: '/productos', query: { ver: id } })
}
</script>

<template>
  <div class="home">
  <!-- ===== HERO (referencia gráfica 1) ===== -->
  <section class="hero">
    <div class="hero__bg"></div>
    <div class="hero__overlay"></div>
    <div class="hero__content">
      <p class="eyebrow">El Billarista · Neuquén</p>
      <!-- SLOGAN (no tocar salvo cambio de marca) -->
      <h1 class="display hero__title">
        Los Mejores juegos de Pool de Neuquén
      </h1>
      <p class="hero__sub">
        Mesas de pool profesionales, listas para jugar. Muestras sin compromiso.
      </p>
      <div class="hero__actions">
        <button class="btn btn--primary" @click="router.push('/productos')">
          Ver productos
        </button>
        <button class="btn btn--ghost" @click="router.push('/contacto')">
          Contacto
        </button>
      </div>
      <div class="hero__dots">• • •</div>
    </div>
  </section>

  <div class="page">
    <!-- ===== SECCIÓN: QUIÉNES SOMOS =====
         (acá irá la presentación real del negocio a futuro) -->
    <section class="section">
      <p class="eyebrow">Quiénes somos</p>
      <h2 class="display">Somos El Billarista</h2>
      <div class="glass about">
        <div class="diamonds">◇ ◇ ◇ ◇ ◇</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. (Texto de ejemplo — reemplazar por la
          descripción real del negocio.)
        </p>
      </div>
    </section>

    <!-- ===== SECCIÓN: NUESTRAS MESAS (preview) ===== -->
    <section class="section">
      <p class="eyebrow">Nuestras mesas</p>
      <h2 class="display">Tres líneas de mesas</h2>
      <div class="cats">
        <article
          v-for="p in PRODUCTOS"
          :key="p.id"
          class="glass cat"
          role="button"
          tabindex="0"
          @click="verMesa(p.id)"
          @keydown.enter="verMesa(p.id)"
        >
          <div class="cat__media">
            <img :src="p.fotos[0]" :alt="p.nombre" loading="lazy" />
          </div>
          <div class="cat__body">
            <h3 class="cat__title">{{ p.nombreCorto }}</h3>
            <p class="cat__text">{{ p.tagline }}</p>
            <span class="cat__link">Ver mesa <i class="fas fa-arrow-right"></i></span>
          </div>
        </article>
      </div>
      <button
        class="btn btn--primary btn--block section__cta"
        @click="router.push('/productos')"
      >
        Ver catálogo completo
      </button>
    </section>

    <!-- ===== SECCIÓN: CIERRE / CTA ===== -->
    <section class="section closing glass">
      <h2 class="display">¿Listo para jugar?</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
      <button class="btn btn--ghost" @click="router.push('/contacto')">
        ¡Conocé más!
      </button>
    </section>
  </div>
  </div>
</template>

<style scoped>
/* Degradado anclado a la unión hero → primera sección:
   verde paño cerca del corte que degrada al fondo base. */
.home {
  position: relative;
}

.home::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  /* unión (arriba) = lo más oscuro de la imagen; luego abre a verde
     paño (más claro) hacia abajo y se mantiene en el verde. */
  background: linear-gradient(
    to bottom,
    var(--bg) 0,
    var(--bg) 96vh,
    var(--felt) 172vh
  );
}

/* HERO */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--nav-h) 22px 40px;
  overflow: hidden;
}

/* Imagen del hero en su propia capa, con máscara que la disuelve
   hacia abajo para fundirse con el fondo de la sección siguiente. */
.hero__bg {
  position: absolute;
  inset: 0;
  background: url('/img/mesaIndex.jpg') center / cover no-repeat;
  -webkit-mask-image: linear-gradient(
    to bottom,
    #000 0%,
    #000 55%,
    transparent 100%
  );
  mask-image: linear-gradient(to bottom, #000 0%, #000 55%, transparent 100%);
}

.hero__overlay {
  position: absolute;
  inset: 0;
  /* tinte negro para dar contraste al texto; termina transparente
     abajo para mantener la transición con la sección siguiente */
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.55) 35%,
    rgba(0, 0, 0, 0.45) 58%,
    rgba(0, 0, 0, 0.24) 73%,
    transparent 90%
  );
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: var(--maxw);
}

/* Eyebrow del hero en dorado claro (mejor lectura sobre la imagen) */
.hero .eyebrow {
  color: #e9d6a4;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}

.hero__title {
  color: #fff;
  margin: 6px 0 14px;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
}

.hero__sub {
  color: #f3f4f1;
  margin-bottom: 26px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.hero__dots {
  margin-top: 28px;
  letter-spacing: 6px;
  color: var(--cream);
  opacity: 0.7;
}

/* QUIÉNES SOMOS */
.about {
  padding: 22px 20px;
}

/* CATEGORÍAS (tarjetas clickeables: imagen + título + textito) */
.cats {
  display: grid;
  gap: 14px;
}

.cat {
  overflow: hidden;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.18s ease, box-shadow 0.25s ease;
}

.cat:active {
  transform: scale(0.985);
}

.cat__media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.cat__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cat:active .cat__media img {
  transform: scale(1.04);
}

.cat__body {
  padding: 16px 18px 18px;
}

.cat__title {
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 1.35rem;
  margin: 0 0 6px;
  color: var(--cream);
}

.cat__text {
  margin: 0 0 10px;
  font-size: 0.95rem;
}

.cat__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 0.82rem;
  color: var(--accent-soft);
}

.cat__link i {
  transition: transform 0.2s ease;
}

.cat:active .cat__link i {
  transform: translateX(4px);
}

.section__cta {
  margin-top: 18px;
}

/* CIERRE */
.closing {
  text-align: center;
  padding: 34px 22px;
}

.closing h2 {
  margin-bottom: 8px;
}
</style>
