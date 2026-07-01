import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // honra el puerto asignado por el entorno (o 5173 por defecto)
    port: Number(process.env.PORT) || 5173
  }
})
