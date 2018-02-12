var app = angular.module("my-app", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    ///////////////////////// General ////////////////////////////

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


    ///////////////////////// Normal User ////////////////////////////

    // Query //
    .when("/query-search", {
      templateUrl: "app/components/query/search/queryView.html",
      controller: "queryCtrl"
    })
    .when("/query-update", {
      templateUrl: "app/components/query/update/updateQueryView.html",
      controller: "updateQueryCtrl"
    })

    // POS //
    .when("/pos", {
      template: "<p>Point of Sale Placeholder</p>"
    })

    // Analytics //
    .when("/analytics", {
      template: "<p>Analytics Placeholder</p>"
    })


    ///////////////////////// Administrator ////////////////////////////

    // Organisation //
    .when("/organisation", {
      templateUrl: "app/components/organisation/organisationView.html",
      controller: "organisationCtrl"
    })

    // Credentials //
    .when("/credentials-create", {
      templateUrl: "app/components/credentials/create/createUserView.html",
      controller: "createUserCtrl"
    })
    .when("/credentials-search", {
      templateUrl: "app/components/credentials/search/searchUserView.html",
      controller: "searchUserCtrl"
    })
    .when("/credentials-update", {
      templateUrl: "app/components/credentials/update/updateUserView.html",
      controller: "updateUserCtrl"
    })

    // Inventory //
    .when("/inventory-create", {
      templateUrl: "app/components/inventory/create/createItemView.html",
      controller: "createItemCtrl"
    })
    .when("/inventory-search", {
      templateUrl: "app/components/inventory/search/searchItemView.html",
      controller: "searchItemCtrl"
    })
    .when("/inventory-update", {
      templateUrl: "app/components/inventory/update/updateItemView.html",
      controller: "updateItemCtrl"
    })

    // Stores //
    .when("/stores-create", {
      templateUrl: "app/components/stores/create/createStoreView.html",
      controller: "createStoreCtrl"
    })
    .when("/stores-search", {
      templateUrl: "app/components/stores/search/searchStoreView.html",
      controller: "searchStoreCtrl"
    })
    .when("/stores-update", {
      templateUrl: "app/components/stores/update/updateStoreView.html",
      controller: "updateStoreCtrl"
    })

    // Devices //
    .when("/devices", {
      templateUrl: "app/components/devices/devicesView.html",
      controller: "devicesCtrl"
    })


    ///////////////////////// Otherwise, Redirect To Login ////////////////////////////
    .otherwise({
      redirectTo: "/"
    })
});

app.service('authCheck', function() {

  this.Admin = function() {
    if (sessionStorage.loggedIn != "true" || sessionStorage.administrator != "true") { // If the user is either not logged in or is not an administrator. sessionStorage automatically converts everything to a string.
      window.location.href = '#!logout';
    }
  }

  this.User = function() {
    if (sessionStorage.loggedIn != "true") { // If the user is not logged in.
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

    // Query
    if (view == "#!/query-search") {
      $("#queryIcon").addClass("active-icon");
    } else if (view == "#!/query-update") {
      $("#queryIcon").addClass("active-icon");
    }
    // POS
    else if (view == "#!/pos") {
      $("#posIcon").addClass("active-icon");
    }
    // Analytics
    else if (view == "#!/analytics") {
      $("#analyticsIcon").addClass("active-icon");
    }
    // Credentials
    else if (view == "#!/credentials-create") {
      $("#credentialsIcon").addClass("active-icon");
    } else if (view == "#!/credentials-search") {
      $("#credentialsIcon").addClass("active-icon");
    } else if (view == "#!/credentials-update") {
      $("#credentialsIcon").addClass("active-icon");
    }
    // Inventory
    else if (view == "#!/inventory-create") {
      $("#inventoryIcon").addClass("active-icon");
    } else if (view == "#!/inventory-search") {
      $("#inventoryIcon").addClass("active-icon");
    } else if (view == "#!/inventory-update") {
      $("#inventoryIcon").addClass("active-icon");
    }
    // Stores
    else if (view == "#!/stores-create") {
      $("#storesIcon").addClass("active-icon");
    } else if (view == "#!/stores-search") {
      $("#storesIcon").addClass("active-icon");
    } else if (view == "#!/stores-update") {
      $("#storesIcon").addClass("active-icon");
    }
    // Devices
    else if (view == "#!/devices") {
      $("#devicesIcon").addClass("active-icon");
    }

  }

});