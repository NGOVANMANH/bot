const { saveInvoice, getInvoiceFromSheet } = require('./interractiveGGSheet');

async function save() {
    const invoice = await getInvoiceFromSheet("DH002");
    saveInvoice(invoice);
}

save();