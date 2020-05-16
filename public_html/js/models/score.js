define([
  'backbone'
], function (Backbone) {

  var ScoreModel = Backbone.Model.extend({

    defaults: {
      id: 0,
      name: "",
      score: 0
    }

  });

  return ScoreModel;
});