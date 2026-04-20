window.addEventListener('load', () => {
    const splash = document.getElementById('splashScreen');
    const CURRENT_VERSION = "2.0"; // Update tại đây
    const lastSeenVersion = localStorage.getItem('welcomeScreenSeen');

    if (lastSeenVersion === CURRENT_VERSION) {
        splash.remove(); // Xóa hẳn dom
        return;
    }

    splash.style.display = 'flex'; 
    
    setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.transition = 'opacity 0.5s ease';
        
        localStorage.setItem('welcomeScreenSeen', CURRENT_VERSION);

        setTimeout(() => {
            splash.remove();
        }, 500); 
    }, 3000);
});