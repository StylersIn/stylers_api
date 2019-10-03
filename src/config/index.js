const getConfig = env => {
    const config = {
        dev: {
            app: {
                host: 'localhost',
                port: 9000
            },
            database: {
                name: 'stylers',
                host: 'localhost',
                port: 27017,
                user: '',
                password: ''
            },
            auth: {
                saltRounds: 10,
                secret: "successmonster"
            },
        },
        prod: {
            app: {
                host: 'localhost',
                port: 9000
            },
            database: {
                name: 'heroku_1phf5hr2',
                host: 'ds117846.mlab.com',
                port: 17846,
                user: 'heroku_1phf5hr2',
                password: 'bjrarvvp3r1q6r50k0eupfcrnn'
            },
            auth: {
                saltRounds: 10,
                secret: "successmonster"
            },
        }
    }
    return config[env];
};

module.exports = getConfig;