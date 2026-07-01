<script setup>
import { CONTACTO, linkWhatsApp } from '../config.js'

// Botones circulares. Si todavía no hay datos cargados en config.js,
// quedan presionables pero sin destino (href '#'), listos para completar.
const waHref = linkWhatsApp() || '#'
const igHref = CONTACTO.instagramUrl || '#'
</script>

<template>
  <div class="social">
    <a
      class="social__btn social__btn--ig"
      :href="igHref"
      target="_blank"
      rel="noopener"
      aria-label="Instagram"
    >
      <i class="fab fa-instagram"></i>
    </a>

    <a
      class="social__btn social__btn--wa"
      :href="waHref"
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
    >
      <i class="fab fa-whatsapp"></i>
    </a>
  </div>
</template>

<style scoped>
.social {
  display: flex;
  justify-content: center;
  gap: 22px;
  margin-top: 26px;
}

.social__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  font-size: 28px;
  color: #fff;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.35);
  transition: transform 0.18s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.social__btn:active {
  transform: scale(0.94);
}

.social__btn--ig:hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  box-shadow: 0 10px 26px rgba(220, 39, 67, 0.4);
  transform: translateY(-3px);
}

.social__btn--wa:hover {
  background: #25d366;
  box-shadow: 0 10px 26px rgba(37, 211, 102, 0.4);
  transform: translateY(-3px);
}
</style>
