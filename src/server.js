const express = require('express');

const cors = require('cors');

const app = express();
app.use(cors());
const messageRoute = require('./routes/message-router');
const setupConfiguration = require('./setup/setupConfiguration');
const database = require('./database/connector');

const start = (setupConfiguration) => {
    messageRoute(app);

    app.listen(setupConfiguration.port, setupConfiguration.startCallback());
};

start(setupConfiguration);
