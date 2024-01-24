const nodemailer = require("nodemailer");
require("dotenv").config();
const { createInvoice } = require('./createInvoice');
const { getInvoiceFromSheet } = require('./interractiveGGSheet');

const send = async () => {

    const invoice = await getInvoiceFromSheet('DH002');

    createInvoice(invoice, "invoice.pdf");

    const emails = [invoice.shipping.email];

    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.USER,
            pass: process.env.APP_PASS
        }
    });

    const paymentContent = "Quý khách vui lòng kiểm tra kĩ thông tin trước khi thanh toán, và chụp lại kết quả sau khi thanh toán";

    const total = invoice.subtotal;
    const qrDataURL = `https://img.vietqr.io/image/VCB-1025884939-print.png?amount=${total}`;

    const bodyHtml = `
    <html>
        <head>
        <title>Thanh toán</title>
        </head>
        <body>
        <h1>Chi tiết thanh toán</h1>
        <p>${paymentContent}</p>
        <img src="${qrDataURL}" alt="QR Code" />
        </body>
    </html>
    `;

    transport.sendMail({
        from: "Thanh toán qua một lần quét",
        to: emails,
        subject: "Thanh Toán Hóa Đơn Viettel Contruction",
        html: bodyHtml,
        attachments: [
            {
                filename: "hoaDon.pdf",
                path: 'invoice.pdf'
            }
        ]
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