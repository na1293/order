// === Chuyên xử lý event click từ HTML

// 1. Chọn tất cả các link dẫn đến một ID (bắt đầu bằng #)
// Bạn có thể thêm class cho các link menu để chọn chính xác hơn, ví dụ: 'a.menu-link'
const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        const Nextbtn = document.getElementById("Nextbtn");
        if (Nextbtn) Nextbtn.style.display = "block"; // Hiện nút "Tiếp theo" khi click vào menu
        const id = this.getAttribute('href'); 

        // 2. Kiểm tra xem ID này có thuộc danh sách menu không (để tránh bắt nhầm link #home, #top...)
        const categoryKey = id.substring(1); 
        if (menu[categoryKey]) { // Chỉ chạy nếu key này tồn tại trong object menu của bạn
            
            e.preventDefault(); // Chặn nhảy "cạch" một cái để xử lý mượt hơn

            // Hiện thị box order
            const orderBox = document.querySelector("#order-box");
            if (orderBox) {
                orderBox.style.display = "block";
            }

            // Render dữ liệu linh hoạt theo ID
            render(id);

            // Cuộn trang mượt mà
            const orderSection = document.querySelector("#title-order-nav");
            if (orderSection) {
                orderSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Cập nhật hàm topping trong load.js
let countStage = 0;
function topping() {
    const orderTopping = document.querySelector("#order-topping");
    const orderBox = document.querySelector("#order-box");
    const orderSection = document.querySelector("#title-order-nav");
    const preview = document.getElementById("preview-end-page");

    // if (orderBox) orderBox.style.display = "none"; // Ẩn món chính
    if (orderTopping) {
        orderTopping.style.display = "flex"; // Hiện khu vực topping
        if (countStage === 0) {
            di_chuyen_len()
            render('#topping');
            countStage += 1;
        } else if (countStage === 1) {
            di_chuyen_len()
            render('#drinks');
            countStage += 1;
        } else {
            const done = confirm("Bạn đã đặt xong?")
            if (done) {
                di_chuyen_xuong();
            }
        }
        
        function di_chuyen_len() {
            orderSection.scrollIntoView({ behavior: 'smooth' });
        }

        function di_chuyen_xuong() {
            preview.scrollIntoView({ behavior: 'smooth' });
        }
    }
}