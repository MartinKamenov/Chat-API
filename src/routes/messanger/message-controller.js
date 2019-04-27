let connections = {};
const Messenger = require('../../models/Messenger');
const uuid = require('uuid');

const controller = {
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
        messenger.messages.push(messageObject.message);

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
    addMessage: async function(id, username, message) {
        this.sendMessage(id, {username, message});

    },
    sendMessage: function(id, messageObject) {
        const message = messageObject.message;
        connections[id].forEach((connection) => {
            connection.send(message);
        });
    }
};

module.exports = controller;