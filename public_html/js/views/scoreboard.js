define([
  'backbone',
  'tmpl/scoreboard',
  'collections/scores',
  'models/user'
], function (Backbone,
             tmpl,
             ScoreCollection,
             UserModel) {

  return Backbone.View.extend({
    collection: new ScoreCollection(),
    template: tmpl,
    model: UserModel,
    initialize: function () {
      this.$el.addClass("gameView__scoreView");
      this.$el.appendTo('.gameView');
      this.$el.hide();
    },
    render: function () {
      this.collection.fetch();
      this.$el.html(this.template(this.collection.toJSON()));
    },
    show: function () {
      this.render();
      this.$el.show();
      this.trigger('show', this);
    },
    hide: function () {
      this.$el.hide();
    }
  });
});
