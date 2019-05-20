let connections = {};
const Messenger = require('../../models/Messenger');
const paging = require('../../services/elementPaging');
const pagingConstants = require('../../constants/pagingConstants');

const controller = {
    getMesagesFromPage: async function(id, messengerRepository, userId, lastMessageId) {
        const messenger = await this.getMessenger(id, messengerRepository);
        let messages = messenger.messages;
        messages.forEach((messageObject) => {
            return messageObject.isMine = (messageObject.userId === userId);
        });

        messages.reverse();
        const messageObject = paging.getPagingOptions(messages, lastMessageId, pagingConstants.defaultPageSize);
        
        messenger.messages = messages;
        messages = paging.getCollectionPage(messages, lastMessageId, pagingConstants.defaultPageSize);
        messages.reverse();
        messageObject.messages = messages;
        return messageObject;
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
    addMessage: async function(id, message, userId) {
        this.sendMessage(id, message, userId);
    },
    sendMessage: function(id, messageObject, userId) {
        const copyOfMessage = Object.assign({}, messageObject); 
        copyOfMessage.isMine = (copyOfMessage.userId === userId);
        const message = JSON.stringify(copyOfMessage);
        connections[id].forEach((connection) => {
            connection.send(message);
        });
    }
};

module.exports = controller;