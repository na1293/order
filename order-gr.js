// Xử lý cuối cùng

function dat_nhom() {
    // 1. Hiển thị khu vực tính toán tiền
    const pay = document.getElementById("pay");
    pay.style.display = "block";

    // 2. Lấy dữ liệu từ bộ nhớ
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || [];
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    if (currentOrder.length <= 0) {
        alert("Đơn hàng tối thiểu 5.000đ để tiến hành đặt");
        return;
    }

    // 3. LOGIC QUAN TRỌNG: Chỉ đóng gói nếu currentOrder có món
    if (currentOrder.length > 0) {
        // Lưu nguyên mảng món ăn hiện tại thành 1 nhóm trong lịch sử
        orderHistory.push(currentOrder);
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

        // Xóa sạch bộ nhớ tạm để chuẩn bị cho phiên đặt mới
        localStorage.removeItem('currentOrder');
    }

    // 4. RENDER TOÀN BỘ LỊCH SỬ (Bộ nhớ mới)
    const nav_pay = document.getElementById("nav-pay");
    let finalHtml = "";

    orderHistory.forEach((group, index) => {
        let itemsHtml = "";
        let groupTotal = 0;

        // Duyệt qua từng món trong nhóm (lần đặt) đó
        group.forEach(item => {
            const price = item.price_backend || 0;
            const quantity = item.quantity || 0;
            itemsHtml += `${item.name} - ${price.toLocaleString()} VND (x${quantity})<br>`;
            groupTotal += price * quantity;
        });

        // Tạo bản sao hộp theo đúng số lần đặt
        finalHtml += `
        <div class="box" style="margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 10px;">
            <div class="content">
                <h3 style="color: #27ae60;">📍 Đặt lần ${index + 1}</h3>
                <p>${itemsHtml}</p>
                <hr>
                <p><strong>Tổng: ${groupTotal.toLocaleString()} VND</strong></p>
            </div>
        </div>
        `;
    });

    nav_pay.innerHTML = finalHtml;

    const preview = document.getElementById("preview-end-page");
    preview.scrollIntoView({ behavior: 'smooth' });
    const price_check = price.toLocaleString();
    alert(price_check)
}