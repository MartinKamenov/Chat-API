const enableWs = require('express-ws');
const data = [];

const attach = (app) => {
    enableWs(app);
    const connections = [];
    app.ws('/echo', (ws, req) => {
        connections.push(ws);
        ws.on('message', msg => {
            data.push(msg);

            connections.forEach((connection) => {
                connection.send(data[data.length - 1]);
            });
        });
    
        ws.on('close', () => {
            connections.splice(connections.indexOf(ws), 1);
            console.log('WebSocket was closed');
        });
    });
};

module.exports = attach;