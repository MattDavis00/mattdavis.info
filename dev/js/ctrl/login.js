angular.module("my-app").controller("loginCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.loginData = {};
  $scope.results = "";
  $scope.url = "php/login.php";

  var request = $http({
    method: "post",
    url: "php/initialize.php",
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
      url: "php/login.php",
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
      $scope.info = " - processLogin() function ran!";
    });
  }

}]);
