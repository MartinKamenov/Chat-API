const Message = require('../../models/Message');
const uuid = require('uuid');
const constants = require('../../constants/constants');

const controller = {
    showAllUsers: async function(userRepository, messengerRepository, userId) {
        const users = await userRepository.getAllUsers();
        const messengers = await messengerRepository.getAllMessengers();
        const chats = users
        .filter(user => userId !== user.id)
        .map(user => { 
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                imageUrl: user.imageUrl,
                chatId: this.getChatId(userId, user.id),
                lastMessage: this.getLastMessage(messengers, this.getChatId(userId, user.id))
            };
        });

        return chats;
    },
    getChatId: function(firstId, secondId) {
        return firstId < secondId ? firstId + secondId : secondId + firstId;
    },

    getLastMessage: function(messengers, chatId) {
        const messenger = messengers.find((messenger) => messenger.id === chatId);
        if(!messenger || !messenger.messages.length) {
            return new Message(uuid.v1(), '', 'No messages', '', '', new Date());
        }
        
        const messages = messenger.messages;
        return messages[messages.length - 1];
    },
    logout: function(req) {
        req.logout();
        return constants.SUCCESSFULL_LOGOUT_MESSAGE;
    },
};

module.exports = controller;