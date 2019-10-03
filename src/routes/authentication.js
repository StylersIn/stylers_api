var _router = require('express').Router(),
    _passport = require('passport'),
    _jwt = require('jsonwebtoken'),
    _config = require('../config')(process.env.MODE || 'dev'),
    _user = require('../schemas/UserSchema').model;

_router.post('/register', function (req, res, next) {
    _user.create(req.body, (error, result) => {
        if (error) return res.status(500).json({
            message: 'An error occurred when trying to save the user.',
            user: req.body,
            error
        });
        _passport.authenticate('local', {
            session: false
        }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, {
                session: false
            }, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = _jwt.sign({
                    id: user._id,
                    username: user.username,
                    rank: user.rank
                }, _config.auth.secret, { expiresIn: '1h' });
                return res.json({
                    user: user,
                    token
                });
            });
        })(req, res);
    });
});

_router.post('/login', function (req, res, next) {
    console.log(req.body);
    console.log("----------------------------------AUTH ROUTE-----------------------------------------------------");
    _passport.authenticate('local', {
        session: false
    }, (err, user, info) => {
        console.log(req.body);
        console.log("inside the somewhere");
        if (err || !user) {
            return res.status(400).json({
                message: 'Invalid login credentials',
                user: user,
                error: err
            });
        }
        req.login(user, {
            session: false
        }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = _jwt.sign({
                id: user._id,
                username: user.username,
                rank: user.rank
            }, _config.auth.secret, { expiresIn: '1h' });
            return res.json({
                user: user,
                token
            });
        });
    })(req, res);
});

_router.post('/verify', (req, res) => {
    _jwt.verify(req.body.token, _config.auth.secret, function (err, decoded) {
        if (!decoded) {
            return res.status(404).json({ message: "Session has expired" })
        }
        var _user = require('../schemas/User').model;
        _user.findById(decoded.id, (err, user) => {
            if (!user) return res.status(404).json({ message: "User not found" })
            return res.send(user);
        })
    });
});

module.exports = _router;