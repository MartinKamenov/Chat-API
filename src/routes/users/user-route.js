const { Router } = require('express');
const controller = require('./user-controller');

const attach = (app, userRepository) => {
    const router = new Router();

    router
        .get('/users', async (req, res) => {
            const users = await controller.showAllUsers(userRepository);
            res.send(users);
        })
        .post('/login', passport.authenticate('local', { 
                successRedirect: '/login/successfull',
                failureRedirect: '/login/unsuccessfull', 
            })
        )
        .post('/register', passport.authenticate('local', { 
            successRedirect: '/register/successfull',
            failureRedirect: '/register/unsuccessfull', 
        }))
        .get('/login/successfull', (req, res) => {
            res.send('Successfull login');
        })
        .get('/register/successfull', (req, res) => {
            res.send('Successfull register');
        })
        .get('/login/unsuccessfull', (req, res) => {
            res.send('Unsuccessfull login');
        })
        .get('/register/unsuccessfull', (req, res) => {
            res.send('Unsuccessfull register');
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