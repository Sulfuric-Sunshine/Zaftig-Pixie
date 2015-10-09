var AppView = Backbone.View.extend({

  className: 'container',

  initialize: function(params) {
    /*
    * Initialize creates the two main container views
    */
    this.gameContainerView = new GameContainerView({model: this.model.get('speedTyper')});
    this.speedTyperView = new SpeedTyperView({model: this.model.get('speedTyper')});
    var userModel = new UserModel({});
    this.loginView = new LoginView( {model: userModel} );


  },

  render: function(){
    /*
    * render appends the html from speedTyperView and gameContainerView. 
    * Called in index.html.
    */
    var $loginView = $('<div class="login-view"></div>');

    this.model.get('speedTyper').get('socket').emit('login');
    return this.$el.html([
        $loginView.append([
          this.loginView.$el
        ]),
        this.gameContainerView.$el,
        this.speedTyperView.$el
      ]);
  }

});