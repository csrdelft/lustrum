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
    "revision": "2dd7d93afea657f7c87bb60ae75bf608"
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
    "revision": "6daf5d258fdb4266216c57b45cba31f4"
  },
  {
    "url": "index.html",
    "revision": "8d25c6462fefd3b1f0c5260d3918b700"
  },
  {
    "url": "manifest.json",
    "revision": "445711282b172515ad9a87e942266e8e"
  }
]);

workboxSW.router.registerRoute(
  '/(.*)',
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
