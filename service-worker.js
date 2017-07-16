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
    "revision": "317bd29749ba8559de010fac5422d054"
  },
  {
    "url": "build/polyfills.js",
    "revision": "cdb289d3a60d7aa4b10424dbe2cd76c4"
  },
  {
    "url": "build/vendor.js",
    "revision": "e8adc72e2430b99e98130bbb350d4a93"
  },
  {
    "url": "build/workbox-sw.prod.v1.1.0.js",
    "revision": "df86dfc69c6d017722ecb8a16d34c849"
  },
  {
    "url": "build/main.css",
    "revision": "84012be5d8f8df448d3689a8f4c94a36"
  },
  {
    "url": "index.html",
    "revision": "bce33dea145884626db25c4bf2c50c98"
  },
  {
    "url": "manifest.json",
    "revision": "445711282b172515ad9a87e942266e8e"
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
