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
            return 'No messages';
        }
        
        const messages = messenger.messages;
        return messages[messages.length - 1];
    }
};

module.exports = controller;