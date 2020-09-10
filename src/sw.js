const CACHE_NAME = 'sw';

self.addEventListener('install', event => {
  //@ts-ignore
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('INSTALL CACHE ADD ALL')
      return cache.addAll([
        './',
        '/index.html',
        '/favicon.ico',
        '/manifest.json'
      ])
    })
  )
});

self.addEventListener('activate', event => {
  //@ts-ignore
  // event.waitUntil(
  //   caches.keys().then(function(cacheNames) {
  //     return Promise.all(cacheNames.filter(cacheName => cacheName).map(cacheName => caches.delete(cacheName)))
  //   })
  // )
});

self.addEventListener('fetch', (event) => {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
          // Return the offline page
          // return caches.match(offlineUrl);
          return ('<p>Offline</p>')
      })
    );
  }
  event.respondWith(
    caches.match(event.request).then((response) => {
      console.log('RESPONSE', response)
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
      }).catch(() => {
        caches.match(event.request).then(cachedResponse => cachedResponse)
      })
    })
  )
});