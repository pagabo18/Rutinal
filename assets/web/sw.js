// Service worker de Rutinal (PWA): app shell offline-first.
// Sube la versión del caché en cada release para forzar actualización.
const CACHE = 'rutinal-v1.28.0';
const SHELL = [
  './',
  './index.html',
  './i18n_extra.js',
  './i18n.js',
  './food_db.js',
  './gym_db.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './privacy.html',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== 'rutinal-gym-img').map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Imágenes de ejercicios (free-exercise-db en GitHub): caché primero, para verlas sin conexión
  if (url.hostname === 'raw.githubusercontent.com' && url.pathname.startsWith('/yuhonas/free-exercise-db/')) {
    e.respondWith(caches.open('rutinal-gym-img').then((c) => c.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      if (res.ok || res.type === 'opaque') c.put(e.request, res.clone());
      return res;
    }))));
    return;
  }
  // APIs externas (USDA / Open Food Facts): siempre red, sin caché
  if (url.origin !== self.location.origin) return;
  // App shell: red primero (para tomar updates) con caché como respaldo offline
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || caches.match('./index.html')))
  );
});
