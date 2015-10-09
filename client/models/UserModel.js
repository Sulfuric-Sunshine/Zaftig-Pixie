/*
* User Model contains the logic for handling users
*/

var UserModel = Backbone.Model.extend({

  url: '/users/',

  initialize: function () {
    if (window.location.pathname.indexOf("user") !== -1) {
      this.username = window.location.pathname.slice(6);
      this.url = '/users/' + this.username;
      this.set('twitter.username', this.username);
    }
  },

  loginUser: function() {
    console.log("-------");
    console.log("Logging in user");
    console.log("-------");
    window.location.href = '/auth/twitter';
  },

  logOut: function() {
    window.location.href = '/logout';
  }


});
