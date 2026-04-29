const CACHE_NAME = 'offline-v2';
// Thêm file CSS vào danh sách cần lưu trữ
const ASSETS_TO_CACHE = [
  '/offline.html',
  '/CSS/text.css'  // Đảm bảo đường dẫn này đúng với thư mục của bạn
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      })
    );
  } else {
    // Kiểm tra nếu là yêu cầu file CSS đã có trong cache thì trả về luôn
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});