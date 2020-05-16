define([
  'alertify'
], function (Alertify) {

  return function (method, model, options) {
    var methodMap = {
      'signUp': {
        method: 'POST',
        url: '/api/v1/auth/signup',
        success: function (resp) {
          if (resp.status == 200) {
            Alertify.success("You are signed up successfully!");
          } else if (resp.status = 400){
            Alertify.error(resp.body.description);
          } else if (resp.status = 500){
            Alertify.error(resp.body.description);
          }
        },
        error: function () {
        }
      },
      'signIn': {
        method: 'POST',
        url: '/api/v1/auth/signin',
        success: function (resp) {
          if (resp.status == 200) {
            Alertify.success("You are logged in successfully!");
            window.location.replace('/#game');
          } else if (resp.status = 400){
            Alertify.error(resp.body.description);
          }
        },
        error: function () {
        }
      },
      'signOut': {
        method: 'POST',
        url: '/api/v1/auth/signout',
        success: function (resp) {
          if (resp.status == 200) {
            Alertify.success("You are logged out successfully!");
            model.clear();
          } else if (resp.status = 401){
            Alertify.error(resp.body.description);
          }
        },
        error: function () {
        }
      },
      'checkAuth': {
        method: 'GET',
        url: '/api/v1/auth/check',
        success: function (resp) {
          if (resp.status == 200) {
            //
          } else if (resp.status = 400){
            Alertify.error(resp.body.description);
          }
        },
        error: function () {
        }
      },
      'getAdminPage': {
        method: 'GET',
        url: '/api/v1/admin',
        success: function (resp) {
          if (resp.status == 200) {
          } else if (resp.status = 400){
            Alertify.error(resp.body.description);
          } else if (resp.status = 401){
            Alertify.error(resp.body.description);
          }
        },
        error: function () {
        }
      },
      'getUserPage': {
        method: 'GET',
        url: '/api/v1/user',
        success: function (resp) {
          if (resp.status == 200) {
          } else if (resp.status = 400){
            Alertify.error(resp.body.description);
          }
        },
        error: function () {
        }
      },
      'getGamePage': {
        method: 'GET',
        url: '/game',
        success: function (resp) {
          if (resp.status == 200) {
            window.location.replace('/#game');
          } else if (resp.status = 400){
            Alertify.error(resp.body.description);
            window.location.replace('/#login');
          }
        },
        error: function () {
        }
      }
    };

    var success = methodMap[method].success,
      error = methodMap[method].error;
    data = {};
    for (var num in model.attributes) {
      data[model.attributes[num].name] = model.attributes[num].value;
    }

    var xhr = $.ajax({
      type: methodMap[method].method,
      url: methodMap[method].url,
      data: data,
      async: false,
      dataType: 'json'
    }).done(success).fail(error);

    return xhr;
  }
});