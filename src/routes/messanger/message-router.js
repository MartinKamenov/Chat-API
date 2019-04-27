const enableWs = require('express-ws');
const controller = require('./message-controller');

const attach = (app, messengerRepository) => {
    enableWs(app);
    controller.addRepository(messengerRepository);
    app.ws('/messenger/:id', async (ws, req) => {
        const id = req.params.id;
        controller.addConnection(ws);
        ws.on('message', async (msg) => {
            await controller.addMessage(id, 'Pesho', msg);
        });
    
        ws.on('close', () => {
            controller.removeConnection(ws);
        });
    });
};

module.exports = attach;