const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
  '/sip',
  'index.html',
  'homepage.html',
  'floordeflection.html',
  'deflection.html',
  'js/app.js',
  'js/ui.js',
  'css/output.css',
  'css/input.css',
  'tailwind.config.js',
  'img/230113-SIPS-CHP2-images-Fig-2-3-2-Roof-Panel-Example-Bending-App-Elevation_Fig 2.3.1 Slope Length of Panel copy.jpg',
  'img/230113-SIPS-CHP2-images-Fig-2-3-2-Roof-Panel-Example-Bending-APP-Section.jpg',
  'img/240228-floor-panel-32-32-32.jpg',
  'img/240301_Colon_Cover-royal-app-front-coverAPP.jpg',
  'img/240301_Panel_Sections_Standard_Reinforced.jpg',
  'img/240301_Two_or_more_span_panel_elevation-33.jpg',
  'img/app-background.jpg',
  'fallback.html',
  'img/512x512app-icon.png'

  ];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(dynamicCacheName, 15);
          return fetchRes;
        })
      });
    }).catch(() => {
      if(evt.request.url.indexOf('.html') > -1){
        return caches.match('fallback.html');
      } 
    })
  );
});



//24.06.24 VERSION ONLINE

// const cacheName = 'cache-v1';
// const cacheAssets = [
//   '/sip',
//   'index.html',
//   'homepage.html',
//   'floordeflection.html',
//   'deflection.html',
//   'js/app.js',
//   'js/ui.js',
//   'css/output.css',
//   'css/input.css',
//   'tailwind.config.js',
//   'img/230113-SIPS-CHP2-images-Fig-2-3-2-Roof-Panel-Example-Bending-App-Elevation_Fig 2.3.1 Slope Length of Panel copy.jpg',
//   'img/230113-SIPS-CHP2-images-Fig-2-3-2-Roof-Panel-Example-Bending-APP-Section.jpg',
//   'img/240228-floor-panel-32-32-32.jpg',
//   'img/240301_Colon_Cover-royal-app-front-coverAPP.jpg',
//   'img/240301_Panel_Sections_Standard_Reinforced.jpg',
//   'img/240301_Two_or_more_span_panel_elevation-33.jpg',
//   'img/app-background.jpg',
//   'fallback.html',
//   'img/512x512app-icon.png'
// ];

// // Install event
// self.addEventListener('install', e => {
//   console.log('Service Worker: Installed');
//   e.waitUntil(
//     caches.open(cacheName)
//       .then(cache => {
//         console.log('Service Worker: Caching Files');
//         return cache.addAll(cacheAssets);
//       })
//       .then(() => self.skipWaiting())
//   );
// });

// // Activate event
// // self.addEventListener('activate', e => {
// //   console.log('Service Worker: Activated');
// //   e.waitUntil(
// //     caches.keys().then(cacheNames => {
// //       return Promise.all(
// //         cacheNames.map(cache => {
// //           if (cache !== cacheName) {
// //             console.log('Service Worker: Clearing Old Cache');
// //             return caches.delete(cache);
// //           }
// //         })
// //       );
// //     })
// //   );
// // });




// // Fetch event
// self.addEventListener('fetch', e => {
//   console.log('Service Worker: Fetching');
//   e.respondWith(
//     fetch(e.request).catch(() => caches.match(e.request))
//   );
// });

