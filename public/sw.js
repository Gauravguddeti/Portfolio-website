const CACHE_NAME = 'portfolio-v1'
const STATIC_ASSETS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  // Add other static assets
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Cache successful responses
            const responseToCache = response.clone()
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })

            return response
          })
      })
      .catch(() => {
        // Return fallback for HTML requests
        if (event.request.destination === 'document') {
          return caches.match('/')
        }
      })
  )
})
