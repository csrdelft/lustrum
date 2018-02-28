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
    "revision": "64c754a77386abcf52817c5129ecc0dd"
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
    "revision": "197ff118395be4e0d34d88e9dba6e474"
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
