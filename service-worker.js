importScripts('./build/workbox-sw.prod.v1.0.0.js');

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
    "revision": "4b87c9ebf2710203b76c16d107d561bf"
  },
  {
    "url": "build/polyfills.js",
    "revision": "6da628b2e650e6734c5a204397fc942a"
  },
  {
    "url": "build/workbox-sw.prod.v1.0.0.js",
    "revision": "9029a00430d1c6ccf363f3ad77c45d42"
  },
  {
    "url": "build/main.css",
    "revision": "4e0a16b2195a13c3b07fa1b752565899"
  },
  {
    "url": "index.html",
    "revision": "0ce37de4f884a0210b0ffd693eda0e1a"
  },
  {
    "url": "manifest.json",
    "revision": "445711282b172515ad9a87e942266e8e"
  }
]);

/**
 * Cache First strategy for all local resources, except this Service
 * Worker itself.
 */
workboxSW.router.registerRoute(
  /\/(?!.*service\-worker\.js)(.*)/,
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
