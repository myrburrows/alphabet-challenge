// Version 3.1: cache the application shell, refresh the database online.
const CACHE = 'alphabet-challenge-shell-v3.1';
const DATA_CACHE = 'alphabet-challenge-data-v3.1';
const SHELL = ['./', './index.html', './styles.css', './app.js',
  './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE && key !== DATA_CACHE)
      .map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const url = new URL(req.url);
  if (url.pathname.endsWith('/answers.json')) {
    event.respondWith((async () => {
      const cache = await caches.open(DATA_CACHE);
      try {
        const response = await fetch(req, {cache: 'no-store'});
        if (!response.ok) throw new Error('Database fetch failed');
        const data = await response.clone().json();
        if (!Array.isArray(data) || !data.every(x => x && typeof x.c === 'string' && typeof x.a === 'string' && typeof x.h === 'string')) throw new Error('Invalid database');
        await cache.put(req, response.clone());
        return response;
      } catch (err) {
        const saved = await cache.match(req, {ignoreSearch: true});
        if (saved) return saved;
        throw err;
      }
    })());
    return;
  }
  // Network-first shell: pick up GitHub updates, retain offline support.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(req);
      if (response.ok && url.pathname.startsWith(new URL(self.registration.scope).pathname)) {
        await cache.put(req, response.clone());
      }
      return response;
    } catch (err) {
      const saved = await cache.match(req);
      if (saved) return saved;
      throw err;
    }
  })());
});
