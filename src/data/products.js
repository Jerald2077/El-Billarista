/* =========================================================
   Catálogo de mesas (informativo, sin pagos).
   3 modelos / 3 categorías. Precio único por ahora.
   Las fotos salen de /public/img/fotos-reales/.

   NOTA: cada mesa tiene un array `fotos`. La PRIMERA es la
   portada (la que se ve en la tarjeta del inicio y como
   imagen inicial del carrusel). Por ahora son fotos de
   relleno (prototipo); se pueden repetir entre modelos.
   ========================================================= */

// Precio único provisorio para todos los modelos.
export const PRECIO_BASE = 1580000

// Mensaje de WhatsApp por modelo (el número se carga en config.js).
const consulta = (nombre) =>
  `Hola! Quiero saber más sobre la mesa "${nombre}". ¿Me pasás info?`

export const PRODUCTOS = [
  {
    id: 'economica',
    categoria: 'Mesas Económicas',
    nombreCorto: 'Económicas',
    nombre: 'Modelo Clásico',
    tagline: 'Ideal para empezar a jugar en casa.',
    fotos: [
      '/img/fotos-reales/MesaCard2.png', // portada
      '/img/fotos-reales/Mesa1.jpg',
      '/img/fotos-reales/Mesa2.jpg',
      '/img/fotos-reales/IMG-20241119-WA0007.jpg',
      '/img/fotos-reales/Mesa4.png'
    ],
    precio: PRECIO_BASE,
    medidas: '240 × 140 cm',
    material: 'Estructura de MDF reforzado',
    colores: ['Negro', 'Madera natural'],
    pano: 'Paño verde estándar',
    accesorios: ['2 tacos', 'Juego de 16 bolas', 'Triángulo', 'Tizas'],
    mensajeWhatsApp: consulta('Modelo Clásico')
  },
  {
    id: 'semi-premium',
    categoria: 'Mesas Semi-Premium',
    nombreCorto: 'Semi-Premium',
    nombre: 'Modelo Tallado',
    tagline: 'Mejores terminaciones y madera maciza.',
    fotos: [
      '/img/fotos-reales/MesaCard1.jpg', // portada
      '/img/fotos-reales/Mesa3.jpg',
      '/img/fotos-reales/IMG-20241119-WA0050.jpg',
      '/img/fotos-reales/Mesa2.jpg',
      '/img/fotos-reales/MesaCard3.png'
    ],
    precio: PRECIO_BASE,
    medidas: '240 × 140 cm',
    material: 'Madera maciza con tallado artesanal',
    colores: ['Roble oscuro', 'Nogal'],
    pano: 'Paño rojo profesional',
    accesorios: ['2 tacos', 'Juego de 16 bolas', 'Triángulo', 'Tizas'],
    mensajeWhatsApp: consulta('Modelo Tallado')
  },
  {
    id: 'premium',
    categoria: 'Mesas Premium',
    nombreCorto: 'Premium',
    nombre: 'Modelo Profesional',
    tagline: 'Máxima calidad de juego, nivel competición.',
    fotos: [
      '/img/fotos-reales/MesaCard3.png', // portada
      '/img/fotos-reales/IMG-20241119-WA0007.jpg',
      '/img/fotos-reales/Mesa1.jpg',
      '/img/fotos-reales/Mesa3.jpg',
      '/img/fotos-reales/MesaCard1.jpg'
    ],
    precio: PRECIO_BASE,
    medidas: '240 × 140 cm',
    material: 'Madera maciza premium con superficie de pizarra',
    colores: ['Negro mate', 'Caoba', 'Roble oscuro'],
    pano: 'Paño rojo de competición',
    accesorios: [
      '2 tacos profesionales',
      'Juego de 16 bolas premium',
      'Triángulo',
      'Tizas',
      'Portatacos',
      'Kit de mantenimiento'
    ],
    mensajeWhatsApp: consulta('Modelo Profesional')
  }
]

// Formatea 1580000 -> "$ 1.580.000"
export function formatPrecio(valor) {
  return '$ ' + new Intl.NumberFormat('es-AR').format(valor)
}
