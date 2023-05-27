<!-- different among LocalStorage, Cookie, Session -->
- Scope:
    + Cookie: Dữ liệu được lưu trữ và gửi đến máy chủ trong mỗi yêu cầu.
    + Session: Dữ liệu được lưu trữ nhưng không gửi đến máy chủ trong mỗi yêu cầu.
    + LocalStorage: Dữ liệu được lưu trữ và không gửi đến máy chủ.

- Thời gian tồn tại:
    + Cookie: Thời gian tồn tại có thể được đặt tùy ý (expires), sau thời gian này thì cookies sẽ biến mất khỏi browser.
    + Session: đối với sessionStorage thì data sẽ bị mất ngay khi close tab hoặc close browser.
    + LocalStorage: Dữ liệu được lưu trữ vô thời hạn, cho đến khi người dùng xóa hoặc xóa bộ nhớ cache trình duyệt.

- Kích thước:
    + Cookie: Tối đa 4KB, vì vậy ta nên sử dụng cookies với mục đích save những loại data simple ví dụ như token cho authentication,...
    + Session: Tối đa một vài MB.
    + LocalStorage: Tối đa 5MB hoặc hơn.

Điểm giống nhau: LocalStorage & Session
 .Có cùng APIs: setItem, getItem, removeItem, clear