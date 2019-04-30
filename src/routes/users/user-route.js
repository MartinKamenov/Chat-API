const { Router } = require('express');
const controller = require('./user-controller');
const passport = require('passport');

const attach = (app, userRepository) => {
    const router = new Router();

    router
        .get('/users', async (req, res) => {
            const users = await controller.showAllUsers(userRepository);
            res.send(users);
        })
        .post('/login', passport.authenticate('local', { 
            successRedirect: '/auth/login/successfull',
            failureRedirect: '/auth/login/unsuccessfull',
            failureFlash: true
        })
        )
        .post('/register', passport.authenticate('local', {
            successRedirect: '/auth/register/successfull',
            failureRedirect: '/auth/register/unsuccessfull',
            failureFlash: true
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
        });

    app.use('/auth', router);
};

module.exports = attach;