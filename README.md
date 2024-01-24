# Bot Phân Tích Quy Trình Nghiệp Vụ Doanh Nghiệp

## Mô tả

Đây là một dự án bot được phát triển để hỗ trợ các chức năng hữu ích trong quy trình nghiệp vụ doanh nghiệp. Bot này kết hợp nhiều tính năng như gửi email, tương tác với Facebook Messenger, tạo file PDF, tạo mã QR Code thanh toán, và tương tác với Google Sheets.

## Thư Viện và Công Nghệ

Dự án này sử dụng các thư viện và công nghệ sau:

- **dotenv:** Để quản lý biến môi trường và cấu hình.
- **facebook-chat-api:** Để tương tác với Facebook Messenger và chatbot.
- **fs:** Để thao tác với hệ thống tệp tin.
- **google-auth-library và google-spreadsheet:** Để tương tác với Google Sheets.
- **nodemailer:** Để gửi email.
- **pdfkit:** Để tạo file PDF.
- **unicode và unidecode:** Để xử lý vấn đề liên quan đến Unicode.

## Cài Đặt

1. Clone dự án từ repository:

   ```bash
   git clone https://github.com/NGOVANMANH/bot

2. Di chuyển vào thư mục dự án:

    ```bash
    cd bot

3. Cài đặt Dependencies:

    ```bash
    npm install

## Cấu Hình

1. Tạo một tiệp `.env` trong thư mục dự án và cung cấp các thông tin môi trường cần thiết:

    USER=<email_google_app>
    APP_PASS=<app_password_google>
    GOOGLE_SERVICE_ACCOUNT_EMAIL=
    GOOGLE_PRIVATE_KEY=

2. Tạo một file `appstate.json` để bỏ appstate của tài khoản facebook bạn dùng vào:

    Lấy appstate thì dùng Extension J2Team Cookie.
    Sau khi lấy file json thì nhớ copy mảng cookie và sửa key = "name" thành "key".

    Ví dụ:
    [
        {
            "domain": ".facebook.com",
            "expirationDate": ,
            "hostOnly": false,
            "httpOnly": true,
            "key": "", (name => key)
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": "0",
            "value": ""
        },
        ...
    ]


3. Chạy các file bot cần cho bạn:

    node <tenfile>.js

## Chú Ý:

Đảm bảo bạn đã cung cấp đầy đủ quyền truy cập và chứng chỉ cho các dịch vụ như Facebook, Google Sheets, và Email.

Kiểm tra mã nguồn và thư viện để hiểu rõ về cách bot hoạt động và cách tùy chỉnh cho nhu cầu cụ thể của bạn.

Đây chỉ là một bản README đơn giản và bạn có thể mở rộng nó để bao gồm các hướng dẫn chi tiết và thông tin khác.

