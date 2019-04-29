const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const configAuth = (app, userRepository) => {
    passport.use(new LocalStrategy (
        function(username, password, done) {
            return userRepository.findUserByUsername(username).then((users) => {
                if(!users.length) {
                    return 'No user with ' + username + ' was found';
                }
            }).catch((e) => console.log(e));
        }
    ));
};

module.exports = configAuth;