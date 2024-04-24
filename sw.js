const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v1';
const assets = [
  '/',
  '/index.html',
  '/pages/homepage.html',
  '/pages/floordeflection.html',
  '/pages/deflection.html',
  '/js/app.js',
  '/js/ui.js',
  '/css/output.css',
  '/css/input.css',
  '/tailwind.config.js', 
  '/sw.js', 
  '/img/230113-SIPS-CHP2-images-Fig-2-3-2-Roof-Panel-Example-Bending-App-Elevation_Fig 2.3.1 Slope Length of Panel copy.jpg',
  '/img/230113-SIPS-CHP2-images-Fig-2-3-2-Roof-Panel-Example-Bending-APP-Section.jpg',
  '/img/240228-floor-panel-32-32-32.jpg',
  '/img/240301_Colon_Cover-royal-app-front-coverAPP.jpg',
  '/img/240301_Panel_Sections_Standard_Reinforced.jpg',
  '/img/240301_Two_or_more_span_panel_elevation-33.jpg',
  '/img/app-background.jpg',
  '/pages/fallback.html'

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
        return caches.match('/pages/fallback.html');
      } 
    })
  );
});