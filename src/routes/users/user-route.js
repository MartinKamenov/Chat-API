const { Router } = require('express');
const controller = require('./user-controller');
const passport = require('passport');
const constants = require('../../constants/constants');

const attach = (app, userRepository, messengerRepository) => {
    const router = new Router();

    router
        .get('/users', async (req, res) => {
            const user = req.user;
            if(!user) {
                res
                    .status(constants.UNAUTHORIZED_STATUS_CODE)
                    .send(constants.UNAUTHORIZED_USER_MESSAGE);
                return;
            }

            const userId = user.id;
            const users = await controller.showAllUsers(userRepository, messengerRepository, userId);
            res.status(constants.SUCCESS_STATUS_CODE).send(users);
        })
        .post('/login', passport.authenticate('local', { 
            successRedirect: '/auth/login/successfull',
            failureRedirect: '/auth/login/unsuccessfull',
            failureFlash: true
        }))
        .post('/logout', (req, res) => {
            const result = controller.logout();
            res.status(constants.SUCCESS_STATUS_CODE).send(result);
        })
        .post('/register', passport.authenticate('local', {
            successRedirect: '/auth/register/successfull',
            failureRedirect: '/auth/register/unsuccessfull',
            failureFlash: true
        }))
        .get('/login/successfull', (req, res) => {
            res.status(constants.SUCCESS_STATUS_CODE).send('Successfull login');
        })
        .get('/register/successfull', (req, res) => {
            res.status(constants.SUCCESS_STATUS_CODE).send('Successfull register');
        })
        .get('/login/unsuccessfull', (req, res) => {
            res.status(constants.UNSUCCESS_STATUS_CODE).send('Unsuccessfull login');
        })
        .get('/register/unsuccessfull', (req, res) => {
            res.status(constants.UNSUCCESS_STATUS_CODE).send('Unsuccessfull register');
        });

    app.use('/auth', router);
};

module.exports = attach;