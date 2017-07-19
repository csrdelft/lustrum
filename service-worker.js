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
    "revision": "ee351a06913ca8704b5e0824667a04f8"
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
    "revision": "a26992d3399fadf2102cadd710ed5525"
  },
  {
    "url": "index.html",
    "revision": "cef537f8cce1ba58abfab3d2b1b994ba"
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
