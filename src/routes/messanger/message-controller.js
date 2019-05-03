let connections = {};
const Messenger = require('../../models/Messenger');
const uuid = require('uuid');

const controller = {
    getAllMesages: async function(id, messengerRepository) {
        const messenger = await this.getMessenger(id, messengerRepository);
        return messenger.messages;
    },
    getMessenger: async function(id, messengerRepository) {
        const messengers = await messengerRepository.findMessengerById(id);
        if(!messengers.length) {
            const messenger = new Messenger(id, [], []);
            await messengerRepository.addMessenger(messenger);
            return messenger;
        }

        return messengers[0];
    },
    addMessageToDatabase: async function(id, messenger, messengerRepository, messageObject) {
        messenger.messages.push(messageObject);

        await messengerRepository.updateMessenger(id, messenger);
    },
    addConnection: function(id, connection) {
        if(!connections[id]) {
            connections[id] = [];
        }

        if(connections[id].indexOf(connection) === -1) {
            connections[id].push(connection);
        }
    },
    removeConnection: function(id, connection) {
        connections[id].splice(connections[id].indexOf(connection), 1);
    },
    addMessage: async function(id, message) {
        this.sendMessage(id, message);
    },
    sendMessage: function(id, messageObject) {
        const message = JSON.stringify(messageObject);
        connections[id].forEach((connection) => {
            connection.send(message);
        });
    }
};

module.exports = controller;