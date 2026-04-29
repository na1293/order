function show_help() {
    const menu = document.querySelector(".menu-order");
    menu.classList.toggle("active");

    const menu_popup = document.getElementById("menu-popup");

    menu_popup.addEventListener("click", function(event) {
        // Kiểm tra xem cái bị bấm có phải là thẻ <a> không
        if (event.target.tagName === "A") {
            // Đóng menu sau khi chọn xong cho đúng chuẩn UX
            menu_popup.classList.remove("active");
        }
    });
}