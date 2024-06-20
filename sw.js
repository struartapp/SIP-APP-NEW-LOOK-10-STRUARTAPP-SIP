const cacheName = 'cache-v1';
const request = new Request('https://third-party-no-cors.com/', {
  mode: 'no-cors',
});

const cacheAssets = [
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
  'fallback.html'
];

// Call install event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches  
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())

  );

});

// Call Active Event

// self.addEventListener('activate', e => {
//   console.log('Service Worker: Activated');
//   //remove unwanted caches
//   e.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cache =>{
//           if(cache !== cacheName) {
//             console.log('Service worker: Clearing Old Cache');
//             return caches.delete(cache);
//           }

//         })
//       )
//     })
//   );

// });

fetch('https://struartapp.com/sip', {
  mode: 'no-cors'
})
  .then(response => console.log(response))
  .catch(error => console.error(error));


//Call Fetch Event
self.addEventListener ('fetch', e =>{
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request))
  )
});

// Assume `cache` is an open instance of the Cache class.
// fetch(request).then(response => cache.put(request, response));

