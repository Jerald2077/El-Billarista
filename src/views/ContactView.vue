<script setup>
import SocialButtons from '../components/SocialButtons.vue'
import { CONTACTO } from '../config.js'
</script>

<template>
  <div class="page">
    <header class="head">
      <p class="eyebrow">Dónde estamos</p>
      <h1 class="display">Contacto</h1>
      <p class="head__sub">
        Veni a conocer las mesas o escribinos. Te esperamos.
      </p>
    </header>

    <!-- Minimapa de Google Maps (ubicación random en Neuquén por ahora) -->
    <section class="glass map-card">
      <div class="map-frame">
        <iframe
          :src="CONTACTO.mapsEmbedUrl"
          title="Ubicación en Neuquén"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </div>
      <p class="address">
        <i class="fas fa-map-marker-alt"></i> {{ CONTACTO.direccion }}
      </p>
    </section>

    <!-- Botones circulares: Instagram + WhatsApp -->
    <section class="section social-section">
      <p class="eyebrow">Seguinos / Escribinos</p>
      <SocialButtons />
    </section>
  </div>
</template>

<style scoped>
.head {
  text-align: center;
  margin-bottom: 24px;
}

.head__sub {
  margin: 10px auto 0;
  max-width: 420px;
}

.map-card {
  padding: 12px;
  overflow: hidden;
}

.map-frame {
  border-radius: 14px;
  overflow: hidden;
  line-height: 0;
}

.map-frame iframe {
  width: 100%;
  height: 300px;
  border: 0;
  display: block;
  /* el iframe de Maps es claro; lo integramos un poco al tema oscuro */
  filter: saturate(0.9) brightness(0.92);
}

.address {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 14px 0 4px;
  font-size: 0.95rem;
  color: var(--text-soft);
}

.address i {
  color: var(--accent);
}

.social-section {
  text-align: center;
}
</style>
