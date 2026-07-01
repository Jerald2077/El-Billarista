/* =========================================================
   Datos de contacto y enlaces.
   >>> EDITAR ACÁ con los datos reales <<<
   Pensado para que se completen a mano desde VS Code.
   ========================================================= */

export const CONTACTO = {
  // WhatsApp: solo números, con código de país y área SIN '+', '0' ni '15'.
  // Ej. Neuquén: 549299XXXXXXX  -> dejar vacío para deshabilitar el link.
  whatsappNumero: '', // TODO: completar, ej. '5492990000000'

  // Mensaje por defecto del botón general de WhatsApp.
  whatsappMensaje: 'Hola! Quiero hacer una consulta sobre las mesas de pool.',

  // URL del perfil de Instagram (ej. 'https://instagram.com/elbillarista').
  instagramUrl: '', // TODO: completar

  // Embed de Google Maps (iframe src). Ubicación random en Neuquén capital.
  // Reemplazar por el embed real desde Google Maps -> Compartir -> Insertar mapa.
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d775.9284167355021!2d-68.12580552000239!3d-38.93052160992148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a34a7371d32bb%3A0x8114031d638762d2!2sNeuqu%C3%A9n!5e0!3m2!1ses-419!2sar!4v1689354964941!5m2!1ses-419!2sar',

  // Texto de la dirección que se muestra debajo del mapa.
  direccion: 'Neuquén Capital, Provincia de Neuquén, Argentina'
}

/**
 * Arma un link de WhatsApp con mensaje pre-escrito.
 * Si no hay número cargado devuelve '' (el botón queda inerte).
 */
export function linkWhatsApp(mensaje = CONTACTO.whatsappMensaje) {
  if (!CONTACTO.whatsappNumero) return ''
  return `https://wa.me/${CONTACTO.whatsappNumero}?text=${encodeURIComponent(mensaje)}`
}
