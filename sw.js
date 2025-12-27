const CACHE_NAME = 'darka-hunter-v1';

// ინსტალაციის დროს ქეშავს ძირითად ფაილებს
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
      ]);
    })
  );
});

// მონაცემების წამოღება (Network First სტრატეგია - ჯერ ინტერნეტს ამოწმებს, რომ ლაივ ამინდი იყოს)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
