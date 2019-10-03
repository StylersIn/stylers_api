if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'prod') {
    process.env.DEBUG = '*';
}

require('dotenv').config();
const _mongoose = require('mongoose'),
    _debug = require('debug')('Stylers'),
    _express = require('express'),
    _passport = require('passport'),
    _multer = require('multer'),
    _cookieParser = require('cookie-parser'),
    _bodyParser = require('body-parser'),
    _app = _express(),
    _upload = _multer({
        dest: 'public/uploads'
    });

//Routes
const routes = require('./src/routes');

const _config = require('./src/config')(process.env.NODE_ENV || 'dev'),
    _routes = require('./src/routes/index'),
    _cors = require('cors')

_app.use(_cors())
_app.use(_express.static('public'));
_app.use(_cookieParser());
const isAuthenticated = _passport.authenticate('jwt', {
    session: false
});

_app.use(_bodyParser.json({
    limit: '50mb'
})),
    _app.use(_bodyParser.urlencoded({
        extended: false
    })),
    _app.use(_express.static('public')),
    _app.use(_passport.initialize()),
    _app.use(_passport.session()),
    _app.use('/api', routes.serviceRoute)

require('./src/services/AuthenticationService')(_passport, _config);
_app.use('/', _routes.authRoute);

_app.get('/', function (req, res) {
    res.send("express application");
});

(function _init() {
    _app.listen(process.env.PORT || _config.app.port, () => _debug(`server started on port: ${process.env.PORT || _config.app.port}`));
    _mongoose.connect(`mongodb://${_config.database.host}:${_config.database.port}/${_config.database.name}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
})();

module.exports = {
    multer: _upload
};
