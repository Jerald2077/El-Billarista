<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  images: { type: Array, required: true },
  alt: { type: String, default: '' },
  start: { type: Number, default: 0 }
})
const emit = defineEmits(['close'])

const index = ref(props.start)

function go(i) {
  const n = props.images.length
  index.value = (i + n) % n // navegación circular
}
const next = () => go(index.value + 1)
const prev = () => go(index.value - 1)
const close = () => emit('close')

// --- Swipe táctil ---
let startX = 0
let dragging = false
function onTouchStart(e) {
  startX = e.touches[0].clientX
  dragging = true
}
function onTouchEnd(e) {
  if (!dragging) return
  dragging = false
  const dx = e.changedTouches[0].clientX - startX
  if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
}

// --- Teclado (desktop): Esc cierra, flechas navegan ---
function onKey(e) {
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

// Bloquea el scroll del fondo mientras el modal está abierto.
onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <div class="modal" role="dialog" aria-modal="true" :aria-label="alt">
      <!-- Botón cerrar (grande, arriba a la derecha) -->
      <button class="modal__close" aria-label="Cerrar" @click="close">
        <i class="fas fa-times"></i>
      </button>

      <!-- Escenario: imagen grande + flechas -->
      <div
        class="modal__stage"
        @touchstart.passive="onTouchStart"
        @touchend="onTouchEnd"
      >
        <button
          v-if="images.length > 1"
          class="modal__arrow modal__arrow--prev"
          aria-label="Foto anterior"
          @click="prev"
        >
          <i class="fas fa-chevron-left"></i>
        </button>

        <img :src="images[index]" :alt="alt" class="modal__img" draggable="false" />

        <button
          v-if="images.length > 1"
          class="modal__arrow modal__arrow--next"
          aria-label="Foto siguiente"
          @click="next"
        >
          <i class="fas fa-chevron-right"></i>
        </button>

        <span v-if="images.length > 1" class="modal__count">
          {{ index + 1 }} / {{ images.length }}
        </span>
      </div>

      <!-- Tira de miniaturas -->
      <div v-if="images.length > 1" class="modal__thumbs">
        <button
          v-for="(img, i) in images"
          :key="i"
          class="modal__thumb"
          :class="{ 'is-active': i === index }"
          :aria-label="`Ver foto ${i + 1}`"
          @click="go(i)"
        >
          <img :src="img" :alt="`${alt} miniatura ${i + 1}`" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: max(14px, env(safe-area-inset-top)) 12px
    max(14px, env(safe-area-inset-bottom));
  animation: modalIn 0.2s ease;
}

@keyframes modalIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Botón cerrar grande */
.modal__close {
  position: absolute;
  top: max(12px, env(safe-area-inset-top));
  right: 14px;
  z-index: 2;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}
.modal__close:hover {
  background: rgba(0, 0, 0, 0.8);
}
.modal__close:active {
  transform: scale(0.92);
}

/* Escenario de la imagen */
.modal__stage {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0; /* permite que la imagen se achique dentro del flex */
  user-select: none;
  touch-action: pan-y;
}

.modal__img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* muestra la foto completa, sin recortar */
  border-radius: 10px;
}

/* Flechas */
.modal__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}
.modal__arrow:active {
  transform: translateY(-50%) scale(0.9);
}
.modal__arrow--prev {
  left: 6px;
}
.modal__arrow--next {
  right: 6px;
}

/* Contador */
.modal__count {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  letter-spacing: 1px;
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
}

/* Miniaturas */
.modal__thumbs {
  flex: 0 0 auto;
  display: flex;
  gap: 8px;
  padding: 12px 4px 4px;
  overflow-x: auto;
  scrollbar-width: none;
  justify-content: center;
}
.modal__thumbs::-webkit-scrollbar {
  display: none;
}

.modal__thumb {
  flex: 0 0 auto;
  width: 64px;
  height: 50px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: none;
  opacity: 0.5;
  transition: opacity 0.2s ease, border-color 0.2s ease;
}
.modal__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.modal__thumb.is-active {
  opacity: 1;
  border-color: var(--accent);
}
</style>
