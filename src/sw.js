const CACHE_NAME = 'sw';
const OFFLINE_URL = './offline.html';

self.addEventListener('install', event => {
  //@ts-ignore
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
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
  console.log('EVENT', event)
  console.log('REQUEST', event.request)
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    cosnoel.log('RETURN AT COND')
    return;
  }
  
  // if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
  //   event.respondWith(async () => {
  //     try {
  //       const networkResponse = await fetch(event.request);
        
  //       return networkResponse;
  //     } catch (error) {
  //       const cache = await caches.open(CACHE_NAME);
  //       const cachedResponse = await cache.match('./offline.html');
  //       return cachedResponse;
  //     }
  //   });
  // }

  event.respondWith(
    caches.match(event.request).then((response) => {

      console.log('SW response', response)
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