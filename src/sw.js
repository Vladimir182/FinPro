const CACHE_NAME = 'sw';

self.addEventListener('install', event => {
  //@ts-ignore
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll([
      './',
      './*',
      'favicon.png',
    ]))
  )
});

self.addEventListener('activate', event => {
  //@ts-ignore
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.filter(cacheName => cacheName).map(cacheName => caches.delete(cacheName)))
    })
  )
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then(response => {
        if(!response || response.status !== 200 || response.type !== 'basic') {
        return response;
        }

        let clonedResponse = response.clone();

        caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, clonedResponse)
        })

        return response;
      })
    })
  )
});