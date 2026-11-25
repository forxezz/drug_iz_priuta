const VERSION = 'v2';
const SCOPE = self.registration.scope;
const CACHE_PREFIX = `variantnn-web:${SCOPE}:`;
const CACHE_NAME = CACHE_PREFIX + VERSION;

const FILES = [
  "./main.html",
  "./catalog.html",
  "./forma.html",
  "./style.css",
  "./catalog.js",
  "./manifest.webmanifest",
  "./p/images(3).jfif",
  "./p/images(4).jfif",
  "./p/images(5).jfif"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES.map(path => new Request(path, { cache: "reload" })));
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
             .map(name => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || !event.request.url.startsWith(SCOPE)) return;
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});