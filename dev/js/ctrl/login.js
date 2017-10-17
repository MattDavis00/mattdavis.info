angular.module("my-app").controller("loginCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.loginData = {};

  $scope.url = "php/login.php";

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

    request.then(function(data) {
      $scope.info = "You have login successfully with email " + data;
    });
  }

}]);
