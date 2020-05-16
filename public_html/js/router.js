define([
  'backbone',
  'views/scoreboard',
  'views/main',
  'views/auth',
  'views/game',
  'views/manager'
], function (Backbone, ScoreView, MainView, AuthView, GameView, ManagerView) {

  var scoreView = new ScoreView();
  var mainView = new MainView();
  var authView = new AuthView();
  var gameView = new GameView();

  ManagerView.addViews([scoreView, mainView, authView, gameView]);
  var Router = Backbone.Router.extend({
    routes: {
      'scoreboard': 'scoreboardAction',
      'game': 'gameAction',
      'login': 'loginAction',
      '*default': 'defaultActions'
    },
    defaultActions: function () {
      mainView.show();
    },
    scoreboardAction: function () {
      scoreView.show();
    },
    gameAction: function () {
      gameView.show();
    },
    loginAction: function () {
      authView.show();
    }
  });
  return new Router();
});
