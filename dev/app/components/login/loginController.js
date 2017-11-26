angular.module("my-app").controller("loginCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.loginData = {};
  $scope.results = "";

  var request = $http({
    method: "post",
    url: "app/components/login/initialize.php",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  request.then(function(response) {
    $scope.results = response.data;
    $scope.info = " - initialize() function ran!";
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
      if (returnData.verification) {
        if (returnData.administrator) {
          $("#storeID").html("Store ID<br>Administrator");
          window.location.href = '#!query'; // Upon successful admin login, user is redirected to the query page.
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

}]);
