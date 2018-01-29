angular.module("my-app").controller("loginCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  $scope.loginData = {};
  $scope.results = "";

  var request = $http({
    method: "post",
    url: "app/components/login/initialise.php",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  request.then(function(response) {
    // Any checks after the initialise.php script has ran.
  });

  $scope.processLogin = function() {

    var request = $http({
      method: "post",
      url: "app/components/login/login.php",
      data: {
        id: $scope.loginData.id,
        password: $scope.loginData.password
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      var returnData = angular.fromJson(response.data);

      sessionStorage.userID = returnData.userID;
      sessionStorage.storeID = returnData.storeID;
      sessionStorage.orgID = returnData.orgID;
      sessionStorage.administrator = returnData.administrator;
      sessionStorage.loggedIn = returnData.loggedIn;

      if (returnData.verification) {
        if (returnData.administrator) {
          sessionStorage.storeID = "Administrator";
          if (returnData.orgID === null) {
            window.location.href = '#!organisation'; // If the administrator is not part of an organisation, take them to the organisation view.
          } else {
            window.location.href = '#!credentials'; // Upon successful admin login, user is redirected to the query page.
          }
        } else {
          window.location.href = '#!query'; // Upon successful user login, user is redirected to the query page.
        }
      }
      $scope.info = " - processLogin() function ran!";
    });
  }
  $(".authenticated-nav-elements").hide();
  $(".authenticated-nav-elements-administrator").hide();
}]);