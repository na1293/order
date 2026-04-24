// Danh sách tài nguyên cần để app "sống sót" khi mất mạng
const urlsToCache = [
  '/',
  '/index.html',
  
  // --- DÀN CSS ---
  '/CSS/styles.css',
  '/CSS/mobile.css',
  '/CSS/food.css',
  '/CSS/order.css',
  '/CSS/menu.css',
  '/CSS/text.css',
  '/CSS/element.css',
  '/CSS/color.css',
  '/CSS/logo.css',

  // --- DÀN SCRIPT ---
  '/script.js',
  '/load.js',
  '/order.js',
  '/menu.js',
  '/render_after_order.js',
  '/order-gr.js',
  '/popup_Menu.js',
  '/logo.js',

  // Ảnh
  '/img/noodles.WebP',
  '/img/noodles_hot.WebP',
  '/img/spaghetti.WebP',
  '/img/black_bean_noodles.WebP',
  '/img/rice.WebP',
  '/img/kimbap.WebP',
  '/img/kimbap_fried.WebP',
  '/img/egg.WebP',
  '/img/chicken.WebP',
  '/img/fishcake.WebP',
  '/img/kimchi.WebP',
  '/img/pho_mai.WebP',
  '/img/sausage.WebP',
  '/img/grilledmeat.WebP',
  '/img/lemontea.WebP',
  '/img/teago.WebP',
  '/img/tea_fruit.WebP',
  '/img/tokbokki.WebP',
  '/img/bim-bim.WebP',
  '/img/icon-192-ver-5.png' // Icon app
];

const CACHE_NAME = 'menu-v5'; // Dùng để thay đổi ver cache

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 1. Chạy việc cache các file
      const cacheAction = Promise.allSettled(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('Không cache được:', url, err);
          })
        )
      );
      self.skipWaiting(); 

      return cacheAction;
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});