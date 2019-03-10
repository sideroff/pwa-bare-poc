const CACHE_NAME = "V1"

const prefetchedResources = ['/', '/src/index.js', '/src/index.css']

// service worker states = registration, instalation, activation

// sw has a scope, where it cannot access fils AT or ABOVE its level


// The install event is fired when the registration succeeds.
// After the install step, the browser tries to activate the service worker.
// Generally, we cache static resources that allow the website to run offline
self.addEventListener('install', event => {
  debugger;
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(prefetchedResources)
      })
  )
})

self.addEventListener('activate', event => {
  return caches.keys().then(keyList => {
    return Promise.all(keyList.map(key => {
      if (key !== CACHE_NAME) return caches.delete(key)
    }))
  })
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});