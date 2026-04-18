function show_help() {
    const menu = document.querySelector(".menu-order");
    menu.classList.toggle("active");

    const menu_popup = document.getElementById("menu-popup");

    menu_popup.addEventListener("click", function(event) {
        // Kiểm tra xem cái bị bấm có phải là thẻ <a> không
        if (event.target.tagName === "A") {
            console.log("Bạn vừa bấm vào: " + event.target.innerText);
            
            // Đóng menu sau khi chọn xong cho đúng chuẩn UX
            menu_popup.classList.remove("active");
            
            // Nếu href là link trống (#), bạn có thể dùng event.preventDefault() 
            // để trang không bị load lại hoặc nhảy lên đầu trang.
        }
    });
}