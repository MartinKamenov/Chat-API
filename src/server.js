const express = require('express');

const cors = require('cors');

const app = express();
app.use(cors());
const setupConfiguration = require('./setup/setupConfiguration');

const database = require('./database/connector');
const UserRepository = require('./models/repositories/UserRepository');
const userRepository = new UserRepository(database, 'users');
const MessengerRepository = require('./models/repositories/MessengerRepository');
const messengerRepository = new MessengerRepository(database, 'messengers');

const authConfig = require('./setup/auth.config');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const sessionSecret = process.env.sessionSecret || 
    require('../../credentials/credentialManager').sessionSecret;

const userRoute = require('./routes/users/user-route');
const messageRoute = require('./routes/messanger/message-router');

const start = (setupConfiguration) => {
    app.use(cookieParser('secret'));
    app.use(session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000000
        },
    }));
    app.use(flash());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json());

    authConfig(app, userRepository);
    userRoute(app, userRepository, messengerRepository);
    messageRoute(app, messengerRepository);

    app.listen(setupConfiguration.port, setupConfiguration.startCallback());
};

start(setupConfiguration);
