const controller = {
    showAllUsers: async function(userRepository, userId) {
        const users = await userRepository.getAllUsers();
        return users
        .filter(user => userId !== user.id)
        .map(user => { 
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                imageUrl: user.imageUrl
            };
        });
    }
};

module.exports = controller;