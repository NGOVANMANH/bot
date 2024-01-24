const nodemailer = require("nodemailer");
require("dotenv").config();
const { createInvoice } = require('./createInvoice');
const { getInvoiceFromSheet } = require('./interractiveGGSheet');

const send = async () => {

    const invoice = await getInvoiceFromSheet('DH002');

    createInvoice(invoice, "invoice.pdf");

    const emails = [invoice.shipping.email];

    const currentDate = new Date();
    const paymentDate = new Date(currentDate);
    paymentDate.setDate(currentDate.getDate() + 7);

    const formattedCurrentDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedPaymentDate = paymentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const bodyHtml = `
    <html>
    <head>
        <style>
            body {
                font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                text-align: center;
                color: #777;
            }
    
            body h1 {
                font-weight: 300;
                margin-bottom: 0px;
                padding-bottom: 0px;
                color: #000;
            }
    
            body h3 {
                font-weight: 300;
                margin-top: 10px;
                margin-bottom: 20px;
                font-style: italic;
                color: #555;
            }
    
            body a {
                color: #06f;
            }
    
            .invoice-box {
                max-width: 800px;
                margin: auto;
                padding: 30px;
                border: 1px solid #eee;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                font-size: 16px;
                line-height: 24px;
                font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                color: #555;
            }
    
            .invoice-box table {
                width: 100%;
                line-height: inherit;
                text-align: left;
                border-collapse: collapse;
            }
    
            .invoice-box table td {
                padding: 5px;
                vertical-align: top;
            }
    
            .invoice-box table tr td:nth-child(2) {
                text-align: right;
            }
    
            .invoice-box table tr.top table td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.top table td.title {
                font-size: 45px;
                line-height: 45px;
                color: #333;
            }
    
            .invoice-box table tr.information table td {
                padding-bottom: 40px;
            }
    
            .invoice-box table tr.heading td {
                background: #eee;
                border-bottom: 1px solid #ddd;
                font-weight: bold;
            }
    
            .invoice-box table tr.details td {
                padding-bottom: 20px;
            }
    
            .invoice-box table tr.item td {
                border-bottom: 1px solid #eee;
            }
    
            .invoice-box table tr.item.last td {
                border-bottom: none;
            }
    
            .invoice-box table tr.total td:nth-child(2) {
                border-top: 2px solid #eee;
                font-weight: bold;
            }
    
            @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
    
                .invoice-box table tr.information table td {
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <table>
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <img src="https://viettelconstruction.com.vn/wp-content/uploads.bak/2023/09/rsz_2023_logo-header-viettel-construction-e1695115999817.png" alt="Company logo" style="width: 100%; max-width: 300px" />
                                </td>
    
                                <td>
                                    Hóa đơn #: 123<br />
                                    Ngạy tạo: ${formattedCurrentDate}<br />
                                    Ngày đến hạn: ${formattedPaymentDate}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
    
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td>
                                    Viettel Contruction<br />
                                    Số 6 Phạm Văn Bạch, Phường Yên Hòa<br />
                                    Quận Cầu Giấy, Hà Nội
                                </td>
    
                                <td>
                                    ${invoice.shipping.name}<br />
                                    ${invoice.shipping.address}<br />
                                    ${emails.join(", ")}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
    
                <tr class="heading">
                    <td>Phương thức thanh toán</td>
                    <td>Tiền</td>
                </tr>
    
                <tr class="details">
                    <td>Card</td>
                    <td>${invoice.subtotal.toLocaleString('vi-VN')} Đ</td>
                </tr>
    
                <tr class="heading">
                    <td>Dịch vụ</td>
                    <td>Giá</td>
                </tr>
    
                ${invoice.items.map(item => `
                <tr class="item">
                    <td>${item.description}</td>
                    <td>${item.amount.toLocaleString('vi-VN')} Đ</td>
                </tr>
                `).join("")}
    
                <tr class="total">
                    <td style="text-align: right"><b>Tổng tiền</b>:</td>
                    <td>${invoice.subtotal.toLocaleString('vi-VN')} Đ</td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>
`;


    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.USER,
            pass: process.env.APP_PASS
        }
    });

    transport.sendMail({
        from: "Viettel Contruction",
        to: emails,
        subject: "Cảm ơn quý khách đã tin tưởng chúng tôi",
        html: bodyHtml,
        attachments: [
            {
                filename: "invoice.pdf",
                path: './invoice.pdf'
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