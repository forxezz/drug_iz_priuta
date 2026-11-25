const VERSION = 'v2';
const SCOPE = self.registration.scope;
const CACHE_PREFIX = `variantnn-web:${SCOPE}:`;
const CACHE_NAME = CACHE_PREFIX + VERSION;

const FILES = [
  "./main.html",
  "./catalog.html",
  "./forma.html",
  "./style.css",
  "./catalog-page.js",
  "./manifest.webmanifest",
  "./p/images(3).jfif",
  "./p/images(4).jfif",
  "./p/images(5).jfif"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const path of FILES) {
        try {
          await cache.add(new Request(new URL(path, SCOPE), { cache: "reload" }));
        } catch (err) {
          // Если файла нет, просто пишем предупреждение, но не ломаем установку
          console.warn(`Не удалось закэшировать: ${path}`, err);
        }
      }
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
      // Если файл есть в кэше — возвращаем его. Если нет — пробуем загрузить из сети.
      return response || fetch(event.request).catch(() => {
          // Если сети нет, и файла нет в кэше — возвращаем заглушку, чтобы не было ошибки
          return new Response("Ресурс недоступен в офлайн-режиме", { status: 404 });
      });
    })
  );
});