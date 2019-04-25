const enableWs = require('express-ws');
const data = [];

const attach = (app) => {
    enableWs(app);
    const connections = [];
    app.ws('/echo', (ws, req) => {
        connections.push(ws);
        ws.on('message', msg => {
            data.push(msg);

            for(var i = 0; i < connections.length; i++) {
                connections[i].send(data[data.length - 1]);
            }
        });
    
        ws.on('close', () => {
            console.log('WebSocket was closed');
        });
    });
};

module.exports = attach;