angular.module("my-app").controller("loginCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.loginData = {};

  $scope.url = "php/login.php";

  $scope.processLogin = function() {
    $http({
     method: "post",
     url: "php/login.php"
    }).then(function successCallback(response) {
     // Store response data
     $scope.users = response.data;
    });

}]);
