// Hàm render từng phần tử box đồ ăn
function render(name) {
    const categoryKey = name.substring(1); 
    const categoryData = menu[categoryKey]; 

    if (categoryData) {
        const orderSection = document.querySelector("#order");
        if (orderSection) {
            const currentOrder = JSON.parse(localStorage.getItem("currentOrder")) || [];

            const htmlContent = Object.values(categoryData).map(food => {
                const existingItem = currentOrder.find(item => item.name === food.name);
                const quantityInCart = existingItem ? existingItem.quantity : 0;
                const isRau = food.name.toLowerCase().includes("rau");

                // Sử dụng Template String để tạo HTML
                return `
                    <div class="food-box-menu">
                        <img src="${food.image}" loading="lazy" alt="${food.name}">
                        <div class="food-info">
                            <strong>${food.name}</strong>
                            <p>${food.description}</p>
                            
                            <div class="price-row">
                                <span class="price">${food.price}</span>
                            </div>

                            <div class="food-status-area">
                                <div class="can-giua-pt">
                                    ${isRau ? `
                                        <div>Rau sạch miễn phí</div>
                                        <input type="hidden" id="quantity-${food.name}" value="1">
                                    ` : `
                                        <div class="quantity-stepper">
                                            <button type="button" class="btn-step" 
                                                onclick="const input = this.parentNode.querySelector('input'); input.stepDown(); confirmOrder('${food.name}')">
                                                −
                                            </button>
                                            
                                            <input type="number" id="quantity-${food.name}" min="0" value="${quantityInCart}" class="input-UI" readonly>
                                            
                                            <button type="button" class="btn-step" 
                                                onclick="const input = this.parentNode.querySelector('input'); input.stepUp(); confirmOrder('${food.name}')">
                                                +
                                            </button>
                                        </div>
                                    `}
                                </div>

                                <p id="status-${food.name}">${isRau && quantityInCart > 0 ? 'Đã thêm rau' : `Đang có: ${quantityInCart}`}</p>
                                <hr>

                                <button class="button-border" onclick="remove_food('${food.name}')">
                                    Xóa món
                                </button>
                            </div>
                        </div>
                    </div>`;
            }).join('');

            orderSection.innerHTML = htmlContent;
            orderSection.className = "food-container";
        }
    }
}