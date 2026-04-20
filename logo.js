window.addEventListener('load', () => {
    const splash = document.getElementById('splashScreen');
    const CURRENT_VERSION = "2.0"; 

    // 1. Kiểm tra xem đã xem Splash của Version này ở máy này bao giờ chưa (Dùng lâu dài)
    const lastSeenVersion = localStorage.getItem('welcomeScreenSeen');
    
    // 2. Kiểm tra xem trong lần vào app này (phiên này) đã hiện chưa
    const hasSeenInSession = sessionStorage.getItem('splashShownThisSession');

    // LOGIC: 
    // Nếu Version cũ HOẶC Chưa hiện trong phiên này -> Cho hiện Splash
    if (lastSeenVersion === CURRENT_VERSION && hasSeenInSession) {
        splash.remove();
        return;
    }

    splash.style.display = 'flex'; 
    
    setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.5s ease';
        
        // Lưu lại cả 2 nơi
        localStorage.setItem('welcomeScreenSeen', CURRENT_VERSION);
        sessionStorage.setItem('splashShownThisSession', 'true');

        setTimeout(() => {
            splash.remove();
        }, 500); 
    }, 3000);
});