const enableWs = require('express-ws');

const attach = (app) => {
    enableWs(app);
    app.ws('/echo', (ws, req) => {
        ws.on('connect', () => {
          ws.send('Connected');
        });
        ws.on('message', msg => {
            ws.send(msg);
        });
    
        ws.on('close', () => {
            console.log('WebSocket was closed');
        });
    });
};

module.exports = attach;