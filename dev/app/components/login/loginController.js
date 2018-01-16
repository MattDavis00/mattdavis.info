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
    $scope.results = response.data;
    $scope.info = " - initialise() function ran!";
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
      $scope.results = response.data;
      var returnData = angular.fromJson(response.data);

      localVariables.set_userID(returnData.userID);
      localVariables.set_storeID(returnData.storeID);
      localVariables.set_orgID(returnData.orgID);
      localVariables.set_administrator(returnData.administrator);
      localVariables.set_loggedIn(returnData.loggedIn);

      if (returnData.verification) {
        if (returnData.administrator) {
          $("#storeID").html("Store ID<br>Administrator");
          if (returnData.orgID === null) {
            window.location.href = '#!organisation'; // If the administrator is not part of an organisation, take them to the organisation view.
          } else {
            window.location.href = '#!credentials'; // Upon successful admin login, user is redirected to the query page.
          }
        } else {
          $("#storeID").html("Store ID<br>" + returnData.storeID);
          window.location.href = '#!query'; // Upon successful user login, user is redirected to the query page.
        }
        $("#userID").html("User ID<br>" + returnData.userID);
      }
      $scope.info = " - processLogin() function ran!";
    });
  }
  $(".authenticated-nav-elements").hide();
  $(".authenticated-nav-elements-administrator").hide();
}]);
