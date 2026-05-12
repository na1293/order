const openid = ["#main-info"];
let main = document.getElementById("main");

// 1. Hàm xử lý cuộn trang
const handleNext = (e) => {
    e.preventDefault();
    const target = document.querySelector(openid[0]);
    if (main) main.style = "flex";
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

const triggerElements = document.querySelectorAll("#info-2, .info-2");
triggerElements.forEach(el => el.addEventListener("click", handleNext));

// 3. Xử lý Reset
const handleReset = () => {

    localStorage.clear();
};

// Gán cho nút reset (nếu có)
const resetBtn = document.querySelector(".resetData");
const resetBtnConfirm = document.querySelector(".resetBtnConfirm");

if (resetBtn) resetBtn.addEventListener("click", handleReset);
if (resetBtnConfirm) resetBtnConfirm.addEventListener("click", handleReset);