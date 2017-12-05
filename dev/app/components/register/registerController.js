angular.module("my-app").controller("registerCtrl", ["$scope", "$http", "localVariables", function($scope, $http, localVariables) {

  $scope.registerData = {};
  $scope.error = "";

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
        if (response.data.registerSuccess) {
          window.location.href = '#'; // Upon successful registration, user is redirected to the login page.
        } else {
          $scope.info = " - Registration failed: Email is already in use.";
        }
      });
    }
  }
  $(".authenticated-nav-elements").hide(); // Hide the top-nav and side-nav icons

}]);
