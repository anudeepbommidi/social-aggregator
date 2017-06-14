var passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    User = require('../../models/userModel');

module.exports = function(){
    
    passport.use(new GoogleStrategy({
    clientID: '15907365034-cd521uk06kmfsjth7reksujd1pmg6bme.apps.googleusercontent.com',
    clientSecret: 'zRmgc4_PB-VAiE1YMm0R4d_H',
    callbackURL: 'http://localhost:8000/auth/google/callback'
    },
    function(req, accessToken, refreshToken, profile, cb) {
        
        var query = {
            'google.id': profile.id
        };
        User.findOne(query, function(error, user) {
            if(user) {
                console.log('found');
                cb(null, user);
            } else {
                  console.log('not found');
                  var user = new User;
                  user.email = profile.emails[0].value;
                  user.image = profile._json.image.url;
                  user.displayName = profile.displayName;

                  user.google = {};
                  user.google.id = profile.id;
                  user.google.token = accessToken;
                 
                  user.save(function(err) {
                      if(err) {
                          throw err;
                      }
                  });

                  cb(null, user);
            }
        });
          
    }
    ));

};
