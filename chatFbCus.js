const fs = require('fs');
const login = require('facebook-chat-api');
const { getListDichVu } = require('./interractiveGGSheet');
const { send } = require('./sendEmailToCRM');

const loginPath = { appState: JSON.parse(fs.readFileSync("./appstate.json", "utf-8")) }

let listDichVu;
async function getDichVu() {
    listDichVu = await getListDichVu();
}
getDichVu();

let _userID;
let cusInfo;

login(loginPath, (err, api) => {
    if (err) return console.error(err);

    let isFirstMsg = true;

    api.listenMqtt((err, message) => {
        if (message.body) {
            if (isFirstMsg) {
                isFirstMsg = false;
                const userID = message.threadID;
                _userID = userID;
                api.getUserInfo(userID, async (err, user) => {
                    cusInfo = user[userID];
                    await api.sendMessage(`Xin chào ${user[userID].name}, tôi là BOT đến từ Viettel Contruction. Tôi ở đây để tư vấn cho bạn những dịch vụ chúng tôi có!`, userID);
                    setTimeout(() => {
                        listDichVu.map(dichVu => {
                            api.sendMessage(`${dichVu.MaDV} - ${dichVu.TenDV} - ${dichVu.GiaTien}Đ`, userID);
                        })
                        setTimeout(() => {
                            api.sendMessage("Để chọn dịch vụ vui lòng nhắn theo cú pháp sau:", userID);
                            setTimeout(() => {
                                api.sendMessage("Choose-<MA DICH VU>-<MA DICH VU>", userID);
                            }, 800)
                        }, 1000);
                    }, 1500)
                })
            }
            else {
                if (message.body.toLowerCase().includes('choose-')) {
                    let listChooseDichVu = message.body.toUpperCase().split('-');
                    listChooseDichVu.shift();
                    api.sendMessage("Bạn muốn tư vấn lại thì gửi tin nhắn: /restart", _userID);
                    api.sendMessage(`Bạn đã chọn tư vấn ${listChooseDichVu.join(', ')}`, _userID);
                    api.sendMessage(`Cảm ơn bạn đã chọn tư vấn! Vui lòng chờ một tý để nhân viên bên tôi liên hệ tư vấn.`, _userID);

                    let listDvOpt = listChooseDichVu.map(item => listDichVu.find(dv => dv.MaDV === item));
                    send(listDvOpt, cusInfo);

                }
                else if (message.body.toLowerCase().includes('/restart')) {
                    isFirstMsg = true;
                }
            }
        }
    });
});


