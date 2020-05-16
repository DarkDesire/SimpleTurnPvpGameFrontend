/**
 * Created by Eldar on 03.12.2015.
 */
define([
  'backbone',
  'views/game'
], function (Backbone, Game) {

  var GameUser = Backbone.Model.extend({
    game: "",
    addGame: function (value) {
      game = value;
    },
    initialize: function () {
      this.connection = undefined;
    },
    connect: function () {
      if (this.connection === undefined) {
        this.connection = new WebSocket('ws://' + location.host + '/gameplay');
      }
      this.connection.onopen = this.onConnect;
      this.connection.onmessage = this.onMessage;

      this.connection.onclose = function (event) {
        //
      }

    },
    onConnect: function () {
    },
    onMessage: function (msg) {
      var data = JSON.parse(msg.data);
      if (data.userNewState == "IDLE") {
        game.initState();
      }
      if (data.userNewState == "MATCH_FOUND") {
        game.matchfoundState();
      }
      if (data.userNewState == "PLAYING_MATCH") {
        game.gameState();
      }
      if (data.hasOwnProperty('newRound')) {
        game.newRound(data.newRound);
      }
      if (data.hasOwnProperty('seconds')) {
        game.roundTick(data.seconds)
      }
      if (data.status == "start") {
        game.startGame(data);
      }
      if (data.status == "roundOver") {
        game.roundOver(data);
      }
      if (data.status == "gameOver") {
        game.gameOver(data);
      }
      /*  var data = JSON.parse(msg.data.replace('=', ','));
       console.info(msg.data);
       if (data.typeID == 0) {
       localStorage['youStart'] = data.youStart;
       alert("connect");
       }
       if (data.typeID == 2 && data.opponentReady) alert("Поехали играть!!!, " + localStorage['youStart'])
       if (data.typeID == 4 && data.statusOK) {
       localStorage['from'] = data.piecesMoved[0] - 1;
       localStorage['to'] = data.piecesMoved[1] - 1;
       obj.socket.trigger("move");
       }*/
    },
    sendMessage: function (value) {
      /*  ws.send(message);

       var sendObj = null;

       if (id == 1) {
       var sendObj = {
       typeID: 1, // 1=pieces init
       element0: data[0].place,
       element1: data[1].place,
       element2: data[2].place,
       element3: data[3].place,
       element4: data[4].place,
       statusOK: true,
       };
       }
       if (id == 3) {
       var sendObj = {
       typeID: 3,
       turn: 0,
       moveFrom: data[0],
       moveTo: data[1],
       statusOK: true,
       };
       }*/

      //  this.connection.send(JSON.stringify(sendObj));
      this.connection.send(value);
    }
  });

  return GameUser;
});