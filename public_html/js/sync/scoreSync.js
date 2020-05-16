define([
  'backbone'
], function (Backbone) {

  return function (method, collection, options) {

    var methodMap = {
      'read': {
        method: 'GET',
        url: '/api/v1/scores',
        success: function (resp) {
          if (resp.status == 200) {
            collection.reset(resp.body.scores);
          }
        }
      }
    };

    var xhr = $.ajax({
      method: methodMap[method].method,
      url: methodMap[method].url,
      async: false,
      dataType: 'json'
    }).done(methodMap[method].success);

    return xhr;
  }
});