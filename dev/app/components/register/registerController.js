angular.module("my-app").controller("registerCtrl", ["$scope", "$http", "localVariables", function($scope, $http, localVariables) {

  $scope.registerData = {};
  $scope.error = "";

  $scope.processRegister = function() {


    // Error Flags //

    $scope.error = "";
    var errorFlag = false;
    var emailFlag = false;
    var passwordFlag = false;
    var passwordRepeatFlag = false;
    var firstNameFlag = false;
    var lastNameFlag = false;

    // Input Validations //

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.registerData.email))) { // w3resource regex for email validation.
      $scope.error += " - Email does not match standard rules!";
      $("#email-input").addClass("error-border");
      emailFlag = true;
      errorFlag = true;
    }

    if ($scope.registerData.password != $scope.registerData.repeatPassword) {
      $scope.error += " - Passwords do not match!";
      passwordFlag = true;
      passwordRepeatFlag = true;
      errorFlag = true;
    }

    if ($scope.registerData.firstName.length > 50) {
      $scope.error += " - First name exceeds 50 characters!";
      firstNameFlag = true;
      errorFlag = true;
    }

    if ($scope.registerData.lastName.length > 50) {
      $scope.error += " - Last name exceeds 50 characters!";
      lastNameFlag = true;
      errorFlag = true;
    }


    // POST Request //

    if (errorFlag == false) {
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
  $(".authenticated-nav-elements-administrator").hide();
}]);