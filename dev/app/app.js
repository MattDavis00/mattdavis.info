var app = angular.module("my-app", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    // General
    .when("/", {
      templateUrl: "app/components/login/loginView.html",
      controller: "loginCtrl"
    })
    .when("/register", {
      templateUrl: "app/components/register/registerView.html",
      controller: "registerCtrl"
    })
    .when("/logout", {
      template: "<p>Logout Placeholder</p>",
      controller: "logoutCtrl"
    })
    // Normal User
    .when("/query", {
      templateUrl: "app/components/query/queryView.html",
      controller: "queryCtrl"
    })
    .when("/pos", {
      template: "<p>Point of Sale Placeholder</p>"
    })
    .when("/analytics", {
      template: "<p>Analytics Placeholder</p>"
    })
    // Administrator
    .when("/organisation", {
      templateUrl: "app/components/organisation/organisationView.html",
      controller: "organisationCtrl"
    })
    .when("/credentials", {
      templateUrl: "app/components/credentials/credentialsView.html",
      controller: "credentialsCtrl"
    })
    .when("/inventory", {
      template: "<p>Inventory Placeholder</p>"
    })
    .when("/stores", {
      template: "<p>Stores Placeholder</p>"
    })
    .when("/devices", {
      template: "<p>Devices Placeholder</p>"
    })
    // Otherwise redirect to login
    .otherwise({
      redirectTo: "/"
    })
});

app.service('localVariables', function() {
  var userID;
  var storeID;
  var orgID;
  var administrator = false;
  var deviceAuth = false;
  var loggedIn = false;

  return {
    get_userID: function() {
      return userID;
    },
    set_userID: function(value) {
      userID = value;
    },
    get_storeID: function() {
      return storeID;
    },
    set_storeID: function(value) {
      storeID = value;
    },
    get_orgID: function() {
      return orgID;
    },
    set_orgID: function(value) {
      orgID = value;
    },
    get_administrator: function() {
      return administrator;
    },
    set_administrator: function(value) {
      administrator = value;
    },
    get_deviceAuth: function() {
      return deviceAuth;
    },
    set_deviceAuth: function(value) {
      deviceAuth = value;
    },
    get_loggedIn: function() {
      return loggedIn;
    },
    set_loggedIn: function(value) {
      loggedIn = value;
    }
  };
});
