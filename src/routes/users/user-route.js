const { Router } = require('express');

const attach = (app, userRepository) => {
    const router = new Router();

    router.get('/login', (req, res) => {
        res.send('login');
    });

    app.use('/', router);
};

module.exports = attach;