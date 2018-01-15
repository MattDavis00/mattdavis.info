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


    // Reset CSS Error Classes //

    $("#email-input").removeClass("error-border");
    $("#password-input").removeClass("error-border");
    $("#passwordRepeat-input").removeClass("error-border");
    $("#firstName-input").removeClass("error-border");
    $("#lastName-input").removeClass("error-border");


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


    // Check Flags And Set Classes //

    if (emailFlag == true) {
      $("#email-input").addClass("error-border");
    }
    if (passwordFlag == true) {
      $("#password-input").addClass("error-border");
    }
    if (passwordRepeatFlag == true) {
      $("#passwordRepeat-input").addClass("error-border");
    }
    if (firstNameFlag == true) {
      $("#firstName-input").addClass("error-border");
    }
    if (lastNameFlag == true) {
      $("#lastName-input").addClass("error-border");
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