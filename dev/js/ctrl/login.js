angular.module("my-app").controller("loginCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.loginData = {};

  $scope.url = "php/login.php";

  $scope.results = "";

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
    })

    request.then(function(data) {
      $scope.info = "Login.js script ran!";
    });
  }

}]);
