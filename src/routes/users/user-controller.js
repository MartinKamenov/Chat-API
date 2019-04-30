const controller = {
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