function show_help() {
    const menu = document.querySelector(".menu-order");
    const menu_order_close = document.getElementById("menu-order-close");
    
    // Toggle menu khi bấm nút Help
    menu.classList.toggle("active");

    // Lắng nghe sự kiện click trên nút đóng (dấu ×)
    menu_order_close.addEventListener("click", function() {
        // Đóng menu
        menu.classList.remove("active");
    }, { once: true }); // Thêm { once: true } để tự hủy event sau khi đóng, tránh bị lặp listener
}