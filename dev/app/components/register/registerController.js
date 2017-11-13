angular.module("my-app").controller("registerCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.registerData = {};

  $scope.error = "";

  $scope.url = "php/register.php";

  $scope.processRegister = function() {

    if ($scope.registerData.password != $scope.registerData.repeatPassword) {
      $scope.error = " - Passwords do not match!";
    } else {
      var request = $http({
        method: "post",
        url: "app/components/register/register.php",
        data: {
          email: $scope.registerData.email,
          password: $scope.registerData.password,
          firstName: $scope.registerData.firstName,
          lastName: $scope.registerData.lastName
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      request.then(function(response) {
        $scope.results = response.data;
        $scope.info = " - You have registered successfully. Email: " + $scope.registerData.email + " Password: " + $scope.registerData.password + " Repeat Password: " + $scope.registerData.repeatPassword + " First Name: " + $scope.registerData.firstName + " Last Name: " + $scope.registerData.lastName;
      });
    }
  }

}]);
