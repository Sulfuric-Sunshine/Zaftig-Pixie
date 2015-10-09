var User = require('../server/mongoModels/user.js');
var path = require('path');


module.exports = function(app, passport) {

  //twitter routes:
  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback', 
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/user/' + req.user.twitter.username);
  });

  app.get('/user/:username', function(req, res) {
    console.log('------------------------------------------------------------------------');
    console.log("req.session.passport from getting username is", req.session.passport.user);
    console.log('------------------------------------------------------------------------');
    // If the user has been logged out, they shouldn't be able to access this endpoint. 
    // We will redirect them to the home page. 
    if (!!req.session.passport.user === false) {
      res.redirect('/');
    } else {
      res.sendFile(path.join(__dirname + '/../client/index.html'));
    }
  });

  app.get('/users/:username', function(req, res) {
    var username = req.params.username;
    console.log("in /users/username, req.session.passport.user is", req.session.passport.user);
    if (!!req.session.passport.user === false) {
      res.redirect('/');
    } else {
      User.findOne({ 'twitter.username': username }, function(err, user) {
        res.send(user);
      });
    }
  });

  app.get('/users', function(req, res) {
    // this gets back all the users except the logged in user. 
    User.find({'isLoggedIn': 'true', '_id' : { $ne: req.session.passport.user }}, function(err, users) {
      res.send(users);
    });
  });

  app.get('/logout', function(req, res){
    console.log("Logging out", req.session.passport.user);
    User.findOneAndUpdate({_id: req.session.passport.user}, { isLoggedIn: 'false'},  function(err, user) {
      req.logout();
      res.redirect('/');
    })
  });

  function isLoggedIn(req, res, next) {
    console.log('-------------------------');
    console.log("Checking if user is logged in...");
    console.log('-------------------------');

    if (req.isAuthenticated()) {
      next();
    }
    console.log("user is not logged in redirecting to home route");
    res.redirect('/');
  }
};