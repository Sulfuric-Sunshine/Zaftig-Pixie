/*
* LoginView contains the buttons to login to Facebook and Twitter
*/

var LoginView = Backbone.View.extend({

  tagName: "div",

  className: "login-container",

  initialize: function () {
    console.log("login view's model is", this.model.attributes);
    var context = this;
    var loggedIn = false;
    if (window.location.pathname.indexOf("user") !== -1) {
      this.username = window.location.pathname.slice(6);
      var user = new UserModel({'twitter[username]': this.username});
      console.log("initializing login view", this.username);
      console.log("The user's attributes are is", this.model.attributes);
      user.fetch({
        success: function(model, response, options) {
          console.log("the model in the success callback is,", model.attributes);
          console.log('model.get id', model.get('_id'));
          if (model.get('_id') !== undefined) {
            loggedIn = true;
            var photoUrl = model.get('twitter').photo_url;
            context.render(loggedIn, photoUrl);
          }
        },
        error: function(model, response, options) {
          console.log("There's an error, what gives?");
        }
      })
    } else {
      context.render(loggedIn);
    }
  },

  events: {
    'click a.twitter-button': function() {
      this.loginUser();
    },
    'click a.logout': function() {
      this.logOut();
    }
  },

  loginUser: function() {
    console.log("clicked twitter button!");
    this.model.loginUser();
  },

  logOut: function() {
    this.model.logOut();
  },


  render: function (loggedIn, photoUrl) {
    if (!loggedIn) {
      this.$el.append(
        '<a class="twitter-button">Login with Twitter</a>'
      )
    } else {
      this.$el.append([
        '<img class="twitter-img" src="' + photoUrl + '" />' + this.model.get('twitter.username') + ' | <a class="logout">Logout</a>'
      ]);
    }
    return this;
  }

});