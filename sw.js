/* sw.js — funciona sin conexión en la pista.
   Estrategia:
   · HTML (navegación): RED PRIMERO, caché de respaldo -> las actualizaciones llegan solas.
   · Resto (js/css/iconos): CACHÉ PRIMERO con revalidación en segundo plano.
   · Otros orígenes (YouTube, Rollerblade): NO se interceptan.
   Al cambiar archivos, sube CACHE_VERSION. */
const CACHE_VERSION = 'rts-v7.1.0';
const CORE = ['./', './index.html', './styles.css', './plan.js', './guide.js', './schedule.js', './progression.js', './coach.js', './store.js', './app.js',
              './manifest.webmanifest', './favicon.svg', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('rts-') && k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;               // no tocar YouTube / Rollerblade

  if (req.mode === 'navigate') {                            // HTML: red primero
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(                                            // estáticos: caché + revalidar
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); } return res; }).catch(() => hit);
      return hit || net;
    })
  );
});
