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
                const isRau = /rau|tương|sốt/i.test(food.name);

                return `
                    <div class="food-box-menu">
                        <img src="${food.image}" decoding="async" alt="${food.name}"
                            onerror="this.onerror=null; this.src='https://dummyimage.com/300x300/ff7f00/fff.png&text=Lỗi+Ảnh';">
                        
                        <div class="food-info">
                            <strong>${food.name}</strong>
                            <p class="description">${food.description}</p>
                            
                            <div class="price-row">
                                <span class="price">${food.price}</span>
                            </div>

                            <div class="food-status-area">
                                <div class="can-giua-pt">
                                    <div class="quantity-stepper">
                                        <button type="button" class="btn-step" 
                                            onclick="const input = this.parentNode.querySelector('input'); if(input.value > 0) { input.stepDown(); confirmOrder('${food.name}') }">
                                            −
                                        </button>
                                        
                                        <input type="number" 
                                            id="quantity-${food.name}" 
                                            min="0" 
                                            max="${isRau ? 1 : 99}" 
                                            value="${quantityInCart}" 
                                            class="input-UI" 
                                            readonly>
                                        
                                        <button type="button" class="btn-step" 
                                            onclick="const input = this.parentNode.querySelector('input'); if(input.value < input.max) { input.stepUp(); confirmOrder('${food.name}') }">
                                            +
                                        </button>
                                    </div>
                                </div>

                                <p id="status-${food.name}">
                                    ${isRau && quantityInCart > 0 ? 'Đã thêm' : `Bạn đang có ${quantityInCart} món này`}
                                </p>
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