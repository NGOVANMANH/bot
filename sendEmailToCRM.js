const nodemailer = require("nodemailer");
require("dotenv").config();

const send = async (listCusOpt, cusInfo) => {

    const emails = [
        "21522328@gm.uit.edu.vn",
        "vanmanh0888@gmail.com",
        "21522200@gm.uit.edu.vn"
    ]

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
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thông Báo: Yêu Cầu Tư Vấn Trực Tiếp từ Khách Hàng</title>
    </head>
    <body>
        <div>
            <h2>Thông Báo: Yêu Cầu Tư Vấn Trực Tiếp từ Khách Hàng</h2>
            <p>
                Chào Bộ phận chăm sóc khách hàng,
            </p>
            <p>
                Chúng tôi nhận được một yêu cầu tư vấn trực tiếp từ khách hàng của bạn. Dưới đây là chi tiết:
            </p>
            <p>
                <strong>Thông Tin Khách Hàng:</strong>
                <ul>
                    <li><strong>Họ và Tên:</strong> ${cusInfo.name}</li>
                    <li><strong>Địa chỉ facebook:</strong> ${cusInfo.profileUrl}</li>
                </ul>
            </p>
            <p>
                <strong>Dịch Vụ Đã Chọn:</strong>
                <ul>
                    ${listCusOpt.map(item => `<li>${item.TenDV}</li>`).join('')}
                </ul>
            </p>
            <p>
                <strong>Ghi Chú Khách Hàng:</strong> Không có
            </p>
            <p>
                Khách hàng đã thể hiện sự quan tâm đặc biệt đối với các dịch vụ này và muốn nhận tư vấn trực tiếp từ bạn. Hãy liên hệ với họ càng sớm càng tốt để bắt đầu quá trình tư vấn và đảm bảo rằng họ nhận được thông tin chi tiết và hỗ trợ tốt nhất.
            </p>
            <p>
                Nếu bạn cần thêm thông tin hoặc có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ lại với chúng tôi.
            </p>
            <p>
                Trân trọng,
                <br>
                BOT
            </p>
        </div>
    </body>
    </html>
    `;

    transport.sendMail({
        from: "Thanh toán qua một lần quét",
        to: emails,
        subject: "Thanh Toán Hóa Đơn Viettel Contruction",
        html: bodyHtml,
    }, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Send: ", info.response);
            console.log("Send Success: ", info.accepted);
            console.log("Send Fail: ", info.rejected);
        }
    });
};

module.exports = {
    send
};
