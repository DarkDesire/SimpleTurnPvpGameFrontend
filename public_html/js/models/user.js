define([
  'backbone',
  'sync/userSync'
], function (Backbone, userSync) {

  var UserModel = Backbone.Model.extend({
    sync: userSync,
    initialize: function () {
    },
    signIn: function (data) {
      this.clear();
      this.set(data);
      this.sync("signIn", this);
    },
    signUp: function (data) {
      this.clear();
      this.set(data);
      this.sync("signUp", this);
    },
    signOut: function () {
      this.sync("signOut", this);
    },
    checkAuth: function () {
      this.sync("checkAuth", this);
    },
    getGamePage: function () {
      this.sync("getGamePage", this);
    },
    getUserPage: function () {
      this.sync("getUserPage", this);
    },
    getAdminPage: function () {
      this.sync("getAdminPage", this);
    }

  });
  return new UserModel;
});