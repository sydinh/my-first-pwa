const CACHE_NAME = 'my-first-pwa-cache-v1';
const urlsToCache = [
  './',
  './css/built-in.css',
  './css/built-in-offline-page.css',
  './js/babel.js',
  './js/react.development.js',
  './js/react-dom.development.js',
  './js/built-in.js',
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// Cache and return requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      const fetchRequest = event.request.clone();
      return fetch(fetchRequest).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});

// Update service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [
    'my-first-pwa-cache-v1-foo',
    'my-first-pwa-cache-v1-bar',
  ];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
