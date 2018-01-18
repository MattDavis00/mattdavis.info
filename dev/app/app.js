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
      templateUrl: "app/components/stores/storesView.html",
      controller: "storesCtrl"
    })
    .when("/devices", {
      template: "<p>Devices Placeholder</p>"
    })
    // Otherwise redirect to login
    .otherwise({
      redirectTo: "/"
    })
});

app.service('authCheck', function() {

  this.Admin = function() {
    if (sessionStorage.loggedIn == "false" || sessionStorage.administrator === "false") { // If the user is either not logged in or is not an administrator. sessionStorage automatically converts everything to a string.
      window.location.href = '#!logout';
    }
  }

  this.User = function() {
    if (sessionStorage.loggedIn == "false") { // If the user is not logged in.
      window.location.href = '#!logout';
    }
  }

  this.Init = function() {
    $("#userID").html("User ID<br>" + sessionStorage.userID);
    $("#storeID").html("Store ID<br>" + sessionStorage.storeID);

    var view = location.hash;

    $("#queryIcon").removeClass("active-icon");
    $("#posIcon").removeClass("active-icon");
    $("#analyticsIcon").removeClass("active-icon");
    $("#credentialsIcon").removeClass("active-icon");
    $("#inventoryIcon").removeClass("active-icon");
    $("#storesIcon").removeClass("active-icon");
    $("#devicesIcon").removeClass("active-icon");

    if (view == "#!/query") {
      $("#queryIcon").addClass("active-icon");
    }
    if (view == "#!/pos") {
      $("#posIcon").addClass("active-icon");
    }
    if (view == "#!/analytics") {
      $("#analyticsIcon").addClass("active-icon");
    }
    if (view == "#!/credentials") {
      $("#credentialsIcon").addClass("active-icon");
    }
    if (view == "#!/inventory") {
      $("#inventoryIcon").addClass("active-icon");
    }
    if (view == "#!/stores") {
      $("#storesIcon").addClass("active-icon");
    }
    if (view == "#!/devices") {
      $("#devicesIcon").addClass("active-icon");
    }

  }

});