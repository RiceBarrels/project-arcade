# project-arcade — nội dung tiếng Việt (bản dịch nháp v1)

- **Language / Ngôn ngữ:** Vietnamese / Tiếng Việt (vi)
- **Date / Ngày:** 2026-10-20
- **Status / Trạng thái:** machine-assisted draft — needs native-speaker review (bản nháp có máy hỗ trợ, cần người bản ngữ rà soát). Chưa có người bản ngữ nào rà soát bản này.
- **Biến thể:** tiếng Việt chuẩn, viết đầy đủ dấu, chọn từ mà người đọc ở cả miền Bắc và miền Nam đều hiểu. Những chỗ có khác biệt vùng miền được ghi trong bảng thuật ngữ ở cuối file. Dấu thanh đặt theo kiểu mới (ví dụ “xóa”, “hòa”, “thỏa”), văn bản lưu ở dạng Unicode NFC (ký tự dựng sẵn).
- **Phông chữ:** tiếng Việt có dấu chồng nhiều tầng (ví dụ ấ, ể, ỗ, ặ, Ở). Phông tiêu đề đậm và phông thân bài phải có bộ ký tự tiếng Việt, và chiều cao dòng phải đủ để dấu không bị cắt. Xem mục 7 trong phần câu hỏi cần phối hợp ở cuối file.

> **Ghi chú của người dịch (không phải nội dung trang):** File này là bản dịch tiếng Việt của `docs/copy-en.md`. Số thứ tự các mục khớp hoàn toàn với bản tiếng Anh. Các biến giữ chỗ (`{amount}`, `{item}`, `{left}`, `{Lender}`, `{Name}`, `{n}`, `{email}`, `{listing / user}`) và các chỗ giữ trong ngoặc vuông (`[contact email]`, `[Link to privacy policy]`) được giữ nguyên, đường dẫn (`/terms`, `/privacy`, `/list`) cũng không đổi. Thuật ngữ còn chờ xác nhận, xem bảng “Thuật ngữ chờ xác nhận” ở cuối file. Mục 8 và 15 là bản nháp pháp lý: chỉ dịch trung thành, giữ nguyên các dấu DRAFT, TO CONFIRM và NEEDS LAWYER CONFIRMATION của bản gốc.
>
> Bản tiếng Anh đối chiếu: copy-en.md (phiên bản 2026-10-20). Khi bản tiếng Anh thay đổi, cần cập nhật file này.

Giọng văn: kiểu game, thân thiện, thẳng thắn. Không phóng đại, không hứa những gì trang không làm được (ở v1, trang không xử lý bất kỳ khoản thanh toán hay tranh chấp nào). Trong toàn bộ giao diện, gọi người dùng là “bạn”; riêng hai trang pháp lý (mục 8 /terms và mục 15 chính sách quyền riêng tư) gọi người dùng là “Quý vị”. Trang luôn tự xưng là “chúng tôi”.

## 1. Tên trang và khẩu hiệu (ĐÃ QUYẾT ĐỊNH)

**Tên trang:** project-arcade (không dịch)
**Dòng nhỏ dưới tên:** pre-alpha (không dịch)
**Khẩu hiệu:** Mượn đồ. Trả đồ. Chơi lại.

(Các phương án cũ Gear Arcade, Lend Quest và The Queue đã bị bỏ. Tên viết chữ thường, có gạch nối, giống tên miền.)

**Thông báo pre-alpha (chân trang hoặc banner nhỏ):** project-arcade đang ở giai đoạn pre-alpha. Đây là phiên bản thử nghiệm sớm, nên tính năng và dữ liệu có thể thay đổi hoặc bị đặt lại.
**Bản ngắn (chú thích của huy hiệu):** Phiên bản thử nghiệm sớm. Mọi thứ có thể thay đổi.
**Bản dài (trang giới thiệu hoặc lần ghé đầu tiên):** Bạn đến sớm đấy. project-arcade là một dự án cộng đồng đang ở giai đoạn pre-alpha, nên sẽ còn chỗ chưa mượt, tính năng thay đổi và thỉnh thoảng bị đặt lại. Thấy chỗ nào bị lỗi hoặc khó hiểu, hãy cho chúng tôi biết qua Gửi góp ý (xem mục 19).

Mô tả meta ngắn (khoảng 150 ký tự): Thư viện cộng đồng phi lợi nhuận để mượn đồ dùng. Khám phá, xếp hàng, mượn từ người ở gần rồi chuyền tay tiếp. Không quảng cáo, trang không thu phí.

## 2. Phần mở đầu trang chủ

**Tiêu đề:** Mượn về. Dùng ngay. Chuyền tiếp.

**Tiêu đề phụ:** Thư viện cộng đồng để mượn đồ dùng. Xem những người quanh bạn sẵn lòng cho mượn gì, thêm vào hàng chờ của bạn, và đến lấy khi tới lượt.

**Nút chính:** Khám phá kho đồ
**Nút phụ:** Đăng đồ của bạn

**Chú thích dưới phần mở đầu:** Phi lợi nhuận. Không quảng cáo. Không phí nền tảng.

## 3. Cách hoạt động

**Tiêu đề mục:** Cách hoạt động

1. **Khám phá** — Tìm món bạn cần trong kho đồ: dụng cụ, máy ảnh, đồ cắm trại, trò chơi, nhạc cụ và nhiều thứ khác. Lọc theo loại đồ và khu vực.
2. **Xếp hàng** — Thêm món bạn muốn vào hàng chờ. Nếu món đó đang có người mượn, bạn vẫn giữ được chỗ của mình trong hàng. Khi món đó có sẵn, bạn là người tiếp theo.
3. **Mượn** — Người cho mượn duyệt yêu cầu của bạn, rồi hai bên thống nhất thời gian và địa điểm giao nhận. Nhận đồ, dùng đồ, tận hưởng.
4. **Trả** — Trả lại đồ trong tình trạng như lúc bạn nhận. Người cho mượn đánh dấu là đã trả, và người tiếp theo trong hàng được lên lượt.

**Câu kết:** Có món gì đang nằm bám bụi? [Đăng nó lên](/list) để người khác được dùng tới.

## 4. Giới thiệu trang /list

**Tiêu đề:** Đăng đồ của bạn

**Giới thiệu:** Bạn có món đồ sẵn lòng cho mượn? Thêm vào đây. Chỉ mất vài phút: một tiêu đề, vài tấm ảnh, tình trạng món đồ và khu vực của bạn.

**Chữ hướng dẫn cho các ô**
- **Miễn phí hay có phí:** Mặc định, cho mượn là miễn phí. Nếu muốn thu một khoản phí nhỏ, bạn có thể đặt phí. Mọi khoản phí đều do bạn và người mượn thỏa thuận và trả trực tiếp cho nhau, không qua trang này.
- **Giá đền bù:** Số tiền người mượn phải trả nếu món đồ bị trả về trong tình trạng hư hỏng hoặc bị mất. Hãy đặt mức hợp lý, ví dụ chi phí sửa chữa hoặc chi phí thay món mới. Người mượn thấy giá này trước khi gửi yêu cầu.
- **Khu vực nhận đồ:** Chọn một thành phố hoặc khu vực chung. Đừng ghi địa chỉ chính xác của bạn trong tin đăng.

**Câu trấn an:** Bạn duyệt mọi yêu cầu. Bạn có thể từ chối, và có thể gỡ tin đăng bất cứ lúc nào.

**Nút:** Đăng tin

## 5. Tuyên bố phi lợi nhuận

**Tiêu đề:** Không vì lợi nhuận. Chỉ để cho mượn.

Trang này được vận hành như một dự án cộng đồng phi lợi nhuận. Không quảng cáo, không phí nền tảng, và không thanh toán qua trang. Chúng tôi không lấy phần trăm từ bất cứ thứ gì, và không bán dữ liệu của bạn. Người cho mượn có thể chọn thu một khoản phí nhỏ cho món đồ; khoản đó do hai người tự thỏa thuận và trả trực tiếp cho nhau, không qua trang.

Ý tưởng rất đơn giản: rất nhiều đồ hữu ích đang nằm không, và rất nhiều người chỉ cần chúng cho một dịp cuối tuần. Chúng tôi muốn kết nối hai bên lại với nhau.

*(Ghi chú cho chủ trang: trước khi ra mắt, hãy xác nhận dự án thực sự được vận hành và có nguồn tiền từ đâu, và chỉnh câu “không bán dữ liệu” cho khớp với chính sách quyền riêng tư thật.)*

## 6. Giải thích giá đền bù

**Tiêu đề:** Giá đền bù là gì?

Tin đăng nào cũng có giá đền bù. Đó là số tiền người mượn đồng ý sẽ trả cho người cho mượn nếu món đồ bị trả về hư hỏng hoặc bị mất.

- **Người cho mượn** đặt giá này khi đăng tin. Hãy đặt cho hợp lý: theo chi phí sửa chữa hoặc giá trị thay thế.
- **Người mượn** thấy giá này trước khi gửi yêu cầu, nên không có gì bất ngờ.
- **Nếu có chuyện không hay,** người cho mượn đánh dấu món đồ là hư hỏng khi nhận lại, và giá đền bù được áp dụng.
- **Việc thanh toán là chuyện giữa hai bạn.** Trang này không thu hay giữ tiền và không thể ép ai phải trả. Hãy nói chuyện với nhau, cư xử hợp lý và tự giải quyết trực tiếp.

Hao mòn thông thường không tính là hư hỏng. Nếu chưa chắc, hãy chụp ảnh lúc giao nhận và lúc trả.

**Bản ngắn (cho chú thích/bước gửi yêu cầu):** Giá đền bù: số tiền bạn sẽ phải trả cho người cho mượn nếu món này bị trả về hư hỏng hoặc bị mất. Hai bạn tự giải quyết trực tiếp với nhau.

## 6a. Câu hỏi về giá đền bù trên trang /list

**Tiêu đề câu hỏi:** Nếu món này bị hư hỏng hoặc bị mất, người mượn nên trả bao nhiêu?

**Nhãn ô nhập:** Giá đền bù
**Gợi ý ô nhập:** Nhập một số tiền. Đây là số tiền người mượn đồng ý sẽ trả cho bạn nếu món đồ bị trả về hư hỏng hoặc bị mất.

**Chữ trợ giúp:** Hãy nghĩ tới chi phí sửa chữa hoặc giá trị thay thế, cái nào hợp lý hơn thì dùng. Người mượn thấy con số này trước khi gửi yêu cầu, nên một con số thực tế sẽ giúp mọi người dễ đồng ý hơn. Trang này không thu khoản tiền này. Bạn và người mượn tự giải quyết trực tiếp.

**Thông báo kiểm tra:** Vui lòng nhập giá đền bù, dù chỉ là một khoản nhỏ.

## 6b. Ô xác nhận của người mượn

Hiển thị ở bước gửi yêu cầu, cạnh giá đền bù của món đồ.

**Ô đánh dấu:** Tôi hiểu rằng nếu món này bị trả về hư hỏng hoặc bị mất, tôi sẽ phải trả cho người cho mượn giá đền bù là {amount}, và hai bên sẽ tự giải quyết trực tiếp với nhau.

**Chữ dưới ô đánh dấu:** Trang này không nhận hay giữ bất kỳ khoản thanh toán nào.

**Lỗi khi chưa đánh dấu:** Vui lòng xác nhận giá đền bù để gửi yêu cầu.

## 6c. Hỏi đáp: giá đền bù

**Ai đặt giá đền bù?**
Người cho mượn đặt, khi đăng món đồ. Bạn sẽ thấy giá này trên tin đăng trước khi gửi yêu cầu, nên lúc nào bạn cũng biết trước.

**Ai thu tiền? Trang này có nhận thanh toán không?**
Không. Trang này không bao giờ thu, giữ hay chuyển tiền. Nếu một món đồ bị đánh dấu là hư hỏng hoặc bị mất, người mượn và người cho mượn tự thanh toán giá đền bù trực tiếp với nhau. Trang này không thể ép ai phải trả, nên hãy giữ hòa khí và cư xử hợp lý.

**Làm sao đặt một mức giá hợp lý?**
Dùng chi phí sửa chữa hoặc chi phí thay mới món đồ, cái nào thực tế hơn thì dùng. Nếu là đồ cũ, hãy tham khảo giá một món đã qua sử dụng tương tự. Đặt quá cao sẽ khiến người mượn ngại; đặt quá thấp thì bạn sẽ chịu thiệt nếu có chuyện. Một ghi chú ngắn về tình trạng món đồ trong tin đăng sẽ giúp ích cho cả hai bên.

**Nếu không có gì hư hỏng thì sao?**
Thì không có gì cả. Giá đền bù chỉ phải trả khi người cho mượn đánh dấu món đồ là hư hỏng hoặc bị mất lúc nhận lại. Nếu đồ trở về bình thường, người cho mượn đánh dấu là trả lại nguyên vẹn và không ai phải trả gì. Hao mòn thông thường không tính là hư hỏng.

## 7. Chữ nhỏ trên giao diện (tùy chọn)

- Kho đồ trống: Chưa có gì ở đây. Hãy là người đầu tiên đăng đồ.
- Hàng chờ trống: Hàng chờ của bạn đang trống. Đi tìm món gì hay ho đi.
- Món đồ có sẵn: Có thể mượn ngay
- Món đồ đang được mượn: Đang có người mượn. Hãy xếp hàng.
- Đã gửi yêu cầu: Đã gửi yêu cầu. Người cho mượn sẽ phản hồi bạn.
- Trả lại nguyên vẹn: Đã về an toàn, còn nguyên vẹn. Tuyệt lắm.
- Trả về bị hư hỏng: Đã đánh dấu là hư hỏng. Giá đền bù được áp dụng; hãy trao đổi với người cho mượn để giải quyết.

## 8. /terms — điều khoản ngắn và tuyên bố miễn trừ (BẢN NHÁP)

> **DRAFT — needs review by a lawyer before launch.** (BẢN NHÁP — cần luật sư xem xét trước khi ra mắt.) Đây là nội dung sản phẩm viết bằng ngôn ngữ dễ hiểu, không phải tư vấn pháp lý. Câu chữ, khu vực tài phán, giới hạn trách nhiệm và quy định về độ tuổi phải được một luật sư có chuyên môn kiểm tra.
>
> **Ghi chú của người dịch (không phải nội dung trang):** Bản tiếng Việt của mục này là bản dịch trung thành từ bản nháp tiếng Anh, không thay đổi ý nghĩa nào và không phải tư vấn pháp lý. Bản tiếng Việt cũng cần luật sư xem xét trước khi đăng.

**Tiêu đề:** Điều khoản sử dụng

**Cập nhật lần cuối:** Ngày 20 tháng 10 năm 2026

> **TODO before launch:** (việc cần làm trước khi ra mắt) điền ngày công bố thật vào mục "Cập nhật lần cuối" ở cả điều khoản (mục 8) và chính sách quyền riêng tư (mục 15). Ngày 20 tháng 10 năm 2026 hiện tại chỉ là ngày tạm của bản nháp. Cập nhật cả tất cả các bản dịch. Từ đó trở đi, đổi ngày mỗi khi nội dung thay đổi.

**Tóm tắt:** Trang này giúp hàng xóm cho nhau mượn đồ. Chúng tôi giới thiệu Quý vị với nhau; phần còn lại là chuyện giữa Quý vị và người kia.

1. **Chúng tôi là bảng tin, không phải người cho mượn.** Trang này không phải người cho mượn, không phải người mượn, cũng không phải một bên trong bất kỳ lượt mượn nào. Chúng tôi chỉ kết nối mọi người.
2. **Chúng tôi không giữ đồ hay tiền.** Chúng tôi không bao giờ nắm giữ đồ dùng, và không thu, giữ hay chuyển bất kỳ khoản thanh toán nào dưới bất kỳ hình thức nào.
3. **Chúng tôi không bảo đảm bất cứ điều gì về đồ dùng.** Chúng tôi không kiểm tra, xác minh hay bảo đảm tình trạng, độ an toàn, chất lượng hay tính hợp pháp của bất kỳ món đồ nào, cũng như danh tính hay độ tin cậy của bất kỳ người dùng nào. Nội dung mô tả trong tin đăng do người dùng viết.
4. **Quý vị phải từ 18 tuổi trở lên** để tạo tài khoản, đăng đồ hoặc mượn đồ.
5. **Tự chịu rủi ro khi sử dụng.** Quý vị chịu trách nhiệm quyết định có cho mượn hay mượn hay không, sử dụng đồ một cách an toàn, và tuân thủ mọi quy định áp dụng cho Quý vị. Vui lòng kiểm tra đồ trước khi dùng và không cho mượn hay mượn bất cứ thứ gì không an toàn hoặc phạm pháp.
6. **Giá đền bù do Quý vị tự giải quyết với nhau.** Nếu một món đồ bị trả về hư hỏng hoặc bị mất, người mượn và người cho mượn tự giải quyết giá đền bù trực tiếp với nhau. Trang này không thu, không cưỡng chế việc trả khoản này và không giải quyết tranh chấp liên quan đến nó.
7. **Vui lòng cư xử tử tế.** Không tin đăng giả, không quấy rối, không làm bất cứ điều gì phạm pháp. Chúng tôi có thể gỡ tin đăng hoặc tài khoản vi phạm các quy tắc này.
8. **Báo cáo.** Nếu Quý vị thấy một tin đăng hoặc một người dùng có dấu hiệu lạm dụng, không an toàn hoặc giả mạo, vui lòng dùng nút Báo cáo. Chúng tôi sẽ xem xét các báo cáo, nhưng không thể hứa sẽ xử lý mọi báo cáo hay giải quyết tranh chấp giữa người dùng. Để báo lỗi hoặc gửi ý tưởng, vui lòng dùng Gửi góp ý thay cho nút Báo cáo.
9. **Thay đổi.** Chúng tôi có thể cập nhật các điều khoản này. Tiếp tục sử dụng trang nghĩa là Quý vị chấp nhận phiên bản hiện hành.
10. **Không được phép trong v1.** Để giữ an toàn, hiện tại không thể đăng các loại sau: dụng cụ chạy điện hoặc động cơ, phương tiện giao thông, đồ leo núi và thiết bị y tế. Chúng tôi có thể gỡ tin đăng thuộc các loại này hoặc các loại rủi ro cao khác.
11. **Người cho mượn chịu trách nhiệm về độ an toàn của món đồ.** Khi đăng một món đồ, Quý vị xác nhận món đó an toàn để cho mượn và được mô tả chính xác. Người mượn chịu trách nhiệm sử dụng đồ an toàn trong thời gian giữ đồ.
12. **Quyền riêng tư (một dòng, chủ trang cần xác nhận trước khi ra mắt).** Chúng tôi chỉ thu thập những gì cần để vận hành trang, và chúng tôi không bán dữ liệu của Quý vị. [Link to privacy policy]
13. **Phi lợi nhuận.** Trang này là phi lợi nhuận. Bản thân trang không thu bất kỳ khoản phí nào, không hiển thị quảng cáo và không nhận thanh toán. Người cho mượn có thể chọn thu một khoản phí nhỏ cho một món đồ; mọi khoản phí đều do người cho mượn và người mượn thỏa thuận và trả trực tiếp cho nhau, không qua trang. [NEEDS LAWYER CONFIRMATION: câu chữ về phí.]

**Liên hệ:** [contact email]

*(Việc cần làm của chủ trang/luật sư: câu chữ về giới hạn trách nhiệm và bồi hoàn (indemnity), luật áp dụng, yêu cầu độ tuổi theo từng khu vực tài phán, đường dẫn tới chính sách quyền riêng tư, hình thức pháp lý của tổ chức phi lợi nhuận, cách xử lý tranh chấp.)*

## 9. Nút và hộp thoại Báo cáo

**Chữ trên nút:** Báo cáo
**Chú thích của nút:** Tin đăng hoặc người dùng này có vấn đề? Cho chúng tôi biết nhé.

**Tiêu đề hộp thoại:** Báo cáo {listing / user} này
(Trong code là hai câu riêng: Báo cáo tin đăng này / Báo cáo người dùng này)

**Giới thiệu:** Cảm ơn bạn đã lên tiếng. Hãy cho chúng tôi biết có gì không ổn, chúng tôi sẽ xem xét.

**Lý do (chọn một):**
- Món đồ không an toàn hoặc nguy hiểm
- Món đồ phạm pháp hoặc bị cấm
- Tin đăng giả hoặc gây hiểu lầm
- Món đồ không đúng mô tả
- Quấy rối hoặc lăng mạ
- Spam
- Lý do khác

**Nhãn ô chi tiết:** Còn điều gì chúng tôi nên biết không? (không bắt buộc)
**Chữ gợi ý ô chi tiết:** Chuyện gì đã xảy ra? Hãy kể đúng sự việc.

**Nút:** Gửi báo cáo / Hủy

**Xác nhận:** Đã gửi báo cáo. Cảm ơn bạn đã giúp hội arcade luôn thân thiện.

**Hỏi lại trước khi gửi:** Gửi báo cáo này? Chúng tôi sẽ xem xét, nhưng có thể không trả lời riêng cho bạn được.

**Chữ nhỏ dưới hộp thoại:** Chúng tôi xem xét báo cáo với tư cách một dự án phi lợi nhuận nhỏ, nên có thể mất một thời gian mới phản hồi được. Trường hợp khẩn cấp, hãy liên hệ dịch vụ khẩn cấp tại địa phương, đừng liên hệ chúng tôi. Gặp lỗi hoặc có ý tưởng? Hãy dùng Gửi góp ý thay vì báo cáo.

## 10. Thời hạn phản hồi trong hàng chờ (48 giờ)

**Thông báo cho người mượn tiếp theo trong hàng chờ (khi món đồ sẵn sàng):**
Tới lượt bạn rồi! Hãy phản hồi trong vòng 48 giờ để nhận món đồ này. Nếu chúng tôi không nhận được phản hồi của bạn, món đồ sẽ chuyển cho người tiếp theo trong hàng chờ.

**Banner trong danh sách hàng chờ (cho người đang tới lượt):**
Tới lượt bạn: {item}. Hãy phản hồi trong {left} để giữ chỗ.

**Nút:** Nhận ngay / Tạm bỏ qua

**Sắp hết giờ (dưới 6 giờ):** Cơ hội cuối: chỉ còn {left} để phản hồi.

**Thông báo hết hạn:** Hết giờ. Món này đã chuyển sang người tiếp theo trong hàng chờ. Bạn có thể xếp hàng lại bất cứ lúc nào.

**Giải thích (trang hàng chờ / hỏi đáp):**
Vì sao là 48 giờ? Để đồ không nằm không trong lúc mọi người không cầm điện thoại. Khi tới lượt, bạn có 48 giờ để phản hồi. Lỡ mất thì món đồ chuyển cho người tiếp theo; bạn luôn có thể xếp hàng lại.

## 11. Ô xác nhận trách nhiệm an toàn

Hiển thị cho người mượn khi gửi yêu cầu (và cho người cho mượn khi đăng tin, với câu chữ được điều chỉnh).

**Ô của người mượn:** Tôi chịu trách nhiệm về độ an toàn của món đồ này trong thời gian tôi giữ nó. Tôi sẽ kiểm tra trước khi dùng và sử dụng đúng cách.

**Ô của người cho mượn (khi đăng tin):** Tôi đã kiểm tra rằng món đồ này an toàn để cho mượn và phần mô tả của tôi là chính xác theo hiểu biết tốt nhất của tôi.

**Lỗi khi chưa đánh dấu:** Vui lòng xác nhận để tiếp tục.

**Dòng phụ dưới ô đánh dấu:** Trang này không kiểm tra hay bảo đảm đồ dùng. Hãy kiểm tra kỹ trước khi cho mượn, và kiểm tra lại trước khi bạn dùng.

## 12. Xác nhận từ 18 tuổi trở lên

**Ô đánh dấu khi đăng ký:** Tôi từ 18 tuổi trở lên.

**Chữ hướng dẫn:** Bạn phải từ 18 tuổi trở lên để sử dụng trang này.

**Lỗi khi chưa đánh dấu:** Bạn cần từ 18 tuổi trở lên để tham gia.

**Câu gộp khi đăng ký (phương án khác):** Tôi xác nhận tôi từ 18 tuổi trở lên và đồng ý với [Điều khoản sử dụng](/terms).

## 13. Đánh dấu khi trả: Nguyên vẹn / Hư hỏng

Hiển thị cho người cho mượn khi người mượn trả lại đồ.

**Tiêu đề câu hỏi:** Món đồ trở về thế nào?

**Giới thiệu:** Kiểm tra món đồ rồi cho chúng tôi biết. Bước này sẽ kết thúc lượt mượn.

**Lựa chọn 1 — Nguyên vẹn**
- **Nhãn:** Trả lại nguyên vẹn
- **Mô tả:** Mọi thứ đều ổn. Không ai nợ ai.
- **Xác nhận:** Đã đánh dấu là trả lại nguyên vẹn. Cảm ơn bạn đã cho mượn!

**Lựa chọn 2 — Hư hỏng hoặc mất**
- **Nhãn:** Hư hỏng hoặc mất
- **Mô tả:** Món đồ bị trả về hư hỏng, hoặc không được trả lại. Giá đền bù {amount} được áp dụng.
- **Nhãn ô ghi chú (không bắt buộc):** Chuyện gì đã xảy ra? (không bắt buộc)
- **Chữ gợi ý ô ghi chú:** ví dụ: nứt màn hình, thiếu bộ phận
- **Nhắc nhở:** Bạn và người mượn tự giải quyết khoản này trực tiếp. Trang này không thu hay giữ tiền thanh toán. Ảnh chụp lúc giao nhận và lúc trả có thể giúp ích.
- **Xác nhận:** Đã đánh dấu là hư hỏng. Giá đền bù {amount} được áp dụng; hãy trao đổi với người mượn để giải quyết.

**Ghi chú về hao mòn:** Hao mòn thông thường không tính là hư hỏng.

**Thông báo cho người mượn (nguyên vẹn):** {Lender} đã đánh dấu lượt trả của bạn là nguyên vẹn. Xong hết rồi. Tuyệt lắm.

**Thông báo cho người mượn (hư hỏng):** {Lender} đã đánh dấu lượt trả này là hư hỏng. Giá đền bù {amount} được áp dụng. Hãy liên hệ với người cho mượn để giải quyết.

**Hộp thoại xác nhận trước khi lưu “Hư hỏng”:** Đánh dấu là hư hỏng? Người mượn sẽ được báo rằng giá đền bù được áp dụng. Bạn có thể thêm ghi chú về chuyện đã xảy ra.
**Nút:** Đánh dấu là hư hỏng / Quay lại

## 14. Mô tả hình minh họa (cho SVG, không dùng emoji ở bất cứ đâu)

(Mục này là ghi chú nội bộ cho thiết kế và phát triển, không phải nội dung trang. Hình minh họa không có chữ thì không cần bản địa hóa.)

Phong cách: phẳng, viền tối dày, bóng đổ lệch sắc cạnh, màu phẳng đậm, hợp với giao diện neo-brutalism. Không dùng emoji trong nội dung hay giao diện; dùng biểu tượng Lucide hoặc các hình minh họa SVG dưới đây.

**Phần mở đầu trang chủ:** Một chiếc máy arcade (máy game thùng) to bè ở chính giữa, màn hình rộng hiển thị một lưới ô đồ dùng (một máy ảnh, một chiếc lều, một hộp dụng cụ không có máy khoan, một cây đàn guitar). Một bàn tay vươn ra từ bên trái cầm một chiếc hộp, một bàn tay khác từ bên phải đón lấy một chiếc. Bóng đổ sắc cạnh dưới máy, vài ngôi sao nhỏ hoặc tia lửa xung quanh.

**Bước 1, Khám phá:** Một chiếc kính lúp lớn đặt trên lưới thẻ đồ dùng, một thẻ được làm nổi bật bằng viền dày.

**Bước 2, Xếp hàng:** Ba hình người nhỏ đứng thành hàng sau một món đồ đặt trên bệ, người đầu tiên có huy hiệu nhỏ số “1”.

**Bước 3, Mượn:** Hai bàn tay chuyền một chiếc hộp cho nhau, phía trên lơ lửng một con dấu hình dấu tích đơn giản thể hiện đã được duyệt.

**Bước 4, Trả:** Một chiếc hộp quay về theo một mũi tên cong hướng về người đầu tiên, trên hộp có dấu tích nhỏ, và người tiếp theo trong hàng đang vẫy tay.

**Kho đồ trống:** Một chiếc kệ trống với một nhãn kiểu thẻ giá lẻ loi treo lủng lẳng, và một nút “+” nhỏ phát sáng ở cuối kệ.

**Hàng chờ trống:** Một băng chuyền trống hoặc một làn xếp hàng trống với dấu chân dẫn vào, và một lá cờ nhỏ ở đầu hàng.

## 15. Chính sách quyền riêng tư (BẢN NHÁP)

> **DRAFT — needs lawyer review.** (BẢN NHÁP — cần luật sư xem xét.) Mô tả thực tế về cách trang hoạt động, viết bằng ngôn ngữ dễ hiểu, không phải tư vấn pháp lý. Các mục có đánh dấu **[TO CONFIRM]** (cần xác nhận) chưa được chủ trang xác nhận. Không đăng cho tới khi đã được xác nhận và xem xét.
>
> **Ghi chú của người dịch (không phải nội dung trang):** Bản tiếng Việt của mục này là bản dịch trung thành từ bản nháp tiếng Anh, không thay đổi ý nghĩa nào và không phải tư vấn pháp lý. Bản tiếng Việt cũng cần luật sư xem xét trước khi đăng.

**Tiêu đề:** Chính sách quyền riêng tư

**Cập nhật lần cuối:** Ngày 20 tháng 10 năm 2026

> **TODO before launch:** (việc cần làm trước khi ra mắt) điền ngày công bố thật vào mục "Cập nhật lần cuối" ở cả điều khoản (mục 8) và chính sách quyền riêng tư (mục 15). Ngày 20 tháng 10 năm 2026 hiện tại chỉ là ngày tạm của bản nháp. Cập nhật cả tất cả các bản dịch. Từ đó trở đi, đổi ngày mỗi khi nội dung thay đổi.

**Tóm tắt:** Chúng tôi thu thập những gì cần để vận hành thư viện cho mượn đồ, lưu trữ tại nhà cung cấp cơ sở dữ liệu của chúng tôi, và không dùng chúng cho quảng cáo.

### Chúng tôi thu thập gì
- **Thông tin tài khoản:** địa chỉ email của Quý vị (được xác minh khi đăng ký) và thông tin đăng nhập.
- **Hồ sơ:** tên hiển thị, thành phố hoặc khu vực, và mọi thông tin hồ sơ khác mà Quý vị chọn thêm vào.
- **Tin đăng:** tiêu đề, mô tả, loại đồ, tình trạng, khu vực nhận đồ, các mức giá Quý vị đặt (phí và giá đền bù) và ảnh Quý vị tải lên.
- **Lịch sử mượn đồ:** yêu cầu, lượt xếp hàng, lượt duyệt, đánh dấu giao nhận và trả đồ (nguyên vẹn hoặc hư hỏng), và các ghi chú liên quan.
- **Báo cáo:** báo cáo Quý vị gửi, và báo cáo về Quý vị hoặc tin đăng của Quý vị.
- **Góp ý:** nếu Quý vị dùng Gửi góp ý, chúng tôi lưu nội dung Quý vị viết, loại góp ý Quý vị chọn (lỗi, ý tưởng hoặc khác), trang Quý vị đang xem, và một ghi chú ngắn về trình duyệt của Quý vị. Nếu Quý vị đã đăng nhập, góp ý được liên kết với tài khoản của Quý vị. Nếu Quý vị thêm thông tin liên hệ để chúng tôi trả lời, chúng tôi cũng lưu thông tin đó. [TO CONFIRM: các trường dữ liệu chính xác, dựa trên supabase/08-feedback.sql, tệp này chưa tồn tại khi nội dung này được viết.]
- **Dữ liệu kỹ thuật cơ bản:** khi Quý vị truy cập trang, các nhà cung cấp dịch vụ lưu trữ web và dịch vụ phân tích truy cập của chúng tôi xử lý thông tin kỹ thuật cơ bản, chẳng hạn như các trang Quý vị xem, vị trí gần đúng của Quý vị (quốc gia hoặc vùng), và loại trình duyệt và loại thiết bị của Quý vị. Xem mục “Phân tích truy cập và cookie” bên dưới. [TO CONFIRM: cách Vercel và Supabase xử lý nhật ký máy chủ và địa chỉ IP. NEEDS REVIEW.]

### Dữ liệu được lưu ở đâu
Tài khoản, hồ sơ, tin đăng, lịch sử mượn đồ và ảnh của Quý vị được lưu trữ tại Supabase (cơ sở dữ liệu, xác thực và lưu trữ tệp). Dữ liệu được lưu tại Canada (khu vực Supabase ca-central-1). Trang web được lưu trữ (hosting) trên Vercel.

### Người dùng khác thấy được gì
Hồ sơ công khai của Quý vị hiển thị với người dùng khác. Hồ sơ này cho thấy tên hiển thị, thành phố hoặc khu vực (nếu Quý vị có thêm vào), phần giới thiệu, tháng và năm Quý vị tham gia, và các tin đăng của Quý vị cùng ảnh của chúng. Hồ sơ cũng cho thấy các con số đơn giản: số món đồ Quý vị đã đăng, đã cho mượn và đã mượn, số lượt trả lại nguyên vẹn, và số lượt hư hỏng hoặc mất (khi Quý vị là người cho mượn và khi Quý vị là người mượn). Hồ sơ không liệt kê Quý vị đã cho ai mượn hay đã mượn của ai. [NEEDS REVIEW: đã đối chiếu với components/profile-stats.tsx và trang hồ sơ vào ngày 2026-10-20; cần kiểm tra lại nếu trang hồ sơ thay đổi.] Quý vị không nên ghi địa chỉ chính xác của mình trong tin đăng. Địa chỉ email của Quý vị không bao giờ được hiển thị công khai. Sau khi một yêu cầu được duyệt, người cho mượn và người mượn chỉ liên hệ với nhau qua tính năng tin nhắn trên trang.

### Phân tích truy cập và cookie (DRAFT, needs review) (BẢN NHÁP, cần xem xét)
Chúng tôi dùng Vercel Web Analytics để đếm số lượt truy cập các trang, nhờ đó chúng tôi biết những phần nào của trang đang được sử dụng. Dựa trên tài liệu của Vercel (trang tài liệu “Privacy and Compliance”, tức “Quyền riêng tư và Tuân thủ”, cập nhật lần cuối ngày 2026-06-26):
- Công cụ này không dùng cookie của bên thứ ba. Khách truy cập được phân biệt với nhau bằng một giá trị băm (hash) được tạo ra từ yêu cầu (request) gửi đến.
- Thông tin về phiên truy cập của khách truy cập không được lưu vĩnh viễn; thông tin này bị loại bỏ sau 24 giờ.
- Công cụ này không thu thập thông tin cho phép bất kỳ ai theo dõi Quý vị qua các trang web hoặc ứng dụng khác nhau, và chỉ được dùng cho số liệu thống kê tổng hợp.
- Mỗi lượt xem trang có thể bao gồm: thời điểm, đường dẫn của trang, trang dẫn đến, vị trí gần đúng (quốc gia, vùng, thành phố), hệ điều hành và phiên bản, trình duyệt và phiên bản, và loại thiết bị (di động, máy tính bảng hoặc máy tính để bàn).

Trước khi một lượt xem trang được gửi đi, chúng tôi loại bỏ mã (ID) của món đồ, lượt mượn và hồ sơ khỏi đường dẫn của trang, đồng thời loại bỏ các tham số truy vấn và mọi phần đứng sau dấu #. Các liên kết trong email của chúng tôi (các trang /auth/... mở ra khi Quý vị nhấn vào một liên kết đăng ký hoặc đặt lại mật khẩu) hoàn toàn không được ghi nhận, còn các trang khác chỉ được ghi nhận bằng đường dẫn của trang, ví dụ /en/login. Chúng tôi không gửi mã người dùng (user ID) của Quý vị. Chúng tôi không thể thay đổi trang dẫn đến, vì công cụ phân tích tự đưa thông tin này vào. [NEEDS REVIEW: dựa trên việc người lập trình kiểm tra mã nguồn vào ngày 2026-10-20.]

Chúng tôi không dùng dữ liệu này để hiển thị quảng cáo, và chúng tôi không bán dữ liệu này.

Cookie: trang thiết lập hai loại cookie, cả hai đều cần thiết để trang hoạt động.
- Cookie đăng nhập, do nhà cung cấp dịch vụ đăng nhập của chúng tôi (Supabase) thiết lập, giữ cho Quý vị ở trạng thái đăng nhập. Cookie này có thể được chia thành nhiều phần.
- Cookie ngôn ngữ ghi nhớ ngôn ngữ mà Quý vị đã chọn. Cookie này được lưu trong 1 năm.

Trang cũng lưu cài đặt rung khi chạm của Quý vị, lựa chọn giao diện của Quý vị (Sáng hoặc Tối; nếu Quý vị để ở Tự động thì không có thông tin nào được lưu) và tiến độ của Quý vị trong các màn hình hướng dẫn ban đầu vào bộ nhớ cục bộ (local storage) của trình duyệt, ngay trên thiết bị của chính Quý vị. Đây không phải là cookie và không được gửi cho chúng tôi.

Chúng tôi không thiết lập cookie quảng cáo hay cookie theo dõi trên nhiều trang web. [NEEDS REVIEW: dựa trên việc người lập trình kiểm tra mã nguồn vào ngày 2026-10-20; cần kiểm tra lại khi có bất kỳ thứ gì được thêm vào.]

[TO CONFIRM from Vercel or the dashboard, not stated in the docs page above: (1) địa chỉ IP có được lưu lại hay chỉ được dùng trong thời gian ngắn để xác định vị trí gần đúng; (2) dữ liệu phân tích tổng hợp được lưu giữ trong bao lâu; (3) dữ liệu phân tích được lưu trữ và xử lý ở đâu. Không đăng bất kỳ khẳng định nào về những điểm này cho tới khi đã kiểm tra.]

### Chúng tôi dùng dữ liệu như thế nào
Để vận hành trang: hiển thị tin đăng, quản lý hàng chờ và yêu cầu, giúp người cho mượn và người mượn liên hệ với nhau, xử lý báo cáo, và giữ cho trang an toàn.

### Những điều chúng tôi không làm
- Chúng tôi không bán dữ liệu của Quý vị.
- Chúng tôi không hiển thị quảng cáo.
- Trang này không nhận thanh toán, nên chúng tôi không thu thập thông tin thẻ hay tài khoản ngân hàng.

### Chia sẻ
Chúng tôi chia sẻ dữ liệu với các nhà cung cấp dịch vụ cần thiết để vận hành trang (như nhà cung cấp cơ sở dữ liệu và dịch vụ lưu trữ web). Chúng tôi có thể tiết lộ thông tin nếu pháp luật yêu cầu. [TO CONFIRM / lawyer: danh sách đầy đủ các bên xử lý dữ liệu.]

**Gửi email (Resend) (DRAFT, needs review) (BẢN NHÁP, cần xem xét).** Chúng tôi dùng Resend để gửi các email cho tài khoản của Quý vị: xác minh email của Quý vị, đặt lại mật khẩu của Quý vị và các thông báo bảo mật. Các email này được gửi từ no-reply@project-arcade.ricebarrel.com. Để gửi các email này, Resend nhận địa chỉ email của Quý vị và nội dung của thư. Chúng tôi chỉ dùng Resend để gửi các email liên quan đến tài khoản của Quý vị, và Resend chỉ nhận địa chỉ email của Quý vị cho mục đích đó. Chúng tôi không gửi email tiếp thị. Theo chính sách quyền riêng tư của Resend, Resend chuyển dữ liệu sang Hoa Kỳ và xử lý dữ liệu tại đó. [TO CONFIRM from Resend: (1) liệu Resend có đóng vai trò là bên xử lý dữ liệu cho chúng tôi hay không và đã có thỏa thuận xử lý dữ liệu hay chưa; (2) Resend lưu giữ nội dung email đã gửi và nhật ký trong bao lâu (chính sách quyền riêng tư của Resend không nêu thời hạn); (3) các bên xử lý phụ của Resend (Resend liệt kê các bên này tại resend.com/legal/subprocessors). Luật sư cần kiểm tra câu chữ về việc chuyển dữ liệu ra nước ngoài.]

### Lưu giữ và xóa dữ liệu
_Góp ý:_ nếu Quý vị xóa tài khoản, góp ý của Quý vị vẫn được giữ lại nhưng không còn liên kết với Quý vị. [TO CONFIRM: khớp với `user_id ON DELETE SET NULL` trong supabase/08-feedback.sql; thời hạn lưu giữ, và liệu thông tin liên hệ để trả lời có bị xóa theo hay không.]

Quý vị có thể tự xóa tài khoản trong phần cài đặt tài khoản. Khi Quý vị xóa, hồ sơ của Quý vị, các món đồ của Quý vị cùng ảnh của chúng, và vị trí của Quý vị trong các hàng chờ sẽ bị xóa. Các yêu cầu đang chờ và đã được duyệt của Quý vị sẽ bị đóng, và nội dung các tin nhắn Quý vị đã gửi sẽ được thay bằng “[message removed]”. Lịch sử mượn đồ (tên món đồ, ngày tháng, giá đền bù, ghi chú hư hỏng và trạng thái), tin nhắn người kia đã gửi trong các cuộc trò chuyện của Quý vị, và các báo cáo sẽ được giữ lại nhưng không còn liên kết với Quý vị. Quý vị không thể xóa tài khoản khi vẫn còn món đồ đang ở trạng thái đã giao nhận. [TO CONFIRM: nhật ký và các hồ sơ được giữ lại sẽ được lưu trong bao lâu. Luật sư cần kiểm tra mọi yêu cầu lưu giữ theo luật. Dựa trên supabase/05-messages-and-deletion.sql, tệp này chưa được chạy.]

### Lựa chọn của Quý vị
Quý vị có thể chỉnh sửa hồ sơ và tin đăng trong ứng dụng, và xóa tài khoản bất cứ lúc nào. Với các câu hỏi khác về dữ liệu của Quý vị, vui lòng liên hệ chúng tôi qua [contact email].

### Độ tuổi
Trang này dành cho người từ 18 tuổi trở lên. Chúng tôi không cố ý thu thập dữ liệu từ bất kỳ ai dưới 18 tuổi.

### Thay đổi
Chúng tôi có thể cập nhật chính sách này và sẽ đổi ngày ở trên khi cập nhật.

### Liên hệ
[contact email]

*(Việc cần làm của luật sư: các luật về quyền riêng tư được áp dụng (ví dụ GDPR/UK GDPR/CCPA tùy theo người dùng), cơ sở pháp lý và câu chữ về các quyền, việc chuyển dữ liệu ra nước ngoài, thông báo về cookie, thời hạn lưu giữ, danh sách các bên xử lý dữ liệu.)*

## 16. Tin nhắn, xóa tài khoản, xác minh email, đăng nhập

Không dùng emoji; dùng biểu tượng Lucide.

### 16a. Tin nhắn trên trang

**Tiêu đề trang:** Tin nhắn
**Trạng thái trống:** Chưa có tin nhắn nào. Khi một yêu cầu được duyệt, bạn có thể trò chuyện với người kia tại đây.
**Đầu cuộc trò chuyện:** {Name} về {item}
**Chữ gợi ý ô nhập:** Viết tin nhắn
**Nút gửi:** Gửi
**Thông báo ở đầu cuộc trò chuyện:** Tin nhắn chỉ nằm trên trang. Người kia không bao giờ thấy địa chỉ email của bạn. Hãy dùng tin nhắn để thống nhất thời gian và địa điểm giao nhận.
**Mẹo an toàn:** Nếu được, hãy gặp nhau ở nơi công cộng, và đừng chia sẻ thông tin cá nhân không cần thiết.
**Cuộc trò chuyện bị khóa (trước khi duyệt):** Tính năng nhắn tin sẽ mở khi người cho mượn duyệt yêu cầu.
**Banner lượt mượn đã kết thúc:** Lượt mượn này đã kết thúc. Hai bạn vẫn có thể nhắn tin cho nhau về yêu cầu đền bù hư hỏng.
**Thông báo tin nhắn mới:** {Name} đã gửi cho bạn một tin nhắn về {item}.
**Lỗi:** Không gửi được tin nhắn. Vui lòng thử lại.
**Liên kết báo cáo trong cuộc trò chuyện:** Báo cáo cuộc trò chuyện này

### 16b. Xóa tài khoản

**Mục vào (cài đặt tài khoản, vùng nguy hiểm):**
- **Tiêu đề:** Xóa tài khoản
- **Nội dung:** Xóa vĩnh viễn tài khoản của bạn. Không thể hoàn tác.
- **Nút:** Xóa tài khoản của tôi

**Hộp thoại xác nhận**
- **Tiêu đề:** Xóa tài khoản của bạn?
- **Nội dung:** Thao tác này sẽ xóa hồ sơ và ảnh của bạn. Các món đồ của bạn sẽ bị gỡ. Lịch sử mượn đồ của bạn vẫn ở trên trang nhưng được ẩn danh, nên không còn liên kết với bạn.
- **Cảnh báo nếu còn lượt mượn đang mở:** Bạn có món đồ đang được mượn hoặc đang trong quá trình xử lý. Vui lòng hoàn tất hoặc hủy chúng trước khi xóa tài khoản.
- **Nhãn ô xác nhận:** Gõ DELETE để xác nhận
- **Nút:** Xóa tài khoản của tôi / Giữ tài khoản của tôi
- **Thành công:** Tài khoản của bạn đã được xóa. Cảm ơn bạn đã là một phần của hội arcade.
- **Lỗi:** Không xóa được tài khoản của bạn. Vui lòng thử lại hoặc liên hệ chúng tôi qua [contact email].

(Chủ trang đã xác nhận: các món đồ bạn đã đăng sẽ bị xóa cùng tài khoản. Xem 17.7 để biết câu chữ hiện tại của hộp thoại.)

### 16c. Xác minh email

**Tiêu đề:** Kiểm tra email của bạn
**Nội dung:** Chúng tôi đã gửi liên kết xác minh tới địa chỉ email bạn dùng để đăng ký. Nhấn vào liên kết để kích hoạt tài khoản. (Đã được thay thế bởi mục 17.3: địa chỉ không bao giờ được hiển thị.)
**Chữ phụ:** Không thấy? Hãy xem trong thư mục thư rác.
**Nút:** Gửi lại email
**Đã gửi lại:** Đã gửi lại email xác minh. Có thể mất khoảng một phút để email tới.
**Giới hạn tần suất:** Vui lòng đợi một chút trước khi yêu cầu email khác.
**Tiêu đề trang thành công:** Đã xác minh email
**Nội dung trang thành công:** Bạn đã vào rồi. Bắt đầu khám phá, hoặc đăng món đồ đầu tiên của bạn.
**Nút trang thành công:** Khám phá kho đồ / Đăng đồ của bạn
**Liên kết hết hạn:** Liên kết này đã hết hạn. Hãy yêu cầu một email xác minh mới.
**Thông báo chặn (khi người dùng chưa xác minh định mượn hoặc đăng đồ):** Vui lòng xác minh email trước. Chỉ mất một chút thôi.

### 16d. Đăng nhập / Đăng ký

**Đăng nhập**
- **Tiêu đề:** Chào mừng bạn trở lại
- **Ô:** Email / Mật khẩu
- **Nút:** Đăng nhập
- **Liên kết:** Quên mật khẩu? / Bạn mới tới? Tạo tài khoản
- **Lỗi:** Email hoặc mật khẩu không đúng.
- **Lỗi chưa xác minh:** Vui lòng xác minh email trước. Gửi lại email xác minh.

**Đăng ký**
- **Tiêu đề:** Gia nhập hội arcade
- **Phụ đề:** Phi lợi nhuận, không quảng cáo, trang không thu phí.
- **Ô:** Tên hiển thị / Email / Mật khẩu / Thành phố hoặc khu vực
- **Gợi ý mật khẩu:** Ít nhất 8 ký tự.
- **Ô 18+:** Tôi từ 18 tuổi trở lên.
- **Dòng điều khoản:** Tôi đồng ý với [Điều khoản sử dụng](/terms) và [Chính sách quyền riêng tư](/privacy).
- **Nút:** Tạo tài khoản
- **Liên kết:** Đã có tài khoản? Đăng nhập
- **Lỗi:** Email này đã được đăng ký. / Vui lòng nhập email hợp lệ. / Mật khẩu quá ngắn. / Bạn cần từ 18 tuổi trở lên để tham gia.

**Quên mật khẩu**
- **Tiêu đề:** Đặt lại mật khẩu
- **Nội dung:** Nhập email của bạn, chúng tôi sẽ gửi một liên kết để bạn đặt mật khẩu mới.
- **Nút:** Gửi liên kết đặt lại
- **Xác nhận:** Nếu có tài khoản dùng email đó, liên kết đặt lại đang trên đường tới. Email được gửi từ no-reply@project-arcade.ricebarrel.com, nên hãy xem cả thư mục spam hoặc thư rác. [NEEDS REVIEW]

## 17. Nội dung giao diện vòng 3 (đăng nhập, đăng ký, xác minh, tin nhắn, cài đặt, xem trước)

Quy tắc: trang không bao giờ hiển thị địa chỉ email của bất kỳ người dùng nào, kể cả của chính người dùng đó. Nội dung dưới đây chỉ nói “email của bạn” hoặc “địa chỉ bạn dùng để đăng ký” và không bao giờ hiện địa chỉ. Quy tắc này thay thế mọi nội dung ở trên có hiển thị {email} (xem 16c).

### 17.1 /login

**Tiêu đề:** Chào mừng bạn trở lại
**Phụ đề:** Đăng nhập để xem hàng chờ và yêu cầu của bạn.
**Nhãn:** Email / Mật khẩu
**Nút:** Đăng nhập
**Liên kết:** Quên mật khẩu? / Bạn mới tới? Tạo tài khoản
**Lỗi**
- Sai thông tin đăng nhập: Email hoặc mật khẩu chưa đúng. Hãy thử lại.
- Chưa xác minh: Vui lòng xác minh email trước khi đăng nhập. Gửi lại email xác minh
- Thử quá nhiều lần: Bạn đã thử quá nhiều lần. Vui lòng đợi vài phút rồi thử lại.
- Lỗi chung: Đã có lỗi xảy ra. Vui lòng thử lại.

### 17.2 /signup

**Tiêu đề:** Gia nhập hội arcade
**Phụ đề:** Phi lợi nhuận, không quảng cáo, trang không thu phí.
**Nhãn:** Tên hiển thị / Thành phố (không bắt buộc) / Email / Mật khẩu
**Gợi ý mật khẩu:** Ít nhất 8 ký tự.
**Ô 18+:** Tôi từ 18 tuổi trở lên. (dùng lại mục 12)
**Dòng điều khoản:** Tôi đồng ý với [Điều khoản sử dụng](/terms) và [Chính sách quyền riêng tư](/privacy).
**Nút:** Tạo tài khoản
**Liên kết:** Đã có tài khoản? Đăng nhập
**Lỗi**
- Mật khẩu quá ngắn: Mật khẩu của bạn cần ít nhất 8 ký tự.
- Email sai định dạng: Vui lòng nhập địa chỉ email hợp lệ.
- Chưa đánh dấu 18+: Bạn cần từ 18 tuổi trở lên để tham gia.
- Lỗi chung: Chúng tôi không tạo được tài khoản của bạn. Vui lòng kiểm tra lại thông tin rồi thử lại.

**Sau khi gửi (luôn cùng một thông báo, dù email đã được đăng ký hay chưa, để không bao giờ lộ ai đã có tài khoản):** Sắp xong rồi. Nếu địa chỉ này có thể dùng để đăng ký, bạn sẽ sớm nhận được email từ chúng tôi. Hãy làm theo liên kết bên trong để hoàn tất.

### 17.3 /check-email

**Tiêu đề:** Kiểm tra email của bạn
**Nội dung:** Chúng tôi đã gửi liên kết xác minh tới địa chỉ bạn dùng để đăng ký. Nhấn vào liên kết để kích hoạt tài khoản.
**Mẹo:** Không thấy? Hãy xem trong thư mục spam hoặc thư rác. Email của chúng tôi được gửi từ no-reply@project-arcade.ricebarrel.com. [NEEDS REVIEW]
**Tiêu đề form gửi lại:** Chưa nhận được?
**Nhãn ô gửi lại:** Email
**Hướng dẫn gửi lại:** Nhập email bạn đã dùng để đăng ký, chúng tôi sẽ gửi lại liên kết.
**Nút gửi lại:** Gửi lại email
**Gửi lại thành công (cùng một thông báo dù địa chỉ có tồn tại hay không):** Nếu địa chỉ đó có tài khoản đang chờ xác minh, một liên kết mới đang trên đường tới. Có thể mất khoảng một phút.
**Giới hạn tần suất:** Vui lòng đợi một chút trước khi yêu cầu email khác.

### 17.4 Xác minh thất bại (liên kết hết hạn hoặc không hợp lệ)

**Tiêu đề:** Liên kết đó không dùng được
**Nội dung:** Liên kết xác minh đã hết hạn hoặc không còn hợp lệ. Hãy yêu cầu liên kết mới rồi thử lại.
**Mục gửi lại:** Nhập email của bạn, chúng tôi sẽ gửi một liên kết mới. (cùng form với 17.3)
**Nút:** Gửi liên kết mới
**Liên kết phụ:** Quay lại đăng nhập

### 17.5 Đăng xuất và thanh đầu trang

**Nút trên thanh đầu trang (khi chưa đăng nhập):** Đăng nhập
**Nút đăng xuất:** Đăng xuất
**Thông báo nhanh khi đăng xuất:** Bạn đã đăng xuất. Hẹn gặp lại lần sau.

### 17.6 Tin nhắn trên trang

(Mỗi lượt mượn có một cuộc trò chuyện, chỉ mở sau khi người cho mượn duyệt.)

**Tiêu đề /messages:** Tin nhắn
**Giới thiệu /messages:** Mỗi lượt mượn một cuộc trò chuyện. Dùng nó để thống nhất thời gian và địa điểm giao nhận.
**Trạng thái trống:** Chưa có cuộc trò chuyện nào. Khi người cho mượn duyệt một yêu cầu, bạn có thể trò chuyện tại đây.
**Dòng trong danh sách:** {Name} về {item}
**Tiêu đề cuộc trò chuyện:** {item} với {Name}
**Chữ gợi ý ô nhập:** Viết tin nhắn
**Nút gửi:** Gửi
**Thông báo an toàn (đầu cuộc trò chuyện):** Người kia không thấy được địa chỉ email của bạn. Hãy giữ cuộc trò chuyện trên trang.
**Nhắc về thông tin nhạy cảm:** Đừng chia sẻ mật khẩu, thông tin thanh toán hay số giấy tờ tùy thân trong tin nhắn.
**Mẹo gặp mặt:** Nếu được, hãy gặp nhau ở nơi công cộng.
**Banner lượt mượn đã kết thúc:** Lượt mượn này đã kết thúc. Hai bạn vẫn có thể nhắn tin cho nhau về yêu cầu đền bù hư hỏng.
(Quyết định của chủ trang: cuộc trò chuyện vẫn mở sau khi lượt mượn kết thúc. Lượt mượn đã kết thúc không có chế độ chỉ đọc.)
**Chưa được duyệt (nếu mở sớm):** Tính năng nhắn tin sẽ mở khi người cho mượn duyệt yêu cầu.
**Lỗi:** Không gửi được tin nhắn. Vui lòng thử lại.

### 17.7 /settings

**Tiêu đề:** Cài đặt

**Phần hồ sơ**
- **Tiêu đề:** Hồ sơ
- **Nhãn:** Tên hiển thị / Thành phố / Giới thiệu
- **Chữ gợi ý ô giới thiệu:** Một hai dòng về bạn và những món đồ bạn thích. Đừng ghi thông tin liên lạc.
- **Nút:** Lưu thay đổi
- **Thành công:** Đã lưu hồ sơ.
- **Lỗi:** Không lưu được thay đổi của bạn. Vui lòng thử lại.

**Phần xóa tài khoản**
- **Tiêu đề:** Xóa tài khoản
- **Nội dung:** Xóa vĩnh viễn tài khoản của bạn. Không thể hoàn tác. Trước khi xác nhận, bạn sẽ thấy rõ những gì bị xóa và những gì được giữ lại.
- **Nút:** Xóa tài khoản của tôi

**Hộp thoại xác nhận**
- **Tiêu đề:** Xóa tài khoản của bạn?
- **Nội dung:** Không thể hoàn tác.
- **Tiêu đề phần bị xóa:** Những gì sẽ bị xóa
- **Danh sách bị xóa:**
  - Hồ sơ của bạn
  - Tất cả món đồ của bạn và ảnh của chúng
  - Vị trí của bạn trong mọi hàng chờ
  - Các yêu cầu đang chờ và đã được duyệt của bạn (sẽ tự động bị đóng)
  - Nội dung các tin nhắn bạn đã gửi (được thay bằng “[message removed]”)
- **Tiêu đề phần được giữ lại:** Những gì sẽ được giữ lại (không còn liên kết với bạn)
- **Danh sách được giữ lại:**
  - Lịch sử mượn đồ: tên món đồ, ngày tháng, giá đền bù, ghi chú hư hỏng và trạng thái
  - Tin nhắn người kia đã gửi trong các cuộc trò chuyện của bạn
  - Báo cáo
- **Cảnh báo lượt mượn đang mở (chặn việc xóa):** Bạn có món đồ hiện đang ở trạng thái đã giao nhận. Hãy hoàn tất các lượt mượn đó trước khi xóa tài khoản.
- **Câu nhắc xác nhận:** Gõ DELETE để xác nhận.
- **Chữ gợi ý ô nhập:** DELETE
- **Nút:** Xóa tài khoản của tôi / Hủy
- **Gợi ý khi gõ không khớp:** Gõ DELETE đúng y như hiển thị để tiếp tục.
- **Thành công:** Tài khoản của bạn đã được xóa. Cảm ơn bạn đã là một phần của hội arcade.
- **Lỗi:** Không xóa được tài khoản của bạn. Vui lòng thử lại.

### 17.8 Chế độ xem trước

**Thông báo sau mỗi lần gửi khi chức năng ghi dữ liệu thật đang tắt:** Chỉ là xem trước: chưa có gì được gửi hay lưu.
**Banner (tùy chọn, đầu trang):** Chế độ xem trước. Bạn có thể xem xung quanh, nhưng chưa có gì được lưu.

### 17.9 Rà soát các chuỗi chữ do người lập trình viết

Giữ nguyên như đã viết, trừ khi có ghi chú. Câu chữ đề xuất được in đậm. (Trong ngoặc kép là nguyên văn tiếng Anh, trong ngoặc đơn là bản dịch tiếng Việt.)

**Tin nhắn**
- "Write a message before sending." (Hãy viết tin nhắn trước khi gửi.): ổn. Phương án khác: **Viết tin nhắn trước đã.**
- "Messages can be up to 2,000 characters." (Tin nhắn tối đa 2.000 ký tự.): ổn. Hiển thị bộ đếm trực tiếp khi gần tới giới hạn, ví dụ **{n} / 2.000**.
- "No messages yet." (Chưa có tin nhắn nào.): ổn. Thêm: **Chào nhau một câu rồi hẹn thời gian và địa điểm nhé.**
- "This request is closed, so messaging is off." (Yêu cầu này đã đóng, nên tính năng nhắn tin đã tắt.): đổi thành **Yêu cầu này đã đóng, nên bạn không thể gửi tin nhắn mới.** (chỉ hiển thị cho yêu cầu bị từ chối hoặc bị hủy)
- "The other person deleted their account, so new messages can't be sent." (Người kia đã xóa tài khoản, nên không thể gửi tin nhắn mới.): ổn. Bản ngắn hơn (tùy chọn): **Tài khoản của người kia đã bị xóa, nên bạn không thể gửi tin nhắn mới.**
- Tin nhắn từ tài khoản đã xóa hiển thị là: **[message removed]** (giao diện tiếng Việt nên hiển thị **[tin nhắn đã bị xóa]**, cần code hỗ trợ, xem phần câu hỏi cần phối hợp ở cuối file)
- Banner cuộc trò chuyện mẫu: **Cuộc trò chuyện mẫu. Không có gì ở đây là thật hay được lưu lại.**

**Quên mật khẩu**
- "That link has expired. Request a new one below." (Liên kết đó đã hết hạn. Hãy yêu cầu liên kết mới bên dưới.): ổn, giữ nguyên.
- "Your password has been updated." (Mật khẩu của bạn đã được cập nhật.): giữ nguyên. (Đề xuất trước đó "You can sign in now" đã được rút lại: quy trình đặt lại mật khẩu để người dùng ở trạng thái đã đăng nhập trên /profile. Tùy chọn: **Mật khẩu của bạn đã được cập nhật. Bạn đang đăng nhập.**)
- Nhãn người gửi cho tin nhắn từ tài khoản đã xóa: **Tài khoản đã xóa**

**Lỗi cấp trang**
- Tiêu đề: **Đã có lỗi xảy ra**
- Nội dung: **Hiện chúng tôi không tải được trang này. Vui lòng thử lại sau giây lát.** (giữ như đã viết)
- Nút: **Thử lại** ; liên kết: **Về trang chủ**

### 17.10 Các chuỗi còn lại do người lập trình viết (cài đặt và tin nhắn)

Đã rà soát, đối chiếu với components/messages và components/settings. Tất cả đều hợp giọng văn; nay là nội dung chính thức.

**Kiểm tra hồ sơ:** Vui lòng nhập tên hiển thị. / Tên hiển thị tối đa 60 ký tự. / Thành phố tối đa 80 ký tự. / Phần giới thiệu tối đa 500 ký tự.
**Nút khi đang xử lý:** Đang xóa... (dùng ba dấu chấm thường, không dùng ký tự dấu ba chấm đặc biệt nếu codebase tránh nó)
**Nhãn tin nhắn:** Bạn / Tài khoản đã xóa
**Huy hiệu trạng thái lượt mượn khi trả về hư hỏng:** **Hư hỏng hoặc mất** (chủ trang đã duyệt, khớp với mục 13).

**Đã quyết (quyết định của chủ trang):** tin nhắn vẫn mở sau khi lượt mượn đã được trả hoặc bị đánh dấu hư hỏng, dùng banner lượt mượn đã kết thúc ở 17.6. Chính sách SQL đã cho phép điều này; giao diện và nội dung nay đã khớp với nó.

## 18. Di động: hướng dẫn sau khi đăng ký và thanh điều hướng dưới cùng

Không dùng emoji. Hình minh họa theo phong cách ở mục 14.

### 18.1 Hướng dẫn ban đầu (4 màn hình, có thể bỏ qua)

**Liên kết bỏ qua (góc trên bên phải mỗi màn hình):** Bỏ qua
**Tiến độ:** 1/4 (dùng chấm tròn là được, không cần chữ)
**Nút hoàn tất ở màn hình cuối, thay cho Tiếp:** Bắt đầu khám phá

**Màn hình 1: Chào mừng**
- **Tiêu đề:** Chào mừng tới project-arcade
- **Nội dung:** Một thư viện đồ dùng phi lợi nhuận, do hàng xóm cùng vận hành. Bản thân trang không thu phí gì cả. Trang đang ở giai đoạn pre-alpha, nên mọi thứ có thể thay đổi.
- **Nút:** Tiếp
- **Hình minh họa:** Chiếc máy arcade ở phần mở đầu trang chủ, trên nóc cắm một lá cờ chào mừng nhỏ, bên hông dán một nhãn “pre-alpha” nhỏ xíu.

**Màn hình 2: Mượn và trả**
- **Tiêu đề:** Xếp hàng, mượn, trả
- **Nội dung:** Thêm món bạn muốn vào hàng chờ. Khi tới lượt, bạn có 48 giờ để phản hồi, sau đó tới lấy đồ và mang trả lại.
- **Nút:** Tiếp
- **Hình minh họa:** Ba hình người nhỏ xếp hàng sau một món đồ đặt trên bệ, người đầu tiên cầm một chiếc đồng hồ nhỏ hiện số 48.

**Màn hình 3: Giá đền bù**
- **Tiêu đề:** Giá đền bù là gì?
- **Nội dung:** Đó là số tiền bạn sẽ phải trả cho người cho mượn nếu món đồ bị trả về hư hỏng hoặc bị mất. Bạn tự giải quyết trực tiếp với họ; trang này không bao giờ nhận tiền.
- **Nút:** Tiếp
- **Hình minh họa:** Một chiếc hộp có thẻ giá nhỏ và một vết nứt, phía trên là hai bàn tay bắt nhau, không có đồng xu hay thẻ ngân hàng nào.

**Màn hình 4: An toàn và 18+**
- **Tiêu đề:** Giữ an toàn
- **Nội dung:** Bạn phải từ 18 tuổi trở lên. Chỉ trò chuyện qua tin nhắn trên trang; email của bạn không bao giờ hiển thị với bất kỳ ai.
- **Nút:** Bắt đầu khám phá
- **Hình minh họa:** Một bong bóng thoại có hình chiếc khiên kèm dấu tích, bên cạnh là một phong bì có ổ khóa và dấu gạch chéo.

### 18.2 Thanh điều hướng dưới cùng trên di động

Nhãn, theo thứ tự: **Trang chủ** / **Khám phá** / **Đăng** / **Hàng chờ** / **Tôi**
(Dùng biểu tượng Lucide: house, search, plus, list hoặc clock, user.)

### 18.3 Các mục trong trang “Tôi”

- **Tin nhắn** (dòng phụ: Trò chuyện với người cho mượn và người mượn)
- **Cài đặt** (dòng phụ: Hồ sơ và tài khoản)
- **Đăng xuất**

### 18.4 Cài đặt: Thiết bị này

**Tiêu đề mục:** Thiết bị này
**Nhãn công tắc:** Rung khi chạm
**Mô tả:** Rung nhẹ một cái khi bạn chạm vào nút. Chỉ lưu trên thiết bị này.
**Thông báo khi trình duyệt không hỗ trợ:** Trình duyệt này không rung được. Một số thiết bị, bao gồm iPhone và iPad, không hỗ trợ tính năng này.
(Ba dòng đầu giữ như người lập trình đã viết. Chỉ thông báo không hỗ trợ được thay đổi, để tránh khẳng định tuyệt đối về iPhone và iPad mà sau này có thể không còn đúng.)

## 19. Gửi góp ý (lỗi và ý tưởng)

Tách riêng với Báo cáo. Báo cáo chỉ dùng cho hành vi lạm dụng liên quan đến món đồ và người dùng (mục 9). Gửi góp ý dùng cho lỗi, ý tưởng và mọi điều khác về chính trang này.

**Nhãn mục vào (chân trang, trang Tôi, menu):** Gửi góp ý
**Dòng phụ (trang Tôi):** Bạn gặp lỗi hoặc có ý tưởng?

**Tiêu đề hộp thoại:** Gửi góp ý
**Giới thiệu:** project-arcade đang ở giai đoạn pre-alpha, nên góp ý của bạn thật sự rất có ích. Hãy cho chúng tôi biết chỗ nào bị lỗi, khó hiểu hoặc còn thiếu.

**Loại (chọn một):** Lỗi / Ý tưởng / Khác
**Nhãn ô nội dung:** Bạn muốn chia sẻ điều gì?
**Chữ gợi ý ô nội dung (Lỗi):** Chuyện gì đã xảy ra, và bạn mong đợi điều gì? Lúc đó bạn đang ở trang nào?
**Chữ gợi ý ô nội dung (Ý tưởng):** Điều gì sẽ giúp trang tốt hơn?
**Chữ gợi ý ô nội dung (Khác):** Muốn nói gì cũng được.
**Nhãn ô liên hệ để trả lời (không bắt buộc):** Chúng tôi có thể trả lời bạn qua đâu? (không bắt buộc)
**Chữ hướng dẫn ô liên hệ:** Chỉ điền nếu bạn muốn nhận câu trả lời. Chúng tôi sẽ không dùng thông tin này vào việc gì khác. Đừng ghi mật khẩu hay thông tin thanh toán.
**Ghi chú:** Email tài khoản của bạn không bao giờ hiển thị ở đây. Nếu muốn nhận trả lời qua email, hãy gõ địa chỉ bạn muốn chúng tôi dùng.

**Nút:** Gửi góp ý / Hủy
**Thành công:** Cảm ơn bạn! Đã gửi góp ý của bạn.
**Lỗi**
- Chưa viết nội dung: Vui lòng viết nội dung trước đã.
- Quá dài: Nội dung của bạn quá dài. Vui lòng rút ngắn lại. [limit TBD by the builder] (ghi chú: giới hạn ký tự do người lập trình quyết định)
- Gửi thất bại: Không gửi được góp ý của bạn. Vui lòng thử lại.
- Gửi quá nhiều lần: Bạn đã gửi quá nhiều lần. Vui lòng đợi vài phút rồi thử lại.

**Vị trí hiển thị:** thêm một dòng vào chữ nhỏ dưới hộp thoại Báo cáo (mục 9): Gặp lỗi hoặc có ý tưởng? Hãy dùng Gửi góp ý thay vì báo cáo.

**Ghi chú quyền riêng tư (thêm vào mục 15 khi cách lưu góp ý đã được xác nhận):** Góp ý bạn gửi được lưu cùng tài khoản của bạn và thông tin liên hệ để trả lời mà bạn nhập (nếu có). [TO CONFIRM by the builder and owner: những gì được lưu và lưu trong bao lâu.]

## 20. Discord (không dịch, chỉ có tiếng Anh theo quyết định của người điều phối)

Mục 20 của copy-en.md chỉ được giữ bằng tiếng Anh.

## 21. Trang pháp lý bản dịch: thông báo bản dịch không chính thức (cần luật sư xem xét)

> **Needs lawyer review.** (Cần luật sư xem xét.) Nguồn: docs/i18n-legal-notice.md (7号). Câu chữ dưới đây dùng “applies” (được áp dụng). Nếu luật sư muốn dùng “prevails” (có giá trị ưu tiên), cần đổi ở cả 10 ngôn ngữ. Câu N1 đã được dùng trong code của trang dưới dạng một chuỗi có liên kết; không thay đổi câu chữ của khóa này mà không báo cho 1号 (project-arcade-46).

Chỉ hiển thị trên các trang /terms và /privacy bản dịch, không bao giờ hiển thị trên các trang tiếng Anh.

**N1 (banner, phía trên ghi chú DRAFT):** Đây là bản dịch không chính thức. Nếu bản dịch này có điểm khác với bản tiếng Anh, bản tiếng Anh sẽ được áp dụng.
**N1 có liên kết (đúng khóa từ điển mà code dùng):** Đây là bản dịch không chính thức. Nếu bản dịch này có điểm khác với <link>bản tiếng Anh</link>, bản tiếng Anh sẽ được áp dụng.
**N2 (chữ của liên kết):** Đọc bản tiếng Anh
**N3 (nhãn ngắn, ví dụ siêu dữ liệu của trang hoặc bộ chuyển ngôn ngữ trên các trang pháp lý):** Bản dịch không chính thức

## 22. Đa ngôn ngữ (i18n) và các chuỗi hệ thống (đã rà soát 2026-10-20)

Rà soát các chuỗi tạm do người lập trình viết. Giữ nguyên, trừ khi có ghi chú. (Trong ngoặc kép là nguyên văn tiếng Anh, chữ in đậm là chuỗi giao diện tiếng Việt.)

**Nhãn bộ chuyển ngôn ngữ** ("Language"): **Ngôn ngữ**. Giữ nguyên.
**Thông báo N1 có liên kết** ("This is an unofficial translation. If it differs from the <link>English version</link>, the English version applies."): **Đây là bản dịch không chính thức. Nếu bản dịch này có điểm khác với <link>bản tiếng Anh</link>, bản tiếng Anh sẽ được áp dụng.** Giữ nguyên, như ở mục 21.
**Trang chưa có bản dịch** ("This page isn't available in your language yet, so it's shown in English."): **Trang này chưa có bản tiếng Việt, nên đang được hiển thị bằng tiếng Anh.** Giữ nguyên. Dễ hiểu và thân thiện.
**Ngày cập nhật** ("Last updated: {date}"): **Cập nhật lần cuối: {date}**. Giữ nguyên. Ngày được định dạng theo ngôn ngữ của người dùng (tiếng Việt: ngày 20 tháng 10 năm 2026).
**Đơn vị đếm ngược:** "{h}h {m}m" là **{h} giờ {m} phút**, và "{m}m" (khi còn dưới một giờ) là **{m} phút**. Giữ dạng khóa đơn vị. Không thêm chữ “left” (còn) vào khóa đơn vị. Thời gian chỉ xuất hiện bên trong hai câu đầy đủ (mục 10): "Respond within {left} to keep your spot." (**Hãy phản hồi trong {left} để giữ chỗ.**) và "Last call: {left} left to respond." (**Cơ hội cuối: chỉ còn {left} để phản hồi.**) Người dịch chỉ cần bản địa hóa chữ viết tắt của đơn vị và giữ thời gian bên trong hai câu này. Trong tiếng Việt, “left” được diễn đạt bằng chữ “còn” đặt trước thời gian (ví dụ “chỉ còn 5 giờ 30 phút”), và chữ này đã nằm sẵn trong câu, không nằm trong khóa đơn vị.
**Trang 404 (chữ hiển thị, thay cho đề xuất trước đó):** giữ số “404” lớn.
- **Tiêu đề** ("Nothing on this shelf"): **Kệ này trống trơn**
- **Nội dung** ("That page or item doesn't exist, or it's been taken down."): **Trang hoặc món đồ đó không tồn tại, hoặc đã bị gỡ.**
- **Nút chính** ("Browse the catalogue", dẫn tới /browse): **Khám phá kho đồ**
- **Liên kết phụ (mới)** ("Back to home"): **Về trang chủ**
**Tiêu đề tab trình duyệt của trang 404** ("Page not found"): **Không tìm thấy trang**
**Mô tả meta của trang 404** ("The page or item you were looking for doesn't exist, or it's been taken down."): **Trang hoặc món đồ bạn đang tìm không tồn tại, hoặc đã bị gỡ.**
(Đề xuất trước đó dùng “Page not found” làm tiêu đề hiển thị và một nội dung mới đã được rút lại: chữ hiển thị hiện có hợp với phong cách của trang, đúng cho cả trang lẫn món đồ, và đã được làm xong.)
(Trang lỗi chung đã dùng “Đã có lỗi xảy ra” cùng “Thử lại” và “Về trang chủ”, mục 17.9.)

## 23. /list: bộ chọn ảnh tùy chỉnh

Thay nút “Choose files” mặc định của trình duyệt bằng một nút theo ngôn ngữ của trang. Giữ nguyên nhãn hiện có “Ảnh” và chữ hướng dẫn hiện có “Vài tấm ảnh rõ nét giúp người mượn dễ đồng ý hơn. Tối đa 8 ảnh.” (đã có trong code, nên giới hạn số ảnh không nhắc lại ở đây; chữ hướng dẫn không có giới hạn dung lượng, nên không thêm).

**Nút (chưa chọn ảnh):** Chọn ảnh
**Nút (đã chọn ảnh):** Đổi ảnh
(Mỗi lần chọn, bộ chọn tệp của trình duyệt sẽ thay thế các ảnh đã chọn trước đó, nên “Đổi” là đúng; “Thêm ảnh” sẽ không đúng.)
**Trạng thái, chưa chọn ảnh nào:** Chưa chọn ảnh nào
**Trạng thái, đã chọn (số nhiều: tiếng Việt chỉ có dạng other):**
- other: Đã chọn {count} ảnh
(Khi {count} là 0, trang hiển thị dòng “Chưa chọn ảnh nào” ở trên.)
**Nhãn cho trình đọc màn hình của nút:** Chọn ảnh cho tin đăng của bạn
**Nhãn cho trình đọc màn hình của nút (khi đã chọn ảnh):** Đổi ảnh cho tin đăng của bạn

**Thông báo lỗi (code hiện dùng cả hai; mỗi lần chỉ hiển thị một):**
- Quá nhiều ảnh: Bạn có thể thêm tối đa 8 ảnh. Vui lòng chọn ít ảnh hơn.
- Không phải tệp ảnh: Vui lòng chỉ chọn tệp ảnh.

## 24. Giao diện / chế độ tối

Hiển thị trong trang cài đặt / trang Tôi, và dưới dạng một nút trên thanh đầu trang khi xem trên máy tính. Nhãn ngắn; chỉ chọn được một trong ba lựa chọn (nhóm nút chọn, radio group).

**Tiêu đề mục:** Giao diện
**Câu giải thích ngắn dưới tiêu đề:** Chọn cách trang hiển thị trên thiết bị này.
(Lựa chọn chỉ được lưu trên thiết bị này, giống như cài đặt rung, nên câu này nói “trên thiết bị này”.)

**Các lựa chọn (nhãn hiển thị và mô tả một dòng):**
- Tự động: “Tự động: làm theo cài đặt trên thiết bị của bạn.”
- Sáng: “Sáng: luôn dùng giao diện sáng.”
- Tối: “Tối: luôn dùng giao diện tối.”
(Tên dành cho công nghệ hỗ trợ (accessible name) của mỗi nút chọn chính là nhãn hiển thị của nó: chính xác là “Tự động”, “Sáng”, “Tối”. Phần mô tả được gắn bằng aria-describedby. Các nhãn riêng cho trình đọc màn hình dạng “Dùng ...” đã được bỏ: “Dùng giao diện theo thiết bị của bạn” không chứa chữ hiển thị “Tự động”, nên không đạt tiêu chí WCAG 2.5.3 (nhãn nằm trong tên) khi người dùng điều khiển bằng giọng nói. Lựa chọn đang được chọn do chính nhóm nút chọn thông báo. Mỗi mô tả bắt đầu bằng đúng nhãn của lựa chọn, theo sau là dấu hai chấm, vì trong tiếng Việt “Sáng luôn dùng…” không tự nhiên.)

**Nhãn nhóm cho trình đọc màn hình (nhóm nút chọn):** Giao diện

**Nút trên thanh đầu trang (máy tính):**
- Hiển thị: chỉ có biểu tượng (mặt trời / mặt trăng / màn hình máy tính từ Lucide, chỉ để trang trí, aria-hidden)
- Nhãn cho trình đọc màn hình (nút): Đổi giao diện
- Trạng thái hiện tại, được đọc cùng nút hoặc hiển thị làm chú thích khi rê chuột (tooltip) (một chuỗi, {theme} = Tự động / Sáng / Tối): Giao diện: {theme}
  - Ví dụ: Giao diện: Tự động, Giao diện: Sáng, Giao diện: Tối
(Giữ “Đổi giao diện” làm tên của nút và “Giao diện: Tối” làm chú thích / mô tả, để cả hành động lẫn trạng thái hiện tại đều có. {theme} được thay bằng đúng ba nhãn lựa chọn ở trên.)

---

## Thuật ngữ chờ xác nhận (ghi chú của người dịch, không phải nội dung trang)

Các từ dưới đây là cách dùng tạm thời trong bản dịch này và cần người dùng xác nhận. Sau khi xác nhận, hãy thay thống nhất trong toàn bộ file.

| Tiếng Anh | Tạm chọn | Phương án khác | Lý do |
|---|---|---|---|
| damage price | giá đền bù | mức đền bù, giá bồi thường, mức bồi thường hư hỏng, phí hư hỏng | “Giá” cho thấy đây là con số đặt trước; “đền bù” bao cả hư hỏng lẫn mất, thân thiện hơn “bồi thường” (nghe pháp lý hơn). Không dùng “tiền cọc” hay “tiền đặt cọc” vì trang không giữ tiền. Hiểu được ở cả hai miền. |
| lender | người cho mượn | chủ đồ, người cho, bên cho mượn | Rõ ràng và không mang màu ngân hàng. Không dùng “người cho vay” / “chủ nợ” vì “vay” gắn với tiền. |
| borrower | người mượn | bên mượn, người đi mượn | Ngắn, tự nhiên, cặp đôi với “người cho mượn”. Không dùng “người vay” / “con nợ”. |
| lend | cho mượn | cho mượn đồ | “Mượn” dùng cho đồ vật, “vay” dùng cho tiền; vì vậy chọn “cho mượn”. |
| borrow | mượn | mượn đồ, đi mượn | Động từ chuẩn ở cả hai miền. |
| queue (danh từ) | hàng chờ | danh sách chờ, hàng đợi | “Hàng chờ” ngắn, vừa thanh điều hướng. “Danh sách chờ” rõ hơn nhưng dài hơn. “Hàng đợi” nghe như thuật ngữ tin học. |
| queue (động từ) / Queue it / Join the queue | xếp hàng | vào hàng chờ, đăng ký chờ | “Xếp hàng” quen thuộc ở cả hai miền. |
| pre-alpha | pre-alpha (không dịch) | bản thử nghiệm sớm, phiên bản sơ khai, bản tiền alpha | Huy hiệu giữ tiếng Anh; trong câu văn giải thích là “phiên bản thử nghiệm sớm”. |
| gear | đồ dùng / đồ (một món: món đồ) | đồ nghề, thiết bị, trang bị, vật dụng | “Đồ dùng” trung tính, ai cũng hiểu. “Trang bị” có chất game (như trang bị nhân vật) nhưng lạ khi nói về máy ảnh hay lều. “Đồ nghề” thiên về dụng cụ làm nghề, hơi miền Bắc. “Thiết bị” quá trang trọng. |
| listing | tin đăng | bài đăng, món đồ đã đăng | “Tin đăng” quen thuộc từ các trang rao vặt; có chút màu mua bán, nếu không muốn có thể đổi sang “bài đăng”. |
| list (động từ) / List your gear | đăng / Đăng đồ của bạn | đưa lên, cho mượn đồ | Ngắn, khớp với “tin đăng”, nút “Đăng tin” và nhãn “Đăng” trên thanh dưới cùng. |
| catalogue | kho đồ | danh mục, kho đồ dùng, thư viện đồ | “Kho đồ” có chất game (giống túi đồ / kho đồ trong game) và ngắn. “Danh mục” trùng với nghĩa category nên tránh. |
| handoff | giao nhận | trao đồ, bàn giao, gặp trao đồ | “Giao nhận” bao cả lúc đưa và lúc nhận. “Bàn giao” trang trọng hơn. |
| Returned OK | Trả lại nguyên vẹn | Đã trả, còn tốt; Trả đồ ổn | Rõ nghĩa, không mơ hồ. Dài hơn tiếng Anh. |
| Damaged or lost | Hư hỏng hoặc mất | Hư hoặc mất, Hỏng hoặc thất lạc, Bị hư hỏng hoặc bị mất | “Hư” là từ miền Nam, “hỏng” là từ miền Bắc; ghép “hư hỏng” thì cả hai miền đều dùng được. “Mất” phổ thông; “thất lạc” trang trọng hơn. |
| the arcade (Join the arcade, Thanks for being part of the arcade) | hội arcade | khu arcade, cộng đồng project-arcade, tiệm game, project-arcade | “Gia nhập hội” gợi “gia nhập bang hội” trong game, vẫn giữ chữ arcade. “Arcade” là từ mượn mà người chơi game biết (máy game thùng); người không chơi game có thể chưa quen, nên phương án dự phòng là “cộng đồng project-arcade”. “Tiệm game” mang sắc thái miền Nam và dễ hiểu nhầm là quán thật. |
| Report | Báo cáo | Báo vi phạm, Tố cáo | “Báo cáo” là từ các ứng dụng phổ biến ở Việt Nam hay dùng cho việc báo nội dung hoặc tài khoản vi phạm, nên vẫn hợp khi nút Báo cáo nay chỉ dùng cho lạm dụng, nội dung không an toàn hoặc giả mạo. “Báo vi phạm” rõ hơn nhưng dài hơn. “Tố cáo” quá nặng. Không còn dùng “Phản hồi” làm phương án vì dễ lẫn với Gửi góp ý. |
| Send feedback / feedback | Gửi góp ý / góp ý | Gửi phản hồi, Phản hồi, Ý kiến đóng góp, Báo lỗi | “Góp ý” bao cả báo lỗi lẫn ý tưởng, nhẹ nhàng và khác hẳn “Báo cáo”, nên người dùng không lẫn hai nút. “Phản hồi” cũng phổ biến nhưng còn có nghĩa là trả lời (dễ lẫn với “phản hồi trong 48 giờ” ở mục 10). “Báo lỗi” chỉ bao được loại Lỗi. Dùng thống nhất ở mục 1, 8, 9, 15 và 19. Ba loại góp ý: Lỗi / Ý tưởng / Khác. |
| Me (thanh dưới cùng) | Tôi | Cá nhân, Tài khoản, Của tôi | “Tôi” là nhãn quen thuộc ở các ứng dụng mua sắm tại Việt Nam và ngắn nhất. Lưu ý: ô đánh dấu ở 6b, 11, 12 cũng dùng “Tôi” ở ngôi thứ nhất, không gây nhầm lẫn. |
| Repeat (trong khẩu hiệu) | Chơi lại. | Chơi tiếp., Thêm ván nữa., Lặp lại. | “Chơi lại” có chất game (như nút chơi lại ở máy arcade) và ngắn. “Lặp lại” đúng nghĩa đen nhưng khô. |
| cách xưng hô (you) | giao diện: bạn (thân mật); mục 8 và 15 (trang pháp lý): Quý vị (trang trọng); trang luôn tự xưng: chúng tôi | quý khách, người dùng (ngôi thứ ba), cậu, mình; tự xưng: tụi mình (miền Nam) / bọn mình (miền Bắc) | Giao diện dùng “bạn”: thân thiện, trung tính, phổ biến trong ứng dụng ở cả hai miền. Theo quyết định của chủ trang, hai trang pháp lý (mục 8 /terms và mục 15 chính sách quyền riêng tư) dùng “Quý vị”, viết hoa chữ Q, dùng thống nhất cả khi làm chủ ngữ lẫn sở hữu (“của Quý vị”); câu mệnh lệnh dùng “vui lòng” thay cho “hãy” / “đừng”. “Quý vị” là cách xưng hô trang trọng, lịch sự quen thuộc trong điều khoản và thông báo chính thức ở Việt Nam, áp dụng được cho một hay nhiều người và không gắn với vùng miền. “Quý khách” mang màu dịch vụ trả tiền, không hợp với trang phi lợi nhuận. “Người dùng” ở ngôi thứ ba được giữ khi bản gốc nói về người dùng nói chung, nhưng không dùng để thay “you” vì làm câu mệnh lệnh và câu sở hữu thiếu tự nhiên. “Tụi mình” / “bọn mình” thân hơn nhưng mang màu vùng miền. Ô đánh dấu dùng “Tôi”; “you two” trong giao diện dịch là “hai bạn”. |
| Browse | Khám phá | Xem, Duyệt, Tìm | Dùng thống nhất cho bước 1, nút “Khám phá kho đồ”, “Bắt đầu khám phá” và thanh dưới cùng. |
| click / tap | nhấn / chạm | bấm (miền Nam hay dùng), ấn (miền Bắc hay dùng) | “Nhấn” và “chạm” trung tính, hai miền đều dùng trong ứng dụng. |
| thank you | cảm ơn | cám ơn | “Cảm ơn” là chính tả chuẩn; “cám ơn” phổ biến ở miền Nam, cả hai đều đúng. |
| analytics / Web Analytics | phân tích truy cập (dịch vụ phân tích truy cập, dữ liệu phân tích); tên sản phẩm Vercel Web Analytics giữ nguyên | phân tích web, thống kê truy cập, phân tích lưu lượng | “Phân tích truy cập” cho người đọc thấy rõ thứ được phân tích là các lượt truy cập trang, không phải dữ liệu tài khoản. “Phân tích web” cũng phổ biến nhưng mơ hồ hơn với người không rành công nghệ. Khi đã rõ ngữ cảnh thì rút gọn thành “dữ liệu phân tích”. Dùng ở mục 15. |
| cookie / cookies | cookie (không dịch, không thêm “s”) | tệp cookie, tệp lưu trữ tạm, bánh quy | Trang web và văn bản quyền riêng tư ở Việt Nam thường giữ nguyên từ “cookie”; tiếng Việt không chia số nhiều nên dùng “các cookie”. File đã dùng “cookie” ở mục 15 trước đây. “Bánh quy” là dịch nghĩa đen, không dùng. |
| Appearance / theme | Giao diện (cả tiêu đề mục, nhãn nhóm và “Theme: {theme}”) | Chủ đề, Hình thức, Chế độ hiển thị | “Giao diện” là chữ iPhone, máy Mac và YouTube tiếng Việt dùng cho việc chọn sáng / tối. “Chủ đề” cũng có trong một số ứng dụng Google nhưng dễ hiểu nhầm là đề tài. Tiếng Anh tách Appearance và Theme; tiếng Việt dùng một từ cho cả hai là bình thường. |
| System / Light / Dark | Tự động / Sáng / Tối | Hệ thống, Theo hệ thống, Theo thiết bị / Chế độ sáng / Chế độ tối | “Tự động” theo cách gọi của Apple, đọc tự nhiên trong câu mô tả. “Hệ thống” sát nghĩa tiếng Anh (Google dùng “Mặc định hệ thống”) nhưng khi đứng một mình hơi khó hiểu với người không rành công nghệ. |
| dark mode | chế độ tối | giao diện tối, chế độ ban đêm | Cách gọi phổ biến trên điện thoại và ứng dụng ở Việt Nam. |
| hash | giá trị băm (hash) | mã băm, hàm băm, hash (không dịch) | “Băm” là thuật ngữ tin học tiếng Việt chuẩn; “giá trị băm” chỉ đúng kết quả được tạo ra (không phải hàm). Giữ “(hash)” trong ngoặc ở lần đầu cho người quen thuật ngữ tiếng Anh. |

## Câu hỏi cần phối hợp hoặc cần code hỗ trợ (ghi chú của người dịch)

1. **“[message removed]”:** cơ sở dữ liệu (`supabase/05-messages-and-deletion.sql`) ghi nội dung tin nhắn của người dùng đã xóa tài khoản bằng chuỗi tiếng Anh `[message removed]`. Muốn giao diện tiếng Việt hiển thị “[tin nhắn đã bị xóa]”, code cần nhận ra giá trị này và thay khi hiển thị. Mục 15 và 17.7 tạm giữ nguyên chuỗi tiếng Anh để khớp với những gì đang hiển thị; nếu code hỗ trợ thì đổi thống nhất thành “[tin nhắn đã bị xóa]”.
2. **Từ xác nhận DELETE:** giữ tiếng Anh `DELETE` vì code so khớp chính xác chuỗi này. Muốn người dùng gõ “XÓA” thì cần code hỗ trợ, và nên chấp nhận cả “XOA” không dấu. Lưu ý thêm: nhiều người dùng Việt Nam luôn bật bộ gõ tiếng Việt (Telex/VNI, ví dụ Unikey hay bộ gõ của điện thoại). Ở một số chế độ gõ, chuỗi “DELETE” có thể bị biến thành chữ có dấu (ví dụ chữ E thứ hai bị hiểu là dấu mũ cho chữ E trước đó). Cần thử thực tế; nếu xảy ra, có thể thêm một dòng nhắc tắt bộ gõ tiếng Việt, hoặc để code chấp nhận cả biến thể.
3. **Định dạng {left} và {amount}:** tiếng Việt cần thời lượng dạng “5 giờ”, “2 ngày”, “30 phút” (không có số nhiều). Số tiền cần định dạng theo ngôn ngữ: tiếng Việt dùng dấu chấm phân cách hàng nghìn và dấu phẩy cho phần thập phân (ví dụ “150.000 ₫”). Vì thế ở 17.9 con số 2,000 được viết thành 2.000; code đếm ký tự nên định dạng theo locale. Đơn vị tiền tệ (CAD hay VND) do code quyết định.
4. **{listing / user}:** tiếng Việt cần hai câu đầy đủ, không ghép chuỗi: “Báo cáo tin đăng này” / “Báo cáo người dùng này”. Từ chỉ định “này” đứng sau danh từ.
5. **Ngày của điều khoản và chính sách quyền riêng tư:** copy-en.md hiện ghi “Oct 19, 2026” ở mục 8 và 15; bản dịch viết là “Ngày 19 tháng 10 năm 2026”. Một phiên bản cũ có năm 2025, có vẻ là lỗi đánh máy; nếu ngày tiếng Anh thay đổi lần nữa thì bản dịch cần cập nhật theo. Đề nghị chủ trang xác nhận. Cập nhật (2026-10-20): hai ngày trong bản tiếng Anh nay là "Oct 20, 2026" và bản dịch đã được đồng bộ; đây vẫn là ngày tạm, cần đổi thành ngày công bố thật trước khi ra mắt (xem TODO ở mục 8 và 15).
6. **Hiệu lực pháp lý theo ngôn ngữ:** khi các bản điều khoản tiếng Anh và tiếng Việt cùng tồn tại, bản nào được ưu tiên là quyết định của luật sư. Bản dịch không tự thêm điều khoản nào về việc này. Nếu trang có người dùng ở Việt Nam, luật sư có thể cần xem thêm quy định về bảo vệ dữ liệu cá nhân của Việt Nam; đây chỉ là ghi chú cho luật sư, không phải nội dung trang. Cập nhật (2026-10-20): người dùng đã quyết định các trang điều khoản và quyền riêng tư bản dịch sẽ hiển thị thông báo rằng đây là bản dịch không chính thức và bản tiếng Anh sẽ được áp dụng (câu chữ trong docs/i18n-legal-notice.md). Thông báo này có hiệu lực pháp lý như mong muốn ở từng nước hay không vẫn do luật sư quyết định.
7. **Phông chữ và dấu tiếng Việt:** `app/[locale]/layout.tsx` đang tải DM Sans và Space Mono chỉ với `subsets: ["latin"]`. Tiếng Việt cần các ký tự ngoài bộ latin cơ bản (ơ, ư, đ, ạ, ấ, ể, ỗ, ặ, ...). Tôi chưa kiểm chứng được DM Sans trên Google Fonts có bộ “vietnamese” hay không; nếu không có, trình duyệt sẽ lấy ký tự từ phông dự phòng, khiến một chữ bị trộn hai phông (rất dễ thấy ở tiêu đề đậm). Cần kiểm tra và nếu cần thì thêm subset “vietnamese” hoặc chọn phông có hỗ trợ tiếng Việt cho tiếng Việt. Dấu chồng hai tầng (ví dụ “Ấ”, “Ể”, “Ỗ” ở chữ hoa) cần chiều cao dòng đủ lớn: kiểm tra tiêu đề có line-height chặt, chữ in hoa (text-transform: uppercase) và nút/huy hiệu có overflow hidden để dấu không bị cắt.
8. **Độ dài chuỗi:** tiếng Việt thường dài hơn tiếng Anh khoảng 20 đến 40 phần trăm về số ký tự, vì mỗi từ gồm nhiều âm tiết viết rời. Cần kiểm tra trên màn hình điện thoại hẹp: “Trả lại nguyên vẹn”, “Hư hỏng hoặc mất”, “Xóa tài khoản của tôi”, “Gửi liên kết đặt lại”, “Bắt đầu khám phá”, và năm nhãn thanh dưới cùng (mỗi nhãn hai âm tiết, ví dụ “Trang chủ”, “Hàng chờ”). Trình duyệt có thể ngắt dòng giữa hai âm tiết của một từ ghép (ví dụ “Hàng / chờ”); với nhãn ngắn nên dùng `white-space: nowrap`.
9. **Không có giống và số ngữ pháp:** tiếng Việt không chia giống hay số nhiều, nên {n}, {amount}, {Lender}, {Name} không cần quy tắc số nhiều hay giống. Ngôi thứ ba trung tính dùng “họ” hoặc nhắc lại vai trò (“người cho mượn”). Thứ tự từ quanh biến giữ chỗ có thể khác tiếng Anh (ví dụ “{item} với {Name}”), nên code phải dùng chuỗi mẫu đầy đủ, không ghép từng mảnh.
10. **Chuẩn hóa Unicode và chính tả dấu:** văn bản tiếng Việt nên lưu ở dạng NFC. Bản dịch này đặt dấu theo kiểu mới (“xóa”, “hòa”, “thỏa”); kiểu cũ (“xoá”, “hoà”, “thoả”) cũng đúng nhưng cần chọn một kiểu và dùng thống nhất. Nếu code tìm kiếm hoặc so khớp chuỗi tiếng Việt, nên chuẩn hóa NFC trước.
