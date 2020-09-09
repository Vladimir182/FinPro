
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const CACHE_NAME = 'finpro-cache';
const urlsToCache = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/asset-manifest.json',
  '/index.html',
  '/service-worker.js',
  '/static/css/main.62ccc8ee.chunk.css',
  '/static/js/2.72faf3fd.chunk.js',
  '/static/js/main.5f587384.chunk.js',
  '/static/js/runtime-main.6741a0d1.js',
  // '/static/media/absence_img.85c6a9b5.svg',
  // '/static/media/absence.65e456ed.svg',
  // '/static/media/ArrowLeft.152537a5.svg',
  // '/static/media/ArrowRight.d6326620.svg',
  // '/static/media/ArrowRightShort.4d2648d1.svg',
  // '/static/media/Balance.05e544d2.svg',
  // '/static/media/check_img.f4852129.svg',
  // '/static/media/Deposit.ee17c615.svg',
  // '/static/media/DepositAction.4b9d013b.svg',
  // '/static/media/Error.fbf932dd.svg',
  // '/static/media/icon_new_voucher.92f39728.svg',
  // '/static/media/icon_voucher.c07af7a0.svg',
  // '/static/media/logo.ca41249f.svg',
  // '/static/media/paper_check.4ee29de4.svg',
  // '/static/media/Roboto-Black.5ebb24ee.ttf',
  // '/static/media/Roboto-Bold.e07df86c.ttf',
  // '/static/media/Roboto-Regular.11eabca2.ttf',
  '/static/media/serverError.2584541a.svg',
  // '/static/media/Withdraw.0016fafd.svg',
  // '/static/media/WithdrawAction.fcf72ed3.svg'
];

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(
      process.env.PUBLIC_URL,
      window.location.href
    );
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      // const swUrl = `./static/js/service-worker.js`;
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.ts`;
      console.log('URL TS', swUrl)
      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Service worker is ready.'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });

    window.addEventListener('install', event => {
      console.log('SW INSTALL')
      //@ts-ignore
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => cache.addAll(urlsToCache))
      )
    });

    window.addEventListener('activate', event => {
      console.log('SW ACTIVATE')
      //@ts-ignore
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(cacheNames.filter(cacheName => cacheName).map(cacheName => caches.delete(cacheName)))
        })
      )
    });

    window.addEventListener('fetch', (event: any) => {
      console.log('SW FETCH')
      event.respondWith(
        caches.match(event.request).then((response: any) => {
          console.log('SERVICE-WORCKER RESPONSE', response)
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
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See https://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' }
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
