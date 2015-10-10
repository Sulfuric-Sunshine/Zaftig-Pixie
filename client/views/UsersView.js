var UsersView = Backbone.View.extend({

  tagName: "div",

  initialize: function ( params ) {
    this.model.on('change:loggedInUsers', this.render, this);
    this.render();
  },

  render: function () {
    this.$el.children().detach();

    var $finalUsers = [];
    var responseData = this.model.get('loggedInUsers');

    for (var i = 0; i < responseData.length; i++) {
      $finalUsers.push(
        '<div class="user-item"><img src="' + responseData[i].twitter.photo_url + '"/><a href="#">' + responseData[i].twitter.username + '</a></div>'
      );
    }

    return this.$el.append($finalUsers);
  }
});
