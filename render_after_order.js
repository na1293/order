function confirmOrder(NameFoods) {
    const quantityInput = document.getElementById(`quantity-${NameFoods}`);
    const statusElement = document.getElementById(`status-${NameFoods}`);
    const quantity = parseInt(quantityInput.value);

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

    // 1. Xử lý gỡ món khi số lượng <= 0
    if (isNaN(quantity) || quantity <= 0) {
        const shouldRemove = confirm(`Bạn có muốn gỡ phần ${NameFoods}?`);
        if (shouldRemove) {
            let currentOrder = JSON.parse(localStorage.getItem("currentOrder")) || [];
            currentOrder = currentOrder.filter(item => item.name !== NameFoods);
            localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
            
            if (statusElement) statusElement.innerText = `Bạn đang có 0 món`;
            alert(`Đã gỡ phần ${NameFoods}.`);
        }
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
        statusElement.innerText = `Bạn đang có ${quantity} món`;
    }

    alert(`Xác nhận thành công! ✅\nGiá mỗi phần: ${priceForBackend.toLocaleString()} VND`);
}