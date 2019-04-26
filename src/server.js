const express = require('express');

const cors = require('cors');

const app = express();
app.use(cors());
const setupConfiguration = require('./setup/setupConfiguration');
const database = require('./database/connector');
const UserRepository = require('./models/repositories/UserRepository');
const userRepository = new UserRepository(database, 'users');
const MessengerRepository = require('./models/repositories/MessengerRepository');
const messengerRepository = new MessengerRepository('messengers');

const userRoute = require('./routes/users');
const messageRoute = require('./routes/messanger');

const start = (setupConfiguration) => {
    userRoute(app, userRepository);
    messageRoute(app, messengerRepository);

    app.listen(setupConfiguration.port, setupConfiguration.startCallback());
};

start(setupConfiguration);
