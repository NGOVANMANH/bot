const nodemailer = require("nodemailer");
require("dotenv").config();

const send = async () => {

    const emails = ["21522328@gm.uit.edu.vn"];

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
            <h1>Cảm ơn bạn đã chia sẻ ý kiến của mình!</h1>
            <p>Xin chào Ngô Văn Mạnh,</p>
            <p>Chúng tôi đã nhận được thông báo từ bạn về quyết định từ chối thanh toán. Chúng tôi rất tiếc nếu có bất kỳ vấn đề nào đã gây khó khăn cho bạn.</p>
            <p>Chúng tôi muốn đảm bảo rằng chúng tôi lắng nghe và đánh giá cao mọi ý kiến phản hồi từ khách hàng. Nếu có bất kỳ thông tin chi tiết hoặc điều gì chúng tôi có thể làm để cải thiện dịch vụ, vui lòng cho chúng tôi biết.</p>
            <p>Chúng tôi sẽ tiếp tục cung cấp sự hỗ trợ và theo dõi vấn đề của bạn. Nếu có thêm câu hỏi hoặc ý kiến, đừng ngần ngại liên hệ với chúng tôi.</p>
            <p>Xin cảm ơn sự phản hồi của bạn và mong sớm có cơ hội phục vụ bạn một lần nữa.</p>
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
        subject: "Cảm ơn quý khách",
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