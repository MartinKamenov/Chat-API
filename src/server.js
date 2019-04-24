const express = require('express');

const cors = require('cors');

const app = express();
app.use(cors());
const messageRoute = require('./routes/message-router');

const start = () => {
    messageRoute(app);

    app.listen(5000, () => console.log('Magic is running on 5000'));
};

start();
