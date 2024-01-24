const { createInvoice } = require('./createInvoice');
const { getListDichVu } = require('./interractiveGGSheet');
const { invoice } = require('./invoiceInfor');


// async function getData() {
//     const listDichVu = await getListDichVu();
//     console.log(listDichVu);
// }

// getData();

createInvoice(invoice, 'invoice.pdf');