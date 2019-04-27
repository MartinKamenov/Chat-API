let connections = {};

const controller = {
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