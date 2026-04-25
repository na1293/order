// Xử lý cuối cùng

function dat_nhom() {
    // 1. Hiển thị khu vực tính toán tiền
    const pay = document.getElementById("pay");
    if (pay) pay.style.display = "block";

    // 2. Lấy dữ liệu từ bộ nhớ
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || [];
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

    if (currentOrder.length <= 0) {
        alert("Đơn hàng tối thiểu 5.000đ để tiến hành đặt");
        return;
    }

    // 3. LOGIC QUAN TRỌNG
    orderHistory.push(currentOrder);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    localStorage.removeItem('currentOrder');

    // 4. RENDER TOÀN BỘ LỊCH SỬ
    const nav_pay = document.getElementById("nav-pay");
    let finalHtml = "";
    let grandTotal = 0; // Để dùng cho alert cuối cùng

    orderHistory.forEach((group, index) => {
        let itemsHtml = "";
        let groupTotal = 0;
        let descriptionDTCmt = "";
        let hasSuggestion = false; // Phải khai báo ở đây để check cho từng nhóm

        group.forEach(item => {
            const price = item.price_backend || 0;
            const quantity = item.quantity || 0;
            const desc = item.description || "Chưa có mô tả";

            itemsHtml += `${item.name} - ${price.toLocaleString()} VND (x${quantity})<br>`;
            groupTotal += price * quantity;
            
            // Ép in thường để check cho chuẩn
            if (item.name.toLowerCase().includes("[gợi ý]")) {
                hasSuggestion = true;
            }

            descriptionDTCmt += `- ${item.name}: ${desc.replace(/'/g, "\\'").replace(/\n/g, ' ')} `;
        });

        grandTotal += groupTotal; // Cộng dồn tổng tất cả lần đặt

        finalHtml += `
        <div class="box" style="margin-bottom: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 10px;">
            <div class="content">
                <h3 style="color: #27ae60;">📍 Đặt lần ${index + 1}</h3>
                <p>${itemsHtml}</p>
                <hr>
                <p><strong>Tổng lần này: ${groupTotal.toLocaleString()} VND</strong></p>
                ${hasSuggestion 
                    ? `<a onclick="view('${descriptionDTCmt.trim()}')" style="cursor:pointer; color:blue; text-decoration:underline;">Bấm vào đây để xem thành phần</a>` 
                    : `<span style="color:gray;">(Không có gợi ý cho đơn này)</span>`
                }
                <hr>
                <p id="funt_view" class="view-style"></p>
            </div>
        </div>
        `;
    });

    nav_pay.innerHTML = finalHtml;

    const preview = document.getElementById("preview-end-page");
    if (preview) preview.scrollIntoView({ behavior: 'smooth' });
}

// Hàm view giờ chỉ cần nhận mô tả vì ta đã check điều kiện gợi ý lúc Render rồi
function view(mo_ta) {
    const displayArea = document.getElementById("funt_view");
    let formattedText = mo_ta.replace(/ - /g, '<br>- ').replace(/Thành phần:/g, '<br><strong>Thành phần:</strong>');

    displayArea.innerHTML = formattedText;
    
    // Cuộn đến khu vực hiển thị để user dễ nhìn
    displayArea.scrollIntoView({ behavior: 'smooth' });
}