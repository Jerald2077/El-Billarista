# El Billarista — Mesas de Pool

Sitio **informativo** (sin pagos ni login) para la venta de mesas de pool.
Hecho con **Vue 3 + Vite 6**. Mobile-first, modo oscuro.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción en /dist
npm run preview  # previsualizar el build
```

## Estructura

```
public/img/            Imágenes (logos, fotos reales, etc.)
src/
  main.js              Punto de entrada
  App.vue              Layout + transición entre pantallas
  style.css            Tema global (variables, glassmorphism, botones)
  config.js            ◀ DATOS DE CONTACTO (editar a mano)
  router/index.js      Rutas: / · /productos · /contacto
  components/
    Navbar.vue         Barra fija + menú burger a pantalla completa
    SocialButtons.vue  Botones circulares Instagram / WhatsApp
  data/products.js     ◀ CATÁLOGO de mesas (editar a mano)
  views/
    HomeView.vue       General / Inicio
    ProductsView.vue   Productos (3 modelos)
    ContactView.vue    Contacto (mapa + redes)
```

## Qué falta completar (a mano, desde VS Code)

En **`src/config.js`**:
- `whatsappNumero` → número real (formato `549299XXXXXXX`).
- `instagramUrl` → URL del perfil de Instagram.
- `mapsEmbedUrl` → embed real de Google Maps (hoy: ubicación random en Neuquén).
- `direccion` → texto de la dirección.

En **`src/data/products.js`**:
- Precio (`PRECIO_BASE`, hoy `1.580.000`), medidas, materiales, colores, paño y
  accesorios de cada modelo, y la foto (`/img/...`).

> Mientras esos datos estén vacíos, los botones de WhatsApp / Instagram quedan
> presionables pero sin destino (`#`), listos para completar.
