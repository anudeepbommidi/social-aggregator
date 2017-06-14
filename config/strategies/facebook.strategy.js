var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../../models/userModel');

module.exports = function() {
    
    passport.use(new FacebookStrategy({
        clientID: '220770845081710',
        clientSecret: '9de0ca5e3b49ef76fbb237640b1fe342',
        callbackURL: 'http://localhost:8000/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, function(req, accessToken, refreshToken, profile, cb) {
        
        var query = {
            'facebook.id': profile.id
        };
        User.findOne(query, function(error, user) {
            if(user) {
                console.log('found');
                cb(null, user);
            } else {
                  console.log('not found');
                  var user = new User;
                  user.email = profile.emails[0].value;
                  //user.image = profile._json.image.url;
                  user.displayName = profile.displayName;

                  user.facebook = {};
                  user.facebook.id = profile.id;
                  user.facebook.token = accessToken;
                 
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
