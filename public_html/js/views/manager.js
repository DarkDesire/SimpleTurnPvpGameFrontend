/**
 * Created by Eldar on 03.12.2015.
 */
define([
  'backbone'
], function (Backbone) {
  var Manager = Backbone.View.extend({
    views: [],
    initialize: function () {
    },
    render: function () {
    },
    show: function () {
    },
    hide: function () {
    },
    addViews: function (listViews) {
      var manager = this;
      _.each(listViews, function (view) {
        manager.views.push(view);
        manager.listenTo(view, 'show', manager.hideAll);
      });
    },
    hideAll: function (obj) {
      _.each(this.views, function (view) {
        if (view != obj) view.hide();
      });
    }

  });

  return new Manager();
});
