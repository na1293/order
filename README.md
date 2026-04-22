# Tài liệu vá lỗi

1. Thứ tự các file:
> load.js > order.js > render_after_order.js

2. Xử lý các file:
- load.js: Nhận dữ liệu từ thẻ a qua id, gọi hàm từ order.js
- order.js: Sau khi gọi hàm, hiển thị các phần tử món ăn
- render_after_order.js: Là bước cuối, quản lý các phần tử và #pay

3. Gợi ý gỡ lỗi:
- Nếu sử dụng cổng 5500 trên Edge, Chrome (Hoặc trên Chromium) có thể bị lỗi load.js. Hãy thử lại trên Firefox
- Vì câu "Mỳ tương đen" có chứa "tương" bị điều chỉnh chỉ tối đa 1. Có thể sử dụng hàm kiểm tra giá trị đơn hàng thay vì từ khóa thuần để dễ mở rộng

4. Tối ưu lưu trữ:
- Chuyển định dạng WebP (Đã sửa)