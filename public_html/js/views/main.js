define([
  'backbone',
  'tmpl/main',
  'models/user'
], function (Backbone,
             tmpl,
             UserModel) {

  return Backbone.View.extend({
    template: tmpl,
    model: UserModel,
    events: {
      "click #btn_startGame": "startGame"
    },
    initialize: function () {
      console.log("main menu is initialized");
      this.$el.addClass("gameView__mainView");
      this.$el.appendTo('.gameView');
      this.render();
      this.$el.hide();
    },
    render: function () {
      this.$el.html(this.template());
    },
    show: function () {
      this.$el.show();
      this.trigger('show', this);
    },
    hide: function () {
      this.$el.hide();
    },
    startGame: function(){
      this.model.getGamePage();
    }
  });

});