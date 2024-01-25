const nodemailer = require("nodemailer");
require("dotenv").config();
const { getInvoiceFromSheet } = require('./interractiveGGSheet');

const send = async () => {

    const invoice = await getInvoiceFromSheet('DH002');

    const emails = [invoice.shipping.email];

    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.USER,
            pass: process.env.APP_PASS
        }
    });

    const bodyHtml = `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }

            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            h1 {
                color: #333;
            }

            p {
                color: #555;
            }

            .footer {
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #ddd;
                color: #777;
                font-size: 12px;
            }
        </style>
    </head>

    <body>
        <div class="container">
            <h1>Cảm ơn bạn đã thanh toán dịch vụ của chúng tôi!</h1>
            <p>Xin chào [Tên Khách Hàng],</p>
            <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi và đã thanh toán thành công. Chúng tôi rất trân trọng sự hỗ trợ của bạn.</p>
            <p>Chi tiết thanh toán:</p>
            <ul>
                <li><strong>Số hóa đơn:</strong> ${invoice.invoice_nr}</li>
                <li><strong>Số tiền thanh toán:</strong> ${invoice.subtotal} VND</li>
                <li><strong>Ngày thanh toán:</strong> ${new Date()}</li>
            </ul>
            <p>Chúng tôi sẽ tiếp tục nỗ lực để mang lại dịch vụ tốt nhất cho bạn. Nếu bạn có bất kỳ câu hỏi nào hoặc cần thêm hỗ trợ, đừng ngần ngại liên hệ với chúng tôi.</p>
            <p>Xin chân thành cảm ơn,</p>
            <p>Viettel Contruction</p>

            <div class="footer">
                <p>Thông tin liên hệ:</p>
                <p>Địa chỉ: Số 06 Phạm Văn Bạch, Phường Yên Hòa, Quận Cầu Giấy, Hà Nội</p>
                <p>Email: congtrinhviettel@viettel.com.vn</p>
                <p>Số điện thoại: 1900.98.98.68</p>
            </div>
        </div>
    </body>

    </html>

    `;

    transport.sendMail({
        from: "Viettel Contruction",
        to: emails,
        subject: "Cảm ơn quý khách đã tin và chọn Viettel Contruction",
        html: bodyHtml
    }, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Send: ", info.response);
            console.log("Send Success: ", info.accepted);
            console.log("Send Fail: ", info.rejected);
        }
    })
}
send();