const CACHE_NAME = 'url_cache';
const VERSION = '0.0.1';

const PRECACHE_URLS = [
  'manifest.webmanifest',
  '/',
  'favicon.ico',
  'img/icon_192.png',
  'img/icon_512.png',
  'lib/p5.min.js',
  'script/sketch.js',
];

// on installation of the service worker
self.addEventListener('install', (event) => event.waitUntil(() => {
  console.log(`service-worker version ${VERSION} installed`);
  Promise.resolve();
}));


// on activation of the service worker
self.addEventListener('activate', (event) => event.waitUntil(

  //cleanup cache
  caches.delete(CACHE_NAME)
    .then(() => caches.open(CACHE_NAME))
    .then((cache) => {
      console.log('cache open');

      //precache the urls
      return cache.addAll(PRECACHE_URLS);
    })
    .then(() => console.log(`service-worker version ${VERSION} activated`))

));


// fetch from cache
self.addEventListener('fetch', (event) =>

  // cache lookup
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        console.debug(`fetch ${event.request.url}`);

        if (response) {
          // return cached request
          console.debug(`cache hit`);
          return response;
        }

        // cache miss, fetch request
        console.debug(`cache miss, fetch resource`);

        return fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {

              // add successful request to cache
              const cacheResponse = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, cacheResponse))
                .then(() => console.debug(`cached request ${event.request.url}`));
            }

            return response;
          })

      })
  )

);