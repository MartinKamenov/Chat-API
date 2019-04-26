const User = require('../../models/User');
const SUCCESSFULLY_ADDED_USER = 'User was successfully added';
const uuid = require('uuid');

const controller = {
    createUser: async function(requestObject, userRepository) {
        const username = requestObject.username;
        const password = requestObject.password;
        const email = requestObject.email;

        const newUser = new User(uuid.v1, email, username, password);

        await userRepository.addUser(newUser);
        return SUCCESSFULLY_ADDED_USER;
    },

    showAllUsers: async function(userRepository) {
        const users = await userRepository.getAllUsers();
        return users.map(user => { 
            return {
                id: user.id,
                username: user.username,
                email: user.email
            };
        });
    }
};

module.exports = controller;