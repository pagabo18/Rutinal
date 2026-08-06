# Invitación al evento anual

Página web privada para un evento por invitación: los asistentes entran con una
clave y confirman su asistencia desde la propia página.

Es un sitio **estático** (HTML, CSS y JavaScript, sin dependencias ni compilación).
Se puede abrir haciendo doble clic en `index.html` o publicarse en GitHub Pages,
Netlify, Vercel o cualquier hosting de archivos.

```
evento/
├── index.html                 estructura de la página
├── assets/
│   ├── css/styles.css         estilos
│   └── js/
│       ├── config.js          👈 lo único que necesitas editar
│       └── app.js             lógica (acceso, cuenta regresiva, RSVP)
└── tools/generar-hash.mjs     genera las claves cifradas
```

## Puesta en marcha en 3 pasos

### 1. Datos del evento

Abre `assets/js/config.js` y rellena el bloque `evento`: nombre, fecha, lugar,
código de vestimenta, fecha límite para confirmar y datos de contacto. También ahí
se editan el `programa` y las preguntas frecuentes (`faq`).

### 2. Clave de acceso

Las claves no se guardan en texto plano, sino su hash SHA-256. Genera el tuyo:

```bash
node evento/tools/generar-hash.mjs "mi-clave-secreta"
```

Copia el hash resultante en `acceso.claveHash`.

> La clave de ejemplo que viene configurada es `encuentro2026`. **Cámbiala.**

**Modo con un código por invitado.** Si prefieres que cada invitación tenga su
propio código y que la web salude a cada persona por su nombre, pon
`acceso.modo: 'codigo-invitado'` y genera la lista a partir de un CSV:

```csv
codigo,nombre,maxAcompanantes
ABC-123,Familia Ruiz,3
XYZ-777,Ana y Martín
```

```bash
node evento/tools/generar-hash.mjs --invitados invitados.csv
```

Pega el JSON que imprime dentro de `acceso.invitados`. Cada invitado puede tener
su propio número máximo de acompañantes.

Las claves se comparan sin distinguir mayúsculas, espacios ni acentos compuestos,
así que `ABC-123` y `abc 123` son equivalentes.

### 3. Dónde llegan las confirmaciones

Hay dos formas, y se eligen con `rsvp.endpoint` en el config:

**a) Sin servidor (por defecto).** Deja `endpoint: ''`. Al confirmar, la página
abre WhatsApp o el correo con el mensaje ya redactado, y guarda una copia en el
navegador del invitado para que pueda consultar o cambiar su respuesta. Tú recibes
cada confirmación como un mensaje. Es lo más simple y no requiere infraestructura.

**b) Con almacenamiento propio.** Pon en `endpoint` una URL que acepte un `POST`
con JSON, y todas las confirmaciones llegarán solas a una hoja de cálculo o base
de datos. El cuerpo enviado es:

```json
{
  "evento": "Encuentro Anual — XII Edición",
  "invitacion": "Familia Ruiz",
  "asistencia": "si",
  "nombre": "María Ruiz",
  "email": "maria@ejemplo.com",
  "telefono": "+52 55 1234 5678",
  "acompanantes": 2,
  "nombresAcompanantes": "Pedro Ruiz, Lucía Ruiz",
  "alergias": "Sin gluten",
  "mensaje": "¡Ahí estaremos!",
  "enviadoISO": "2026-10-02T18:24:11.503Z"
}
```

La opción más rápida es un Google Apps Script publicado como aplicación web que
haga `append` en una hoja de cálculo. Si el envío falla, la página no pierde la
respuesta: la guarda y ofrece el enlace de WhatsApp o correo como respaldo.

## Publicar en GitHub Pages

1. Ajusta `config.js` y haz commit.
2. En **Settings → Pages** elige la rama y la carpeta `/` (raíz).
3. La invitación queda en `https://<usuario>.github.io/<repo>/evento/`.

La página incluye `noindex, nofollow` para que los buscadores no la listen.

## Qué incluye

- Puerta de acceso con clave (única o por invitado) y sesión que dura 12 h configurables.
- Cuenta regresiva en vivo hasta el inicio del evento.
- Detalles, programa y preguntas frecuentes generados desde el config.
- Botón para añadir el evento al calendario (archivo `.ics`).
- Formulario de confirmación con acompañantes, restricciones alimentarias y mensaje.
- Cierre automático del formulario al pasar la fecha límite.
- Respuesta guardada localmente: el invitado puede volver y modificarla.
- Diseño responsive, accesible por teclado y con soporte de `prefers-reduced-motion`.

## Sobre la seguridad

La clave se valida en el navegador, así que **es una puerta de cortesía, no un
control de acceso real**: quien sepa mirar el código de la página puede leer el
contenido sin la clave. Guardar los hashes evita que las claves se vean a simple
vista, pero no impide un ataque de diccionario contra una clave débil.

Sirve perfectamente para mantener un evento fuera del radar del público general.
Si el contenido es realmente sensible (direcciones privadas, lista completa de
asistentes), hace falta un servidor que autentique de verdad antes de entregar el
contenido — dímelo y lo montamos con Supabase.
