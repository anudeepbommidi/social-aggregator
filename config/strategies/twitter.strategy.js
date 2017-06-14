var passport = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function() {
    
  passport.use(new TwitterStrategy({
      consumerKey: 'ZuzwJowGKwlqnlFCprhpTC40A',
      consumerSecret: 'Tl0um1GNa5dabKvyFVNiGShUqM91140yrm6eBgjZcTBaQwCrzU',
      callbackURL: 'http://localhost:8000/auth/twitter/callback'
  }, function(token, tokenSecret, profile, cb) {
      
      var query = {
            'twitter.id': profile.id
        };
        User.findOne(query, function(error, user) {
            if(user) {
                console.log('found');
                cb(null, user);
            } else {
                  console.log('not found');
                  var user = new User;
                  //user.email = profile.emails[0].value;
                  user.image = profile._json.profile_image_url;
                  user.displayName = profile.displayName;

                  user.twitter = {};
                  user.twitter.id = profile.id;
                  user.twitter.token = token;
                 
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
