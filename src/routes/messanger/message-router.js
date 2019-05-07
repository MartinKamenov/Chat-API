const enableWs = require('express-ws');
const controller = require('./message-controller');
const { Router } = require('express');
const Message = require('../../models/Message');
const uuid = require('uuid');
const constants = require('../../constants/constants');

const attach = (app, messengerRepository) => {
    const router = new Router();
    enableWs(app);
    app.ws('/messenger/:id', async (ws, req) => {
        if(!req.user) {
            return;
        }
        const id = req.params.id;
        controller.addConnection(id, ws);
        const messenger = await controller.getMessenger(id, messengerRepository);
        ws.on('message', async (msg) => {
            const message = new Message(
                uuid.v1(), 
                req.user.id, 
                msg, 
                req.user.username, 
                req.user.imageUrl,
                new Date());
            const userId = req.user.id;
            await controller.addMessage(id, message, userId);
            controller
                .addMessageToDatabase(id, messenger, messengerRepository, message);
        });
    
        ws.on('close', () => {
            controller.removeConnection(id, ws);
        });
    });

    router.get('/messenger/:id', async (req, res) => {
        if(!req.user) {
            res
                .status(constants.UNAUTHORIZED_STATUS_CODE)
                .send(constants.UNAUTHORIZED_USER_MESSAGE);
            return;
        }
        const id = req.params.id;
        const messages = await controller.getAllMesages(id, messengerRepository, req.user.id);
        res.status(constants.SUCCESS_STATUS_CODE).send(messages);
    });

    app.use('/', router);
};

module.exports = attach;