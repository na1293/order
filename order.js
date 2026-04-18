function render(name) {
    const categoryKey = name.substring(1); 
    const categoryData = menu[categoryKey]; 

    if (categoryData) {
        const orderSection = document.querySelector("#order");
        if (orderSection) {
            const currentOrder = JSON.parse(localStorage.getItem("currentOrder")) || [];

            const htmlContent = Object.values(categoryData).map(food => {
                const existingItem = currentOrder.find(item => item.name === food.name); // Map tên món để render từ bộ nhớ (Kỹ thuật ánh xạ)
                console.log(existingItem) // Hiểu về nguyên lý
                const quantityInCart = existingItem ? existingItem.quantity : 0; // Kiểm tra điều kiện => Lấy phần quantity (Số lượng) trong existingItem
                // === currentOrder là vùng nhớ chính === //
                return `
                    <div class="food-box-menu">
                        <img src="${food.image}" loading="lazy" alt="${food.name}">
                        <div class="food-info">
                            <strong>${food.name}</strong>
                            <p>${food.description}</p>
                            
                            <div class="price-row">
                                <span class="price">${food.price}</span>
                                <br>
                                <button class="button-border" onclick="confirmOrder('${food.name}')">
                                    Thêm món
                                </button>
                            </div>

                            <div class="food-status-area">
                                <div class="can-giua-pt">
                                    <div class="quantity-stepper">
                                        <button type="button" class="btn-step" onclick="this.parentNode.querySelector('input').stepDown()">−</button>
                                        <input type="number" id="quantity-${food.name}" min="0" value="${quantityInCart}" class="input-UI">
                                        <button type="button" class="btn-step" onclick="this.parentNode.querySelector('input').stepUp()">+</button>
                                    </div>
                                </div>

                                <p id="status-${food.name}">Đang có: ${quantityInCart}</p>

                            </div>
                        </div>
                    </div>`;
            }).join('');

            orderSection.innerHTML = htmlContent;
            // Gán class để kích hoạt Flexbox/Grid
            orderSection.className = "food-container";
        }
    }
}