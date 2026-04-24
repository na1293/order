const cuteMessages = document.getElementById("cuteMessages");

const timeMap = [
    { min: 5,  max: 6,  msg: "Dậy sớm vậy bạn? Làm bát phở lót dạ nha~" },
    { min: 7,  max: 8,  msg: "Chào buổi sáng! Sáng nay định ăn gì vậy?" },
    { min: 9,  max: 11, msg: "Hế lu, trưa rồi, thử ngay Mỳ Tương Đen nhé!" },
    { min: 12, max: 13, msg: "Trưa nay rủ bạn bè ăn chung là ngon hết nấc"  },
    { min: 14, max: 15, msg: "Tầm này làm ly Trà Hoa Quả là nhất!" },
    { min: 16, max: 19, msg: "Ăn tối thôi! Rất nhiều món ngon đang chờ" },
    { min: 20, max: 22, msg: "Làm tí ăn vặt đêm muộn không bạn ơi?" },
];

function updateGreeting() {
    const nowTime = new Date().getHours();
    
    const match = timeMap.find(item => nowTime >= item.min && nowTime <= item.max);
    
    cuteMessages.textContent = match ? match.msg : "Quán đóng cửa rùi, xem qua thực đơn mai đặt nhé!";
}

updateGreeting();