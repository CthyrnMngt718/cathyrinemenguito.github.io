// ============================================
// SERVICE WORKER - Offline Support
// ============================================

const CACHE_NAME = 'cathyrine-portfolio-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/projects.html',
    '/style.css',
    '/script.js',
    '/1000014492.jpg',
    '/Signature.png',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/favicon-32x32.png',
    '/favicon-16x16.png',
    '/site.webmanifest'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching assets...');
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Return cached response if available
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Otherwise fetch from network
                return fetch(event.request).then((networkResponse) => {
                    // Cache the fetched response for future
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                }).catch(() => {
                    // Fallback for offline - show a friendly message
                    return new Response(
                        '<html><body style="background:#070a08;color:#e8f5ed;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;text-align:center;padding:20px;"><div><h1 style="color:#00ffab;">🔌 Offline</h1><p>You\'re offline. Please check your internet connection.</p><p style="color:#9ab8aa;font-size:0.9rem;">But don\'t worry — you can still view cached content!</p></div></body></html>',
                        { headers: { 'Content-Type': 'text/html' } }
                    );
                });
            })
    );
});
