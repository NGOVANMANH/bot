const { getListDichVu } = require('./interractiveGGSheet');


async function getData() {
    const listDichVu = await getListDichVu();
    console.log(listDichVu);
}

getData();