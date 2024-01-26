const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const dotenv = require('dotenv');

dotenv.config();

const SHEET_DICHVU = '1JpWskNYuKf0fm2BeFIut20ffZeo3lVy8egoQ-vVG1XY';
const SHEET_DONHANG = '1nIYimkz8IVTPuDPceVX2-kQxN50aZVT57IObHPouFNE';
const SHEET_HOADON = '1o0WrKvEYm0xY3O8r34YNKVfr6n5E_eftCCuL-QYWzas';

const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
    ],
});

const docDichVu = new GoogleSpreadsheet(SHEET_DICHVU, serviceAccountAuth);
const docDonHang = new GoogleSpreadsheet(SHEET_DONHANG, serviceAccountAuth);
const docHoaDon = new GoogleSpreadsheet(SHEET_HOADON, serviceAccountAuth);

async function getListDichVu() {
    try {
        await docDichVu.loadInfo();
        const sheet = docDichVu.sheetsByIndex[0];
        await sheet.loadCells();
        const rows = await sheet.getRows();
        const formattedRows = rows.map(row => {
            const formattedRow = {};
            sheet.headerValues.forEach((header, index) => {
                formattedRow[header] = row._rawData[index];
            });
            return formattedRow;
        });
        return formattedRows;
    } catch (error) {
        console.error("Error:", error.message);
        return [];
    }
}

async function getListHoaDon() {
    try {
        await docHoaDon.loadInfo();
        const sheet = docHoaDon.sheetsByIndex[0];
        await sheet.loadCells();
        const rows = await sheet.getRows();
        const formattedRows = rows.map(row => {
            const formattedRow = {};
            sheet.headerValues.forEach((header, index) => {
                formattedRow[header] = row._rawData[index];
            });
            return formattedRow;
        });
        return formattedRows;
    } catch (error) {
        console.error("Error:", error.message);
        return [];
    }
}

async function getListDonHang() {
    try {
        await docDonHang.loadInfo();
        const sheet = docDonHang.sheetsByIndex[0];
        await sheet.loadCells();
        const rows = await sheet.getRows();
        const formattedRows = rows.map(row => {
            const formattedRow = {};
            sheet.headerValues.forEach((header, index) => {
                formattedRow[header] = row._rawData[index];
            });
            return formattedRow;
        });
        return formattedRows;
    } catch (error) {
        console.error("Error:", error.message);
        return [];
    }
}

async function getMoneyByMaDichVu(maDichVu) {
    try {
        await docDichVu.loadInfo();
        const sheet = docDichVu.sheetsById[0];
        await sheet.loadCells();
        const rows = await sheet.getRows();
        let money = 0;
        rows.map(row => {
            if (row.get("MaDV") === maDichVu) {
                money = row.get("GiaTien");
            }
        })
        money = money.replace(/\./g, '');
        return +money;
    } catch (error) {
        console.error("Error:", error.message);
        return 0;
    }
}

async function luuThongTinDonHang(donHang) {
    try {
        await docDonHang.loadInfo();
        const sheet = docDonHang.sheetsById[0];
        sheet.addRow({
            MaDH: donHang.MaDH,
            TenKH: donHang.TenKH,
            SDT: donHang.SDT,
            Email: donHang.Email,
            NgayThucThi: donHang.NgayThucThi || formatDate(new Date()),
            MaDV: donHang.MaDV
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function getInvoiceFromSheet(maDonHang) {
    try {
        let donHangs = await getListDonHang();
        const listDichVu = await getListDichVu();
        donHangs = donHangs.filter(item => item.MaDH === maDonHang);
        let cusInfo;
        let items;
        let subtotal = 0;
        cusInfo = {
            name: donHangs[0].TenKH || "John Doe",
            email: donHangs[0].Email,
            phone: donHangs[0].SDT,
            address: donHangs[0].DiaChi || "1234 Main Street",
            postal_code: 70000
        }

        items = donHangs.map(donHang => {
            const dichVu = listDichVu.find(item => item.MaDV === donHang.MaDV);
            const total = +dichVu.GiaTien.replace(/\./g, '') || 0;
            subtotal += total;
            return {
                item: dichVu.MaDV || "Ma Dich Vu",
                description: dichVu.TenDV || "Toner Cartridge",
                amount: total
            }
        })

        return {
            shipping: cusInfo,
            items,
            subtotal,
            paid: 0,
            invoice_nr: maDonHang
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

async function saveInvoice(invoice) {
    try {
        await docHoaDon.loadInfo();
        const sheet = docHoaDon.sheetsById[0];
        invoice.items.map(item => {
            sheet.addRow({
                MaDH: invoice.invoice_nr,
                MaDV: item.item,
                TenKH: invoice.shipping.name,
                TenDV: item.description,
                SDT: invoice.shipping.phone,
                Email: invoice.shipping.email,
                NgayThucThi: formatDate(new Date()),
                GiaTien: invoice.subtotal,
                NgayThanhToan: formatDate(new Date())
            });
        })
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}

module.exports = {
    getListDichVu,
    getListDonHang,
    getListHoaDon,
    getMoneyByMaDichVu,
    luuThongTinDonHang,
    getInvoiceFromSheet,
    saveInvoice
}
