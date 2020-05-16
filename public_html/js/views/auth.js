define([
  'backbone',
  'tmpl/auth',
  'models/user'
], function (Backbone,
             tmpl,
             UserModel) {

  return Backbone.View.extend({
    template: tmpl,
    model: UserModel,
    events: {
      "submit": "formSubmit"
    },
    initialize: function () {
      this.$el.addClass("gameView__authView");
      this.$el.appendTo('.gameView');
      this.render();
      this.$el.hide();
    },
    formSubmit: function (e) {
      e.preventDefault();
      if (e.target.className == "form_signup") {
        data = this.$el.find(".form_signup").serializeArray();
        this.model.signUp(data);
      } else {
        data = this.$el.find(".form_signin").serializeArray();
        this.model.signIn(data);
      }
    },
    render: function () {
      this.$el.html(this.template());
    },
    show: function () {
      this.$el.show();
      this.trigger('show', this);
    },
    hide: function () {
      this.clearFroms();
      this.$el.hide();
    },
    clearFroms: function () {
      $("input[name=login]").val("");
      $("input[name=email]").val("");
      $("input[name=password]").val("");
    }
  });
})
;