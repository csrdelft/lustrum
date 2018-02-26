importScripts('./build/workbox-sw.prod.v2.1.2.js');

const workboxSW = new WorkboxSW({
  clientsClaim: true,
  skipWaiting: true
});

/**
 * This array will be populated by workboxBuild.injectManifest() when the
 * production service worker is generated.
 */
workboxSW.precache([
  {
    "url": "build/main.js",
    "revision": "f5c761ddc892f92d7ddd08d6c261e220"
  },
  {
    "url": "build/polyfills.js",
    "revision": "443c697fc904cd88a651d09cf5c2fe2b"
  },
  {
    "url": "build/vendor.js",
    "revision": "5b86560c55660e67ee34229d5214c161"
  },
  {
    "url": "build/workbox-sw.prod.v2.1.2.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
  },
  {
    "url": "build/main.css",
    "revision": "62c4ac531fe5318441a1d5afadad388d"
  },
  {
    "url": "index.html",
    "revision": "0a86d1dd4df031356e5927088150788b"
  },
  {
    "url": "manifest.json",
    "revision": "272e3a798d8c850caedf0f86fc8330b8"
  }
]);

workboxSW.router.registerRoute(
  /\/assets\/(.*)/,
  workboxSW.strategies.cacheFirst()
);

workboxSW.router.registerRoute(
  'https://csrdelft.nl/API/(.*)',
  workboxSW.strategies.networkFirst()
);

workboxSW.router.registerRoute(
  'https://csrdelft.nl/plaetjes/(.*)',
  workboxSW.strategies.cacheFirst({
    cacheName: 'plaetjes',
    cacheExpiration: {
      maxAgeSeconds: 28 * 24 * 60 * 60
    },
    cacheableResponse: {
      statuses: [0, 200]
    }
  })
);
