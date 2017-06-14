var express = require('express');
var passport = require('passport');
var router = express.Router();



router.route('/google')
  .get(passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile',
             'https://www.googleapis.com/auth/userinfo.email']
}));



router.route('/google/callback')
  .get(passport.authenticate('google', {
        failureRedirect: '/error/' }), 
        function(req, res) {
    //Successful authentication, redirect home
    res.redirect('/users');
});


router.route('/twitter')
    .get(passport.authenticate('twitter'));

router.route('/twitter/callback')
  .get(passport.authenticate('twitter', {
        failureRedirect: '/error/' }), 
        function(req, res) {
    //Successful authentication, redirect home
    res.redirect('/users');
});


router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope: ['email']
    }));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/users',
        failureRedirect: '/error'
    }), function() {
    console.log('reached');
});



module.exports = router;