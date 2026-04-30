document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault();
  }
}, { passive: false });

document.addEventListener('dblclick', function (event) {
  event.preventDefault();
}, { passive: false });

if ('serviceWorker' in navigator) {
  // Đợi trang load xong mới đăng ký để không làm chậm app
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('✅ SW Registered với scope:', registration.scope);
        
        // Kiểm tra nếu có bản update mới
        registration.onupdatefound = () => {
          console.log('🔄 Đang tìm thấy bản cập nhật mới...');
        };
      })
      .catch(err => {
        console.error('❌ SW Registration thất bại:', err);
      });
  });
}