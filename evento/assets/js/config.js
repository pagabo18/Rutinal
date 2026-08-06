/*
 * Configuración del evento.
 * Este es el ÚNICO archivo que necesitas editar para personalizar la web.
 * Todo lo demás (index.html, app.js, styles.css) se rellena a partir de aquí.
 */

window.CONFIG = {

  /* ------------------------------------------------------------------
   * 1. DATOS DEL EVENTO
   * ---------------------------------------------------------------- */
  evento: {
    nombre: 'Encuentro Anual',
    edicion: 'XII Edición',
    lema: 'Una noche para volver a vernos',

    // Fecha y hora de inicio en formato ISO con zona horaria.
    // Se usa para la cuenta regresiva y para el archivo de calendario.
    inicioISO: '2026-11-14T20:00:00-06:00',
    finISO: '2026-11-15T02:00:00-06:00',

    // Textos legibles que se muestran en la página.
    fechaTexto: 'Sábado 14 de noviembre de 2026',
    horaTexto: '20:00 h',

    lugar: {
      nombre: 'Hacienda Los Encinos',
      direccion: 'Camino Real 128, Col. Centro, Ciudad',
      mapaUrl: 'https://maps.google.com/?q=Hacienda+Los+Encinos',
    },

    dressCode: 'Formal / Cóctel',

    // Fecha límite para confirmar. Pasada esta fecha el formulario se cierra.
    limiteRSVPISO: '2026-10-31T23:59:00-06:00',
    limiteRSVPTexto: '31 de octubre de 2026',

    // Máximo de acompañantes por invitación (se puede sobreescribir por invitado).
    maxAcompanantes: 2,

    contacto: {
      nombre: 'Comité organizador',
      // Sólo dígitos, con código de país. Se usa para el enlace de WhatsApp.
      whatsapp: '5215512345678',
      email: 'invitaciones@ejemplo.com',
    },
  },

  /* ------------------------------------------------------------------
   * 2. ACCESO
   *
   * modo: 'clave-unica'    -> todos los invitados usan la misma contraseña.
   *       'codigo-invitado' -> cada invitación tiene su propio código y la
   *                            web reconoce el nombre al entrar.
   *
   * Las contraseñas NO se guardan en texto plano: se guarda su hash SHA-256.
   * Genera los hashes con:   node evento/tools/generar-hash.mjs "mi-clave"
   *
   * AVISO: esto es una puerta de cortesía, no seguridad real. Cualquiera con
   * conocimientos puede leer el contenido de la página sin la clave. No pongas
   * aquí información que no puedas permitirte que se filtre.
   * ---------------------------------------------------------------- */
  acceso: {
    modo: 'clave-unica',

    // Usado cuando modo === 'clave-unica'.
    // Hash de la clave de ejemplo: "encuentro2026"
    claveHash: '338e30515a0533ac26ac7e976b7067e299ccdbb48956981bbbd9e9b9d7054931',

    // Usado cuando modo === 'codigo-invitado'.
    // maxAcompanantes es opcional; si falta se usa el del evento.
    invitados: [
      // { nombre: 'Familia Ruiz',   codigoHash: '...', maxAcompanantes: 3 },
      // { nombre: 'Ana y Martín',   codigoHash: '...' },
    ],

    // Minutos que dura la sesión antes de volver a pedir la clave.
    duracionSesionMin: 720,
  },

  /* ------------------------------------------------------------------
   * 3. ENVÍO DE CONFIRMACIONES
   *
   * endpoint: URL que recibe un POST con JSON (Google Apps Script, Formspree,
   *           Supabase, tu propia API...). Déjalo vacío para trabajar sin
   *           servidor: en ese caso la confirmación se abre prellenada por
   *           WhatsApp o correo y se guarda una copia en el navegador.
   * ---------------------------------------------------------------- */
  rsvp: {
    endpoint: '',
    fallback: 'whatsapp', // 'whatsapp' | 'email'
    pedirTelefono: true,
    pedirAlergias: true,
  },

  /* ------------------------------------------------------------------
   * 4. CONTENIDO
   * ---------------------------------------------------------------- */
  programa: [
    { hora: '20:00', titulo: 'Recepción y cóctel de bienvenida' },
    { hora: '21:00', titulo: 'Cena' },
    { hora: '22:30', titulo: 'Palabras y reconocimientos' },
    { hora: '23:00', titulo: 'Música en vivo y baile' },
    { hora: '02:00', titulo: 'Cierre' },
  ],

  faq: [
    {
      p: '¿Puedo llevar acompañante?',
      r: 'Sí, hasta el número indicado en tu invitación. Puedes registrarlos al confirmar tu asistencia.',
    },
    {
      p: '¿Hay estacionamiento?',
      r: 'El lugar cuenta con estacionamiento gratuito para los asistentes.',
    },
    {
      p: '¿Puedo cambiar mi respuesta?',
      r: 'Sí. Vuelve a entrar con tu clave y envía de nuevo el formulario antes de la fecha límite; tu última respuesta es la que cuenta.',
    },
  ],
};
