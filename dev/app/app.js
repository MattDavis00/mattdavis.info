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
    .when("/key", {
      templateUrl: "app/components/key/keyView.html",
      controller: "keyCtrl"
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
    .when("/inventory-create", {
      templateUrl: "app/components/inventory/create/createItemView.html",
      controller: "createItemCtrl"
    })
    .when("/inventory-search", {
      templateUrl: "app/components/inventory/search/searchItemView.html",
      controller: "searchItemCtrl"
    })
    .when("/stores", {
      templateUrl: "app/components/stores/storesView.html",
      controller: "storesCtrl"
    })
    .when("/devices", {
      templateUrl: "app/components/devices/devicesView.html",
      controller: "devicesCtrl"
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
    } else if (view == "#!/pos") {
      $("#posIcon").addClass("active-icon");
    } else if (view == "#!/analytics") {
      $("#analyticsIcon").addClass("active-icon");
    } else if (view == "#!/credentials") {
      $("#credentialsIcon").addClass("active-icon");
    } else if (view == "#!/inventory-create") {
      $("#inventoryIcon").addClass("active-icon");
    } else if (view == "#!/inventory-search") {
      $("#inventoryIcon").addClass("active-icon");
    } else if (view == "#!/stores") {
      $("#storesIcon").addClass("active-icon");
    } else if (view == "#!/devices") {
      $("#devicesIcon").addClass("active-icon");
    }

  }

});