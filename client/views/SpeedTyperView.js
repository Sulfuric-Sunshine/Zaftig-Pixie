/*
 * SpeedTyperView is a container for the interactive player portion of the
 *  game, which exist in statsView, inputView and paragraphView.
 */
var SpeedTyperView = Backbone.View.extend({

  tagName: "div",

  className: "speedTyperContainer",

  events: {
    "click .button": "restart"
  },

  initialize: function ( params ) {
    this.statsView = new StatsView({ model: this.model });
    this.paragraphView = new ParagraphView({ model: this.model });
    this.inputView = new InputView({ model: this.model });
    this.usersView = new UsersView({ model: this.model });
    this.render();

    this.model.on('beginGame', function() {
      this.changeText('beginGame');
    }, this);
    this.model.on('gameWin', function() {
      this.changeText('win');
    }, this);
    this.model.on('gameLose', function() {
      this.changeText('lose');
    }, this);

    this.model.on('tooManyTypos', function() {
      this.changeText('typos');
    }, this);

    this.model.on('toolong', function() {
      this.changeText('toolong');
    }, this);

  },

  render: function() {
    var $typingView = $('<div class="typing-view"></div>');
    var $statsView = $('<div class="stats-view"></div>');
    var $usersView = $('<div class="users-list"></div>');
    return this.$el.html([
      '<h2>Waiting for Opponent...</h2>',
      '<h3 class="practice">In the meantime practice your typing skills!</h3>',
      $typingView.append([
        this.paragraphView.$el,
        this.inputView.$el,
      ]),
      $statsView.append([
        this.statsView.$el
      ]),
      $usersView.append([
        '<h4>Play against other users!</h4>',
        this.usersView.$el
      ])
    ]);
  },

  changeText: function(status) {
    if (status === 'beginGame') {
      $('h2')
        .text('Start Typing!');
      $('h3.practice')
        .remove();
    } else if (status === 'win') {
      $('h2')
        .text('You win!');
      $('h2')
        .append('<p><a href="#" class="button">New Game</a></p>');
    } else if (status === 'lose') {
      $('h2')
        .text('You lose!');
      $('h2')
        .append('<p><a href="#" class="button">New Game</a></p>');
    } else if (status === 'typos') {
      $('h2')
        .text('Too many typos - you lost!');
      $('h2')
        .append('<p><a href="#" class="button">New Game</a></p>');
    }
    else if (status === 'toolong') {
      $('h2')
        .text("You and your opponent are evenly matched- it's a draw!");
      $('h2')
        .append('<p><a href="#" class="button">New Game</a></p>');
    }

  },

  restart: function() {
    this.model.get('socket')
      .emit('login');
    this.initialize();
  }

});