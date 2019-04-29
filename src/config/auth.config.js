const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;

const configAuth = (app, userRepository) => {
    
    passport.use(new LocalStrategy (
        (username, password, done) => {
            return userRepository.findUserByUsername(username).then((users) => {
                if(!users.length) {
                    return done('No user was found');
                }

                return done(null, users[0]);
            }).catch((e) => done(e));
        }
    ));

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session({ secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000000,
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) => {
        return userRepository.findUserByParams({id})
        .then((users) => {
            const user = users[0];
            done(err, user);
        }).catch(done);
      });
};

module.exports = configAuth;