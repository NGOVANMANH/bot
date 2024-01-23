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

async function luuThongTinDonHang(maDonHang, tenKhachHang, soDienThoai, email, ngayThucThi, maDichVu) {
    try {
        await docDonHang.loadInfo();
        const sheet = docDonHang.sheetsById[0];
        sheet.addRow({
            MaDH: maDonHang,
            TenKH: tenKhachHang,
            SDT: soDienThoai,
            Email: email,
            NgayThucThi: ngayThucThi,
            MaDV: maDichVu
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

module.exports = {
    getListDichVu,
    getListDonHang,
    getListHoaDon,
    getMoneyByMaDichVu,
    luuThongTinDonHang
}
