const messengers = {};
const Messenger = require('../../models/Messenger');
const uuid = require('uuid');
let globalMessengerRepository;
let connections;

const controller = {
    addRepository: function(messengerRepository) {
        globalMessengerRepository = messengerRepository;
        connections = [];
    },
    addConnection: function(connection) {
        connections.push(connection);
    },
    removeConnection: function(connection) {
        connections.splice(connections.indexOf(connection), 1);
    },
    addMessage: async function(id, username, message) {
        if(!messengers[id]) {
            await this.addMessenger(id);
        }

        messengers[id].push(username, message);
        this.sendMessage({ username, message });
    },
    sendMessage: function(messageObject) {
        const message = messageObject.message;
        connections.forEach((connection) => {
            connection.send(message);
        });
    },
    addMessenger: async function(id) {
        const messenger = new Messenger(uuid.v1, [], []);
        await globalMessengerRepository.addMessenger(messenger);
        messengers[id] = [];
    },
    messengerExists: async function(id) {
        const messengers = await globalMessengerRepository.findMessengerById(id);
        return messengers.length > 0 ? true : false;
    }
};

module.exports = controller;