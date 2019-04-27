const enableWs = require('express-ws');
const controller = require('./message-controller');


const attach = (app, messengerRepository) => {
    enableWs(app);
    app.ws('/messenger/:id', async (ws, req) => {
        const id = req.params.id;
        controller.addConnection(id, ws);
        const messenger = await controller.getMessenger(id, messengerRepository);
        ws.on('message', async (msg) => {
            await controller.addMessage(id, 'Pesho', msg);
            controller
                .addMessageToDatabase(id, messenger, messengerRepository, { username: 'Pesho', message: msg });
        });
    
        ws.on('close', () => {
            controller.removeConnection(id, ws);
        });
    });
};

module.exports = attach;