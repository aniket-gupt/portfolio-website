const CACHE_NAME = 'abhijeet-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/assets/AbhijeetBhalePortfolio.jpg',
  '/assets/cursor.png',
  '/assets/android-chrome-512x512.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 