importScripts('./build/workbox-sw.prod.v1.1.0.js');

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
    "revision": "b914e5abf65631a949959a472127a3bd"
  },
  {
    "url": "build/polyfills.js",
    "revision": "cdb289d3a60d7aa4b10424dbe2cd76c4"
  },
  {
    "url": "build/vendor.js",
    "revision": "f24884e20d026f02c7fb13ffc83916fb"
  },
  {
    "url": "build/workbox-sw.prod.v1.1.0.js",
    "revision": "df86dfc69c6d017722ecb8a16d34c849"
  },
  {
    "url": "build/main.css",
    "revision": "a9b5dce631b6f570be7a87217b90a84e"
  },
  {
    "url": "index.html",
    "revision": "12e60a37839251fa12530144f95e3418"
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
      maxAgeSeconds: 28 * 24 * 60 * 60,
    },
    cacheableResponse: {
      statuses: [0, 200]
    }
  })
);
