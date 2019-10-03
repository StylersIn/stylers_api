module.exports = function (passport, config) {
    const LocalStrategy = require('passport-local').Strategy,
        passportJWT = require("passport-jwt"),
        debug = require('debug'),
        user = require('../schemas/UserSchema').model;

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            if (err) throw err;
            done(null, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: "username",
        passwordField: "password", //Username and password have to be supplied else this passport strategy fails
        session: true,
        passReqToCallback: true
    }, function (req, username, password, done) {
        user.findOne({
            username: new RegExp(username, "gi")
        }, function (err, user) {
            // debug(req.body);
            console.log(user);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Invalid credentials.'
                });
            }
            if (req && req.body && req.body.socialToken) {
                let verifyFnMap = {
                    GOOGLE: verifyGoogleToken,
                    FACEBOOK: verifyFacebookToken
                };
                return verifyFnMap[req.body.socialType](req.body.socialToken)
                    .then(tokenInfo => {
                        if (tokenInfo.sub !== user.socialId && tokenInfo.user_id !== user.socialId) {
                            return done(null, false, {
                                message: 'Google token mismatch'
                            });
                        }
                        return done(null, user);
                    });
            }
            if (!user.confirmPassword(password)) {
                return done(null, false, {
                    message: 'Invalid credentials.'
                });
            }
            return done(null, user);
        });
    }
    ));
}