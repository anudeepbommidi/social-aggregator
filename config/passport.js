var passport = require('passport');

module.exports = function(app) {
    
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(function(user, cb) {
            cb(null, user);
        });

        passport.deserializeUser(function(user, cb) {
            cb(null, user);
        });
    
    require('./strategies/google.strategy')();
    require('./strategies/twitter.strategy')();
    require('./strategies/facebook.strategy')();
};


