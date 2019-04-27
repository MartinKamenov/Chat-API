const { Router } = require('express');
const controller = require('./user-controller');

const attach = (app, userRepository) => {
    const router = new Router();

    router
        .get('/users', async (req, res) => {
            const users = await controller.showAllUsers(userRepository);
            res.send(users);
        })
        .post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
            function(req, res) {
                res.send('logged');
            }
        )
        .post('/register', passport.authenticate('local', {
            failureRedirect: '/auth/register'
        }), function(req, res) {
            res.send('registered');
        })
        .post('/register', async(req, res) => {
            const body = req.body;
            const requestObject = {
                email: body.email,
                username: body.username,
                password: body.password
            };
            const response = await controller.createUser(requestObject, userRepository);
            return response;
        });

    app.use('/', router);
};

module.exports = attach;