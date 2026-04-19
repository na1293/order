// CÓ HỖ TRỢ XÓA MÓN VÀ THÊM MÓN

// ========= Thêm món ==========
function confirmOrder(NameFoods) {
    const quantityInput = document.getElementById(`quantity-${NameFoods}`); // Lấy dữ liệu từ ô nhập
    const statusElement = document.getElementById(`status-${NameFoods}`); // Toàn bộ cái thẻ thông báo
    const quantity = parseInt(quantityInput.value); // Lấy số món đang có trên thanh nhập
    // --- BƯỚC TÌM GIÁ TỪ MENU ---
    let priceForBackend = 0;
    
    // Duyệt qua các danh mục (noodles, rice...) để tìm giá theo tên món
    for (let category in menu) {
        for (let id in menu[category]) {
            if (menu[category][id].name === NameFoods) {
                priceForBackend = menu[category][id].price_backend;
                break;
            }
        }
    }

    // 1. Xử lý khi món trên thanh nhập <= 0
    if (isNaN(quantity) || quantity <= 0) {
        remove_food(NameFoods);
        return;
    }

    // 2. Cập nhật dữ liệu vào giỏ hàng
    let currentOrder = JSON.parse(localStorage.getItem("currentOrder")) || [];
    const existingItem = currentOrder.find(item => item.name === NameFoods);

    if (existingItem) {
        existingItem.quantity = quantity; 
        existingItem.price_backend = priceForBackend; // Cập nhật lại giá mới nhất
    } else {
        // Lưu cả tên, số lượng và GIÁ BACKEND ✨
        currentOrder.push({ 
            name: NameFoods, 
            quantity: quantity, 
            price_backend: priceForBackend 
        });
    }

    // 3. Lưu vào LocalStorage
    localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
    
    // 4. Cập nhật UI
    if (statusElement) {
        statusElement.innerText = `Bạn đang có ${quantity} món này`;
    }
}

// =========== Xóa món =================
function remove_food(name_food_remove) {
    // 1. Chỉ lấy statusElement để cập nhật UI
    const statusElement = document.getElementById(`status-${name_food_remove}`);
    const quantityInput = document.getElementById(`quantity-${name_food_remove}`);

    // 2. Xác nhận xóa
    const shouldRemove = confirm(`Bạn có muốn gỡ phần ${name_food_remove}?`);
    
    if (shouldRemove) {
        // 3. Lấy dữ liệu và ép kiểu mảng (phòng thủ)
        let currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
        if (!Array.isArray(currentOrder)) currentOrder = [];

        // 4. Lọc bỏ món ăn
        currentOrder = currentOrder.filter(item => item.name !== name_food_remove);

        // 5. LƯU LẠI CẢ MẢNG (QUAN TRỌNG NHẤT) ✨
        localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
        
        // 6. Cập nhật UI
        if (statusElement) statusElement.innerText = `Bạn đang có 0 món`;
        if (quantityInput) quantityInput.value = 0; // Reset ô nhập về 0 cho đẹp
        
        alert(`Đã gỡ phần ${name_food_remove} thành công! ✅`);
    }
}