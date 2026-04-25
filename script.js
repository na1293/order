// Chỉ xử lý phần id và di chuyển
const openid = ["#main-info"]; // Khai báo di chuyển đến main-info
let info2 = document.getElementById("info-2");
let main = document.getElementById("main")
let count_info = 0;
info2.addEventListener("click", function() {
    const target = document.querySelector(openid[count_info]);
    main.style = "flex"
    target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Xử lý reset

const resetData = document.getElementById("resetData")
resetData.addEventListener("click", function() {
    const resetAsk = confirm("Bạn có muốn tạo phiên mới?\nĐiều đó có thể làm mất dữ liệu hiện tại")
    if (resetAsk) { 
        localStorage.clear();
        location.reload();
    }
})