---
title: Chính sách quyền riêng tư
updated: 2026-10-20
---

::: draft
**BẢN NHÁP — cần luật sư xem xét.** Mô tả thực tế về cách trang hoạt động, viết bằng ngôn ngữ dễ hiểu, không phải tư vấn pháp lý. Các mục có đánh dấu **[TO CONFIRM]** (cần xác nhận) chưa được chủ trang xác nhận. Không đăng cho tới khi đã được xác nhận và xem xét.
:::

::: summary
**Tóm tắt:** Chúng tôi thu thập những gì cần để vận hành thư viện cho mượn đồ, lưu trữ tại nhà cung cấp cơ sở dữ liệu của chúng tôi, và không dùng chúng cho quảng cáo.
:::

## Chúng tôi thu thập gì

- **Thông tin tài khoản:** địa chỉ email của Quý vị (được xác minh khi đăng ký) và thông tin đăng nhập.
- **Hồ sơ:** tên hiển thị, thành phố hoặc khu vực, và mọi thông tin hồ sơ khác mà Quý vị chọn thêm vào.
- **Tin đăng:** tiêu đề, mô tả, loại đồ, tình trạng, khu vực nhận đồ, các mức giá Quý vị đặt (phí và giá đền bù) và ảnh Quý vị tải lên.
- **Lịch sử mượn đồ:** yêu cầu, lượt xếp hàng, lượt duyệt, đánh dấu giao nhận và trả đồ (nguyên vẹn hoặc hư hỏng), và các ghi chú liên quan.
- **Báo cáo:** báo cáo Quý vị gửi, và báo cáo về Quý vị hoặc tin đăng của Quý vị.
- **Góp ý:** nếu Quý vị dùng Gửi góp ý, chúng tôi lưu nội dung Quý vị viết, loại góp ý Quý vị chọn (lỗi, ý tưởng hoặc khác), trang Quý vị đang xem, và một ghi chú ngắn về trình duyệt của Quý vị. Nếu Quý vị đã đăng nhập, góp ý được liên kết với tài khoản của Quý vị. Nếu Quý vị thêm thông tin liên hệ để chúng tôi trả lời, chúng tôi cũng lưu thông tin đó. [TO CONFIRM: các trường dữ liệu chính xác, dựa trên supabase/08-feedback.sql, tệp này chưa tồn tại khi nội dung này được viết.]
- **Dữ liệu kỹ thuật cơ bản:** khi Quý vị truy cập trang, các nhà cung cấp dịch vụ lưu trữ web và dịch vụ phân tích truy cập của chúng tôi xử lý thông tin kỹ thuật cơ bản, chẳng hạn như các trang Quý vị xem, vị trí gần đúng của Quý vị (quốc gia hoặc vùng), và loại trình duyệt và loại thiết bị của Quý vị. Xem mục “Phân tích truy cập và cookie” bên dưới. [TO CONFIRM: cách Vercel và Supabase xử lý nhật ký máy chủ và địa chỉ IP. NEEDS REVIEW.]

## Dữ liệu được lưu ở đâu

Tài khoản, hồ sơ, tin đăng, lịch sử mượn đồ và ảnh của Quý vị được lưu trữ tại Supabase (cơ sở dữ liệu, xác thực và lưu trữ tệp). Dữ liệu được lưu tại Canada (khu vực Supabase ca-central-1). Trang web được lưu trữ (hosting) trên Vercel.

## Người dùng khác thấy được gì

Hồ sơ công khai của Quý vị hiển thị với người dùng khác. Hồ sơ này cho thấy tên hiển thị, thành phố hoặc khu vực (nếu Quý vị có thêm vào), phần giới thiệu, tháng và năm Quý vị tham gia, và các tin đăng của Quý vị cùng ảnh của chúng. Hồ sơ cũng cho thấy các con số đơn giản: số món đồ Quý vị đã đăng, đã cho mượn và đã mượn, số lượt trả lại nguyên vẹn, và số lượt hư hỏng hoặc mất (khi Quý vị là người cho mượn và khi Quý vị là người mượn). Hồ sơ không liệt kê Quý vị đã cho ai mượn hay đã mượn của ai. [NEEDS REVIEW: đã đối chiếu với components/profile-stats.tsx và trang hồ sơ vào ngày 2026-10-20; cần kiểm tra lại nếu trang hồ sơ thay đổi.] Quý vị không nên ghi địa chỉ chính xác của mình trong tin đăng. Địa chỉ email của Quý vị không bao giờ được hiển thị công khai. Sau khi một yêu cầu được duyệt, người cho mượn và người mượn chỉ liên hệ với nhau qua tính năng tin nhắn trên trang.

## Phân tích truy cập và cookie (BẢN NHÁP, cần xem xét)

Chúng tôi dùng Vercel Web Analytics để đếm số lượt truy cập các trang, nhờ đó chúng tôi biết những phần nào của trang đang được sử dụng. Dựa trên tài liệu của Vercel (trang tài liệu “Privacy and Compliance”, tức “Quyền riêng tư và Tuân thủ”, cập nhật lần cuối ngày 2026-06-26):
- Công cụ này không dùng cookie của bên thứ ba. Khách truy cập được phân biệt với nhau bằng một giá trị băm (hash) được tạo ra từ yêu cầu (request) gửi đến.
- Thông tin về phiên truy cập của khách truy cập không được lưu vĩnh viễn; thông tin này bị loại bỏ sau 24 giờ.
- Công cụ này không thu thập thông tin cho phép bất kỳ ai theo dõi Quý vị qua các trang web hoặc ứng dụng khác nhau, và chỉ được dùng cho số liệu thống kê tổng hợp.
- Mỗi lượt xem trang có thể bao gồm: thời điểm, đường dẫn của trang, trang dẫn đến, vị trí gần đúng (quốc gia, vùng, thành phố), hệ điều hành và phiên bản, trình duyệt và phiên bản, và loại thiết bị (di động, máy tính bảng hoặc máy tính để bàn).

Trước khi một lượt xem trang được gửi đi, chúng tôi loại bỏ mã (ID) của món đồ, lượt mượn và hồ sơ khỏi đường dẫn của trang, đồng thời loại bỏ các tham số truy vấn và mọi phần đứng sau dấu #. Các liên kết trong email của chúng tôi (các trang /auth/... mở ra khi Quý vị nhấn vào một liên kết đăng ký hoặc đặt lại mật khẩu) hoàn toàn không được ghi nhận, còn các trang khác chỉ được ghi nhận bằng đường dẫn của trang, ví dụ /en/login. Chúng tôi không gửi mã người dùng (user ID) của Quý vị. Chúng tôi không thể thay đổi trang dẫn đến, vì công cụ phân tích tự đưa thông tin này vào. [NEEDS REVIEW: dựa trên việc người lập trình kiểm tra mã nguồn vào ngày 2026-10-20.]

Chúng tôi không dùng dữ liệu này để hiển thị quảng cáo, và chúng tôi không bán dữ liệu này.

Cookie: trang chỉ thiết lập những cookie cần thiết để trang hoạt động (hai loại, cộng thêm một loại thứ ba trong giai đoạn beta kín).
- Cookie đăng nhập, do nhà cung cấp dịch vụ đăng nhập của chúng tôi (Supabase) thiết lập, giữ cho Quý vị ở trạng thái đăng nhập. Cookie này có thể được chia thành nhiều phần.
- Cookie ngôn ngữ ghi nhớ ngôn ngữ mà Quý vị đã chọn. Cookie này được lưu trong 1 năm.
- Trong thời gian mật khẩu beta kín được bật, một cookie truy cập có tên pa_access ghi nhớ rằng Quý vị đã nhập mật khẩu. Cookie này được lưu trong 30 ngày và không chứa thông tin cá nhân nào. Chúng tôi ngừng thiết lập cookie này khi mật khẩu được tắt. [NEEDS REVIEW: tên cookie, thời hạn 30 ngày và việc “chỉ khi mật khẩu được bật” lấy từ bản mô tả nhiệm vụ của người điều phối, chưa được kiểm tra trong mã nguồn.]

Trang cũng lưu cài đặt rung khi chạm của Quý vị, lựa chọn giao diện của Quý vị (Sáng hoặc Tối; nếu Quý vị để ở Tự động thì không có thông tin nào được lưu) và tiến độ của Quý vị trong các màn hình hướng dẫn ban đầu vào bộ nhớ cục bộ (local storage) của trình duyệt, ngay trên thiết bị của chính Quý vị. Đây không phải là cookie và không được gửi cho chúng tôi.

Chúng tôi không thiết lập cookie quảng cáo hay cookie theo dõi trên nhiều trang web. [NEEDS REVIEW: dựa trên việc người lập trình kiểm tra mã nguồn vào ngày 2026-10-20; cần kiểm tra lại khi có bất kỳ thứ gì được thêm vào.]

[TO CONFIRM: kiểm tra với Vercel hoặc trên trang quản trị, vì trang tài liệu ở trên chưa nêu: (1) địa chỉ IP có được lưu lại hay chỉ được dùng trong thời gian ngắn để xác định vị trí gần đúng; (2) dữ liệu phân tích tổng hợp được lưu giữ trong bao lâu; (3) dữ liệu phân tích được lưu trữ và xử lý ở đâu. Không đăng bất kỳ khẳng định nào về những điểm này cho tới khi đã kiểm tra.]

## Chúng tôi dùng dữ liệu như thế nào

Để vận hành trang: hiển thị tin đăng, quản lý hàng chờ và yêu cầu, giúp người cho mượn và người mượn liên hệ với nhau, xử lý báo cáo, và giữ cho trang an toàn.

## Những điều chúng tôi không làm

- Chúng tôi không bán dữ liệu của Quý vị.
- Chúng tôi không hiển thị quảng cáo.
- Trang này không nhận thanh toán, nên chúng tôi không thu thập thông tin thẻ hay tài khoản ngân hàng.

## Chia sẻ

Chúng tôi chia sẻ dữ liệu với các nhà cung cấp dịch vụ cần thiết để vận hành trang (như nhà cung cấp cơ sở dữ liệu và dịch vụ lưu trữ web). Chúng tôi có thể tiết lộ thông tin nếu pháp luật yêu cầu. [TO CONFIRM / luật sư: danh sách đầy đủ các bên xử lý dữ liệu.]

**Gửi email (Resend) (BẢN NHÁP, cần xem xét).** Chúng tôi dùng Resend để gửi các email cho tài khoản của Quý vị: xác minh email của Quý vị, đặt lại mật khẩu của Quý vị và các thông báo bảo mật. Các email này được gửi từ no-reply@project-arcade.ricebarrel.com. Để gửi các email này, Resend nhận địa chỉ email của Quý vị và nội dung của thư. Chúng tôi chỉ dùng Resend để gửi các email liên quan đến tài khoản của Quý vị, và Resend chỉ nhận địa chỉ email của Quý vị cho mục đích đó. Chúng tôi không gửi email tiếp thị. Theo chính sách quyền riêng tư của Resend, Resend chuyển dữ liệu sang Hoa Kỳ và xử lý dữ liệu tại đó. [TO CONFIRM: kiểm tra với Resend: (1) liệu Resend có đóng vai trò là bên xử lý dữ liệu cho chúng tôi hay không và đã có thỏa thuận xử lý dữ liệu hay chưa; (2) Resend lưu giữ nội dung email đã gửi và nhật ký trong bao lâu (chính sách quyền riêng tư của Resend không nêu thời hạn); (3) các bên xử lý phụ của Resend (Resend liệt kê các bên này tại resend.com/legal/subprocessors). Luật sư cần kiểm tra câu chữ về việc chuyển dữ liệu ra nước ngoài.]

## Lưu giữ và xóa dữ liệu

*Góp ý:* nếu Quý vị xóa tài khoản, góp ý của Quý vị vẫn được giữ lại nhưng không còn liên kết với Quý vị. [TO CONFIRM: khớp với `user_id ON DELETE SET NULL` trong supabase/08-feedback.sql; thời hạn lưu giữ, và liệu thông tin liên hệ để trả lời có bị xóa theo hay không.]

Quý vị có thể tự xóa tài khoản trong phần cài đặt tài khoản. Khi Quý vị xóa, hồ sơ của Quý vị, các món đồ của Quý vị cùng ảnh của chúng, và vị trí của Quý vị trong các hàng chờ sẽ bị xóa. Các yêu cầu đang chờ và đã được duyệt của Quý vị sẽ bị đóng, và nội dung các tin nhắn Quý vị đã gửi sẽ được thay bằng “[message removed]”. Lịch sử mượn đồ (tên món đồ, ngày tháng, giá đền bù, ghi chú hư hỏng và trạng thái), tin nhắn người kia đã gửi trong các cuộc trò chuyện của Quý vị, và các báo cáo sẽ được giữ lại nhưng không còn liên kết với Quý vị. Quý vị không thể xóa tài khoản khi vẫn còn món đồ đang ở trạng thái đã giao nhận. [TO CONFIRM: nhật ký và các hồ sơ được giữ lại sẽ được lưu trong bao lâu. Luật sư cần kiểm tra mọi yêu cầu lưu giữ theo luật. Dựa trên supabase/05-messages-and-deletion.sql, tệp này chưa được chạy.]

## Lựa chọn của Quý vị

Quý vị có thể chỉnh sửa hồ sơ và tin đăng trong ứng dụng, và xóa tài khoản bất cứ lúc nào. Với các câu hỏi khác về dữ liệu của Quý vị, vui lòng liên hệ chúng tôi qua [contact email].

## Độ tuổi

Trang này dành cho người từ 18 tuổi trở lên. Chúng tôi không cố ý thu thập dữ liệu từ bất kỳ ai dưới 18 tuổi.

## Thay đổi

Chúng tôi có thể cập nhật chính sách này và sẽ đổi ngày ở trên khi cập nhật.

## Liên hệ

[contact email]
