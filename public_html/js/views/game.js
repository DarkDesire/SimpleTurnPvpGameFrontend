define([
  'backbone',
  'tmpl/game',
  'models/socket',
  'models/user'
], function (Backbone, tmpl, Socket, UserModel) {

  return Backbone.View.extend({
    template: tmpl,
    model: UserModel,
    socket: new Socket(),
    enemyName: "",
    state: "IDLE",
    matchFoundSound: new Audio("../sounds/game_ready.mp3"),
    events: {
      "click #btn_findMatch": "findMatch",
      "click #btn_acceptMatch" : "acceptMatch",
      "click #btn_declineMatch" : "declineMatch",
      "click #btn_rock" : "playerChooseRock",
      "click #btn_paper" : "playerChoosePaper",
      "click #btn_scissors" : "playerChooseScissors"
    },
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.$el.addClass("gameView__gameView");
      this.$el.appendTo('.gameView');
      this.$el.hide();
    },
    render: function () {
      this.$el.html(this.template(this.model.toJSON()[0]));
    },
    show: function () {
      this.render();
      this.initState();
      this.trigger('show', this);
      this.socket.connect();
      this.socket.addGame(this);
      this.$el.show();
    },
    hide: function () {
      this.$el.hide();
    },
    findMatch: function(){
      this.state = "FINDING_MATCH";
      $("#btn_findMatch").html("FINDING MATCH");
      this.socket.sendMessage(this.state);
    },
    initState: function () {
      this.state = "IDLE";
      $("#head").show();
      $("#btn_findMatch").prop( "disabled", false).html("FIND MATCH");
      $("#roundLabel").hide();
      $("#secondsLabel").hide();
      $("#matchmakingView").hide();
      $("#gameView").hide();
      $("#result").hide();
    },
    matchfoundState: function () {
      this.state = "MATCH_FOUND";
      $("#matchmakingView").show();
      $("#btn_findMatch").prop( "disabled", true).html("MATCH FOUND");
      this.matchFoundSound.play()
    },
    startGame: function(data){
      $("#enemyName").html(data.enemyName).show();
    },
    gameState: function () {
      $("#btn_findMatch").html("---GAME---");
      $("#matchmakingView").hide();
      $("#roundLabel").show();
      $("#secondsLabel").show();
      $("#gameView").show();
      $("#playerChoice").html("ROCK");
    },
    newRound: function (value) {
      $("#enemyChoice").html("-----");
      $("#result").hide();
      var int = parseInt(value) + 1;
      $("#round").html(int);
    },
    roundTick: function (value) {
      var int = parseInt(value) + 1;
      $("#seconds").html(int);
    },
    roundOver: function (data) {
      $("#enemyChoice").html(data.enemyChoice);
      $("#resultType").html("Round is ");
      $("#win").html(data.result);
      $("#result").show();
    },
    gameOver: function (data) {
      $("#resultType").html("Game is ");
      $("#win").html("LOSE\\DRAW\\WIN " + data.result);
      $("#result").show();
    },
    acceptMatch: function(){
      this.socket.sendMessage("ACCEPT_MATCH");
    },
    declineMatch: function(){
      this.state = "IDLE";
      this.socket.sendMessage(this.state);
    },
    playerChooseRock: function(){
      var choose = "ROCK";
      this.socket.sendMessage(choose);
      $("#playerChoice").html(choose);
    },
    playerChoosePaper: function(){
      var choose = "PAPER";
      this.socket.sendMessage(choose);
      $("#playerChoice").html(choose);
    },
    playerChooseScissors: function(){
      var choose = "SCISSORS";
      this.socket.sendMessage(choose);
      $("#playerChoice").html(choose);
    }
  });
});