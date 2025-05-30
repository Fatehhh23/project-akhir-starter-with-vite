const CACHE_NAME = 'storyapp-v2';
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/favicon.png',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // tambahkan file CSS/JS dari build kamu jika perlu
];

// Install event: caching shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event: bersihkan cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch event: strategi cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Untuk data API, gunakan network first
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, cloned));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Untuk asset shell, gunakan cache first
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});

// Push event: tampilkan notifikasi
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {
    title: 'StoryAPP',
    body: 'Ada update baru!',
    icon: '/icons/icon-192x192.png',
  };

  const options = {
    body: data.body,
    icon: data.icon,
    badge: '/icons/icon-192x192.png',
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
