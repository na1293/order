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

                // 1. Kiểm tra xem món này có phải là rau không (Không phân biệt hoa thường)
                const isRau = food.name.toLowerCase().includes("rau");

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
                                            <button type="button" class="btn-step" onclick="this.parentNode.querySelector('input').stepDown()">−</button>
                                            <input type="number" id="quantity-${food.name}" min="0" value="${quantityInCart}" class="input-UI">
                                            <button type="button" class="btn-step" onclick="this.parentNode.querySelector('input').stepUp()">+</button>
                                        </div>
                                    `}
                                </div>

                                <p id="status-${food.name}">${isRau && quantityInCart > 0 ? 'Đã thêm rau' : `Đang có: ${quantityInCart}`}</p>
                                <hr>
                                
                                <button class="button-border" onclick="confirmOrder('${food.name}')">
                                    ${isRau ? 'Lấy rau' : 'Thêm món'}
                                </button>

                                <button class="button-border" onclick="remove_food('${food.name}')">
                                    Xóa
                                </button>
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