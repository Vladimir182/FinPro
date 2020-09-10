const CACHE_NAME = 'sw';
const OFFLINE_URL = './offline.html';

self.addEventListener('install', event => {
  //@ts-ignore
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('INSTALL CACHE ADD ALL')
      return cache.addAll([
        OFFLINE_URL
      ])
    })
  )
});

self.addEventListener('activate', event => {
  //@ts-ignore
  event.waitUntil(async () => {
  //   if ('navigationPreload' in self.registration) {
  //     await self.registration.navigationPreload.enable();
  //   }
  // }  
  //   caches.keys().then(function(cacheNames) {
  //     return Promise.all(cacheNames.filter(cacheName => cacheName).map(cacheName => caches.delete(cacheName)))
  //   })
  })
});

self.addEventListener('fetch', (event) => {
  
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }
  
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(async () => {
      try {
        // const preloadResponse = await event.preloadResponse;
        // if (preloadResponse) {
        //   return preloadResponse;
        // }

        const networkResponse = await fetch(event.request);
        
        return networkResponse;
      } catch (error) {
        // catch is only triggered if an exception is thrown, which is likely
        // due to a network error.
        // If fetch() returns a valid HTTP response with a response code in
        // the 4xx or 5xx range, the catch() will NOT be called.

        console.log('Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    });
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