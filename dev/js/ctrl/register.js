angular.module("my-app").controller("registerCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.registerData = {};

  $scope.url = "php/register.php";

  $scope.processRegister = function() {

    var request = $http({
      method: "post",
      url: "php/register.php",
      data: {
        id: $scope.registerData.id,
        password: $scope.registerData.password
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
