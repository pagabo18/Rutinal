/*
 * Lógica de la invitación: puerta de acceso, cuenta regresiva y confirmación.
 * Sin dependencias externas: funciona abriendo index.html directamente.
 */
(function () {
  'use strict';

  var CFG = window.CONFIG;
  var LS_SESION = 'evento.sesion.v1';
  var LS_RSVP = 'evento.rsvp.v1';

  /* =====================================================================
   * SHA-256 (implementación propia: funciona también con file://, donde
   * crypto.subtle no está disponible)
   * =================================================================== */
  var sha256 = (function () {
    var K = new Uint32Array([
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ]);

    function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }

    return function (texto) {
      var bytes = new TextEncoder().encode(texto);
      var len = bytes.length;
      var buf = new Uint8Array(((((len + 8) >> 6) + 1) << 6));
      buf.set(bytes);
      buf[len] = 0x80;

      var dv = new DataView(buf.buffer);
      var bits = len * 8;
      dv.setUint32(buf.length - 8, Math.floor(bits / 4294967296));
      dv.setUint32(buf.length - 4, bits >>> 0);

      var H = new Uint32Array([
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
      ]);
      var w = new Uint32Array(64);

      for (var i = 0; i < buf.length; i += 64) {
        var t;
        for (t = 0; t < 16; t++) w[t] = dv.getUint32(i + t * 4);
        for (t = 16; t < 64; t++) {
          var x = w[t - 15], y = w[t - 2];
          var s0 = rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3);
          var s1 = rotr(y, 17) ^ rotr(y, 19) ^ (y >>> 10);
          w[t] = (w[t - 16] + s0 + w[t - 7] + s1) >>> 0;
        }

        var a = H[0], b = H[1], c = H[2], d = H[3];
        var e = H[4], f = H[5], g = H[6], h = H[7];

        for (t = 0; t < 64; t++) {
          var S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
          var ch = (e & f) ^ (~e & g);
          var t1 = (h + S1 + ch + K[t] + w[t]) >>> 0;
          var S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
          var maj = (a & b) ^ (a & c) ^ (b & c);
          var t2 = (S0 + maj) >>> 0;
          h = g; g = f; f = e; e = (d + t1) >>> 0;
          d = c; c = b; b = a; a = (t1 + t2) >>> 0;
        }

        H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0;
        H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0;
        H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0;
        H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0;
      }

      var out = '';
      for (var j = 0; j < 8; j++) out += ('00000000' + H[j].toString(16)).slice(-8);
      return out;
    };
  })();

  /* Misma normalización que usa evento/tools/generar-hash.mjs */
  function normalizar(s) {
    return String(s == null ? '' : s).normalize('NFKC').trim().toLowerCase().replace(/\s+/g, '');
  }

  /* =====================================================================
   * Utilidades
   * =================================================================== */
  function $(sel, raiz) { return (raiz || document).querySelector(sel); }
  function $$(sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); }

  function leerJSON(clave) {
    try { return JSON.parse(localStorage.getItem(clave) || 'null'); } catch (e) { return null; }
  }
  function guardarJSON(clave, valor) {
    try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) { /* modo privado */ }
  }

  function fecha(iso) {
    var d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  }

  function dosDigitos(n) { return (n < 10 ? '0' : '') + n; }

  /* =====================================================================
   * Estado
   * =================================================================== */
  var estado = {
    invitado: null,     // { nombre, maxAcompanantes } o null en modo clave única
    rsvp: null,         // última respuesta guardada
    plazoCerrado: false,
    cronometro: null
  };

  /* =====================================================================
   * Render de contenido estático
   * =================================================================== */
  function pintarDatos() {
    var ev = CFG.evento;
    var mapa = {
      nombre: ev.nombre,
      edicion: ev.edicion,
      lema: ev.lema,
      fechaTexto: ev.fechaTexto,
      horaTexto: ev.horaTexto,
      lugarNombre: ev.lugar.nombre,
      lugarDireccion: ev.lugar.direccion,
      dressCode: ev.dressCode,
      limiteRSVPTexto: ev.limiteRSVPTexto
    };

    $$('[data-bind]').forEach(function (el) {
      var valor = mapa[el.getAttribute('data-bind')];
      if (valor != null) el.textContent = valor;
    });

    document.title = ev.nombre + ' · Invitación';

    var mapaLink = $('#link-mapa');
    if (ev.lugar.mapaUrl) mapaLink.href = ev.lugar.mapaUrl;
    else mapaLink.parentNode.hidden = true;

    // Enlaces de contacto
    var mail = 'mailto:' + ev.contacto.email + '?subject=' + encodeURIComponent(ev.nombre);
    ['#gate-contacto', '#cerrado-contacto'].forEach(function (sel) {
      var el = $(sel);
      if (el) el.href = mail;
    });
    var pie = $('#footer-contacto');
    pie.href = mail;
    pie.textContent = ev.contacto.email;

    // Etiqueta de la puerta según el modo
    if (CFG.acceso.modo === 'codigo-invitado') {
      $('#gate-label').textContent = 'Código de tu invitación';
      $('#gate-input').setAttribute('placeholder', 'Ej. ABC-123');
    }

    pintarPrograma();
    pintarFAQ();
  }

  function pintarPrograma() {
    var lista = $('#programa-lista');
    var items = CFG.programa || [];
    if (!items.length) { $('#programa').hidden = true; return; }

    items.forEach(function (item) {
      var li = document.createElement('li');
      var hora = document.createElement('span');
      hora.className = 'hora';
      hora.textContent = item.hora;
      var titulo = document.createElement('span');
      titulo.textContent = item.titulo;
      li.appendChild(hora);
      li.appendChild(titulo);
      lista.appendChild(li);
    });
  }

  function pintarFAQ() {
    var cont = $('#faq-lista');
    var items = CFG.faq || [];
    if (!items.length) { $('#faq').hidden = true; return; }

    items.forEach(function (item) {
      var det = document.createElement('details');
      var sum = document.createElement('summary');
      sum.textContent = item.p;
      var p = document.createElement('p');
      p.textContent = item.r;
      det.appendChild(sum);
      det.appendChild(p);
      cont.appendChild(det);
    });
  }

  /* =====================================================================
   * Puerta de acceso
   * =================================================================== */
  function sesionValida() {
    var s = leerJSON(LS_SESION);
    if (!s || !s.expira) return null;
    if (Date.now() > s.expira) { localStorage.removeItem(LS_SESION); return null; }
    return s;
  }

  function abrirSesion(invitado) {
    var minutos = CFG.acceso.duracionSesionMin || 720;
    guardarJSON(LS_SESION, {
      invitado: invitado,
      expira: Date.now() + minutos * 60000
    });
  }

  function verificarClave(entrada) {
    var hash = sha256(normalizar(entrada));

    if (CFG.acceso.modo === 'codigo-invitado') {
      var lista = CFG.acceso.invitados || [];
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].codigoHash && lista[i].codigoHash.toLowerCase() === hash) {
          return { ok: true, invitado: { nombre: lista[i].nombre, maxAcompanantes: lista[i].maxAcompanantes } };
        }
      }
      return { ok: false };
    }

    if (CFG.acceso.claveHash && CFG.acceso.claveHash.toLowerCase() === hash) {
      return { ok: true, invitado: null };
    }
    return { ok: false };
  }

  function iniciarPuerta() {
    var gate = $('#gate');
    var form = $('#gate-form');
    var input = $('#gate-input');
    var error = $('#gate-error');
    var toggle = $('#gate-toggle');

    gate.hidden = false;
    setTimeout(function () { input.focus(); }, 120);

    toggle.addEventListener('click', function () {
      var visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      toggle.textContent = visible ? 'Ver' : 'Ocultar';
      toggle.setAttribute('aria-pressed', String(!visible));
      toggle.setAttribute('aria-label', visible ? 'Mostrar la clave' : 'Ocultar la clave');
      input.focus();
    });

    input.addEventListener('input', function () {
      error.hidden = true;
      input.removeAttribute('aria-invalid');
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var valor = input.value;

      if (!normalizar(valor)) {
        mostrarErrorPuerta('Escribe la clave que recibiste con tu invitación.');
        return;
      }

      var res = verificarClave(valor);
      if (!res.ok) {
        mostrarErrorPuerta(
          CFG.acceso.modo === 'codigo-invitado'
            ? 'Ese código no aparece en la lista. Revísalo o escríbenos.'
            : 'La clave no es correcta. Revisa tu invitación e inténtalo de nuevo.'
        );
        return;
      }

      abrirSesion(res.invitado);
      entrar(res.invitado);
    });

    function mostrarErrorPuerta(msg) {
      error.textContent = msg;
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.select();
      gate.classList.remove('gate--shake');
      void gate.offsetWidth; // reinicia la animación
      gate.classList.add('gate--shake');
    }
  }

  function entrar(invitado) {
    estado.invitado = invitado || null;

    $('#gate').hidden = true;
    $('#site').hidden = false;
    window.scrollTo(0, 0);

    if (estado.invitado && estado.invitado.nombre) {
      var saludo = $('#hero-saludo');
      saludo.textContent = 'Te esperamos, ' + estado.invitado.nombre;
      saludo.hidden = false;
    }

    iniciarCuentaRegresiva();
    prepararCalendario();
    iniciarRSVP();
  }

  function salir() {
    localStorage.removeItem(LS_SESION);
    location.reload();
  }

  /* =====================================================================
   * Cuenta regresiva
   * =================================================================== */
  function iniciarCuentaRegresiva() {
    var inicio = fecha(CFG.evento.inicioISO);
    var fin = fecha(CFG.evento.finISO) || inicio;
    if (!inicio) { $('#countdown').hidden = true; return; }

    var titulo = $('#countdown-title');
    var campos = {
      dias: $('#cd-dias'), horas: $('#cd-horas'), min: $('#cd-min'), seg: $('#cd-seg')
    };

    function tick() {
      var restante = inicio.getTime() - Date.now();

      if (restante <= 0) {
        clearInterval(estado.cronometro);
        var enCurso = fin && Date.now() < fin.getTime();
        titulo.textContent = enCurso ? 'El evento está en marcha' : 'Gracias por acompañarnos';
        $('#countdown').querySelector('.countdown__grid').hidden = true;
        return;
      }

      var seg = Math.floor(restante / 1000);
      campos.dias.textContent = Math.floor(seg / 86400);
      campos.horas.textContent = dosDigitos(Math.floor(seg / 3600) % 24);
      campos.min.textContent = dosDigitos(Math.floor(seg / 60) % 60);
      campos.seg.textContent = dosDigitos(seg % 60);
    }

    tick();
    estado.cronometro = setInterval(tick, 1000);
  }

  /* =====================================================================
   * Archivo de calendario (.ics)
   * =================================================================== */
  function icsFecha(d) {
    return d.getUTCFullYear() +
      dosDigitos(d.getUTCMonth() + 1) +
      dosDigitos(d.getUTCDate()) + 'T' +
      dosDigitos(d.getUTCHours()) +
      dosDigitos(d.getUTCMinutes()) +
      dosDigitos(d.getUTCSeconds()) + 'Z';
  }

  function prepararCalendario() {
    var btn = $('#btn-calendario');
    var inicio = fecha(CFG.evento.inicioISO);
    if (!inicio) { btn.hidden = true; return; }

    var fin = fecha(CFG.evento.finISO) || new Date(inicio.getTime() + 4 * 3600000);
    var ev = CFG.evento;

    var ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//invitacion//ES',
      'BEGIN:VEVENT',
      'UID:' + icsFecha(inicio) + '@invitacion',
      'DTSTAMP:' + icsFecha(new Date()),
      'DTSTART:' + icsFecha(inicio),
      'DTEND:' + icsFecha(fin),
      'SUMMARY:' + escaparICS(ev.nombre + (ev.edicion ? ' — ' + ev.edicion : '')),
      'LOCATION:' + escaparICS(ev.lugar.nombre + ', ' + ev.lugar.direccion),
      'DESCRIPTION:' + escaparICS(ev.lema || ''),
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    btn.href = URL.createObjectURL(blob);
    btn.setAttribute('download', 'evento.ics');
  }

  function escaparICS(texto) {
    return String(texto).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
  }

  /* =====================================================================
   * Confirmación de asistencia
   * =================================================================== */
  function maxAcompanantes() {
    if (estado.invitado && typeof estado.invitado.maxAcompanantes === 'number') {
      return estado.invitado.maxAcompanantes;
    }
    return CFG.evento.maxAcompanantes || 0;
  }

  function iniciarRSVP() {
    var form = $('#rsvp-form');
    var sel = $('#rsvp-acompanantes');
    var soloSi = $('#solo-si');
    var campoNombres = $('#campo-nombres-acomp');

    // Campos opcionales según configuración
    if (!CFG.rsvp.pedirTelefono) $('#campo-telefono').hidden = true;
    if (!CFG.rsvp.pedirAlergias) $('#campo-alergias').hidden = true;

    // Opciones de acompañantes
    var max = maxAcompanantes();
    for (var i = 0; i <= max; i++) {
      var opt = document.createElement('option');
      opt.value = String(i);
      opt.textContent = i === 0 ? 'Voy sin acompañantes' : (i === 1 ? '1 acompañante' : i + ' acompañantes');
      sel.appendChild(opt);
    }
    $('#hint-acompanantes').textContent = max > 0
      ? 'Tu invitación permite hasta ' + max + (max === 1 ? ' acompañante.' : ' acompañantes.')
      : 'Tu invitación es individual.';
    if (max === 0) sel.parentNode.hidden = true;

    // Nota del método de envío
    $('#rsvp-nota').textContent = CFG.rsvp.endpoint
      ? 'Tu respuesta se envía directamente al comité organizador.'
      : (CFG.rsvp.fallback === 'email'
        ? 'Al enviar se abrirá tu correo con el mensaje ya redactado.'
        : 'Al enviar se abrirá WhatsApp con el mensaje ya redactado.');

    // Mostrar/ocultar bloque de asistentes
    $$('input[name="asistencia"]', form).forEach(function (radio) {
      radio.addEventListener('change', function () {
        soloSi.hidden = radio.value !== 'si';
      });
    });

    sel.addEventListener('change', function () {
      campoNombres.hidden = sel.value === '0';
    });

    // Nombre prellenado si conocemos al invitado
    if (estado.invitado && estado.invitado.nombre) {
      $('#rsvp-nombre').value = estado.invitado.nombre;
    }

    // Plazo
    var limite = fecha(CFG.evento.limiteRSVPISO);
    estado.plazoCerrado = !!limite && Date.now() > limite.getTime();
    if (estado.plazoCerrado) {
      $('#rsvp-cerrado').hidden = false;
      form.hidden = true;
    }

    // Respuesta previa
    estado.rsvp = leerJSON(LS_RSVP);
    if (estado.rsvp) mostrarRespuestaPrevia();

    form.addEventListener('submit', enviarRSVP);
    $('#btn-editar').addEventListener('click', function () {
      $('#rsvp-exito').hidden = true;
      $('#rsvp-error').hidden = true;
      $('#rsvp-error-manual').hidden = true;
      if (!estado.plazoCerrado) form.hidden = false;
      rellenarFormulario(estado.rsvp);
      form.scrollIntoView({ block: 'start' });
    });
    $('#btn-salir').addEventListener('click', salir);
  }

  function mostrarRespuestaPrevia() {
    var r = estado.rsvp;
    var aviso = $('#rsvp-previo');
    var enviado = fecha(r.enviadoISO);
    var cuando = enviado ? enviado.toLocaleDateString('es', { day: 'numeric', month: 'long' }) : '';

    aviso.textContent = r.asistencia === 'si'
      ? 'Ya confirmaste tu asistencia' + (cuando ? ' el ' + cuando : '') + '. Puedes volver a enviar el formulario si algo cambia.'
      : 'Registramos que no podrás acompañarnos' + (cuando ? ' (' + cuando + ')' : '') + '. Si cambia tu plan, envía de nuevo el formulario.';
    aviso.hidden = false;

    if (!estado.plazoCerrado) rellenarFormulario(r);
  }

  function rellenarFormulario(r) {
    if (!r) return;
    var form = $('#rsvp-form');

    $$('input[name="asistencia"]', form).forEach(function (radio) {
      radio.checked = radio.value === r.asistencia;
    });
    $('#solo-si').hidden = r.asistencia !== 'si';

    ['nombre', 'email', 'telefono', 'alergias', 'mensaje', 'nombresAcompanantes'].forEach(function (campo) {
      var el = form.elements[campo];
      if (el && r[campo] != null) el.value = r[campo];
    });

    var sel = $('#rsvp-acompanantes');
    if (r.acompanantes != null && sel.querySelector('option[value="' + r.acompanantes + '"]')) {
      sel.value = String(r.acompanantes);
      $('#campo-nombres-acomp').hidden = sel.value === '0';
    }
  }

  function recogerDatos(form) {
    var d = form.elements;
    var asistencia = (form.querySelector('input[name="asistencia"]:checked') || {}).value;
    var va = asistencia === 'si';

    return {
      evento: CFG.evento.nombre + (CFG.evento.edicion ? ' — ' + CFG.evento.edicion : ''),
      invitacion: estado.invitado && estado.invitado.nombre ? estado.invitado.nombre : '(clave general)',
      asistencia: asistencia,
      nombre: d.nombre.value.trim(),
      email: d.email.value.trim(),
      telefono: d.telefono ? d.telefono.value.trim() : '',
      acompanantes: va ? parseInt($('#rsvp-acompanantes').value || '0', 10) : 0,
      nombresAcompanantes: va && d.nombresAcompanantes ? d.nombresAcompanantes.value.trim() : '',
      alergias: va && d.alergias ? d.alergias.value.trim() : '',
      mensaje: d.mensaje.value.trim(),
      enviadoISO: new Date().toISOString()
    };
  }

  function validar(datos, form) {
    if (!datos.asistencia) return 'Dinos si nos acompañas o no.';
    if (!datos.nombre) return 'Escribe tu nombre completo.';
    if (!datos.email || !form.elements.email.checkValidity()) return 'Revisa tu correo electrónico.';
    return null;
  }

  function enviarRSVP(ev) {
    ev.preventDefault();

    var form = ev.currentTarget;
    var error = $('#rsvp-error');
    var boton = $('#rsvp-submit');

    var datos = recogerDatos(form);
    var problema = validar(datos, form);
    if (problema) {
      error.textContent = problema;
      error.hidden = false;
      return;
    }
    error.hidden = true;

    estado.rsvp = datos;
    guardarJSON(LS_RSVP, datos);

    if (!CFG.rsvp.endpoint) {
      mostrarExito(datos, enlaceManual(datos));
      return;
    }

    boton.disabled = true;
    boton.textContent = 'Enviando…';

    fetch(CFG.rsvp.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    }).then(function (resp) {
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      mostrarExito(datos, null);
    }).catch(function () {
      error.textContent = 'No pudimos enviar tu respuesta. Guardamos una copia en este navegador; ' +
        'inténtalo de nuevo o mándanosla directamente:';
      error.hidden = false;

      var enlace = $('#rsvp-error-enlace');
      enlace.href = enlaceManual(datos);
      enlace.textContent = CFG.rsvp.fallback === 'email' ? 'Enviar por correo' : 'Enviar por WhatsApp';
      $('#rsvp-error-manual').hidden = false;
    }).then(function () {
      boton.disabled = false;
      boton.textContent = 'Enviar confirmación';
    });
  }

  function resumenTexto(d) {
    var lineas = [
      d.evento,
      '',
      d.asistencia === 'si' ? 'SÍ asistiré' : 'No podré asistir',
      'Nombre: ' + d.nombre,
      'Correo: ' + d.email
    ];
    if (d.telefono) lineas.push('Teléfono: ' + d.telefono);
    if (d.asistencia === 'si') {
      lineas.push('Acompañantes: ' + d.acompanantes);
      if (d.nombresAcompanantes) lineas.push('Vienen conmigo: ' + d.nombresAcompanantes);
      if (d.alergias) lineas.push('Restricciones: ' + d.alergias);
    }
    if (d.mensaje) lineas.push('Mensaje: ' + d.mensaje);
    return lineas.join('\n');
  }

  function enlaceManual(d) {
    var texto = resumenTexto(d);
    if (CFG.rsvp.fallback === 'email') {
      return 'mailto:' + CFG.evento.contacto.email +
        '?subject=' + encodeURIComponent('Confirmación · ' + CFG.evento.nombre) +
        '&body=' + encodeURIComponent(texto);
    }
    return 'https://wa.me/' + CFG.evento.contacto.whatsapp + '?text=' + encodeURIComponent(texto);
  }

  function mostrarExito(d, enlace) {
    var caja = $('#rsvp-exito');
    var manual = $('#exito-manual');

    $('#exito-titulo').textContent = d.asistencia === 'si'
      ? '¡Nos vemos ahí!'
      : 'Gracias por avisarnos';

    $('#exito-texto').textContent = d.asistencia === 'si'
      ? (d.acompanantes > 0
        ? 'Quedan apartados ' + (d.acompanantes + 1) + ' lugares a nombre de ' + d.nombre + '.'
        : 'Queda apartado tu lugar, ' + d.nombre + '.')
      : 'Te vamos a extrañar. Tu lugar queda liberado.';

    if (enlace) {
      $('#exito-enlace').href = enlace;
      $('#exito-enlace').textContent = CFG.rsvp.fallback === 'email'
        ? 'Enviar por correo'
        : 'Enviar por WhatsApp';
      manual.hidden = false;
    } else {
      manual.hidden = true;
    }

    $('#rsvp-form').hidden = true;
    caja.hidden = false;
    caja.scrollIntoView({ block: 'center' });
  }

  /* =====================================================================
   * Arranque
   * =================================================================== */
  function init() {
    if (!CFG) return;
    pintarDatos();

    var sesion = sesionValida();
    if (sesion) entrar(sesion.invitado);
    else iniciarPuerta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
