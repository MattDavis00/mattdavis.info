angular.module("project-app").controller("landingCtrl", ["$scope", "$http", "sharedFunctions", "$filter", function($scope, $http, sharedFunctions, $filter) {

  $scope.loginData = {};
  $scope.registerData = {};
  $scope.Modal = {};
  $scope.results = "";

  $scope.RegisterUser = function() {

    //////////////Validation Checks//////////////

    var errorWithInput = false;

    if (sharedFunctions.Validation.Email("#register-email", $scope.registerData.email)) {
      errorWithInput = true;
    }
    if (sharedFunctions.Validation.Name("#register-firstName", $scope.registerData.firstName)) {
      errorWithInput = true;
    }
    if (sharedFunctions.Validation.Name("#register-lastName", $scope.registerData.lastName)) {
      errorWithInput = true;
    }
    if (sharedFunctions.Validation.Password("#register-password", "#register-passwordRepeat", $scope.registerData.password, $scope.registerData.passwordRepeat)) {
      errorWithInput = true;
    }

    //////////////Register Request//////////////

    if (!errorWithInput) {

      var request = $http({
        method: "post",
        url: "project/components/landing/register.php",
        data: {
          email: [$scope.registerData.email, "#register-email"],
          firstName: [$scope.registerData.firstName, "#register-firstName"],
          lastName: [$scope.registerData.lastName, "#register-lastName"],
          password: [$scope.registerData.password, "#register-password"],
          passwordRepeat: [$scope.registerData.passwordRepeat, "#register-passwordRepeat"]
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      request.then(function(response) {
        var serverResponse = angular.fromJson(response.data);

        // sessionStorage.userID = returnData.userID;
        // sessionStorage.storeID = returnData.storeID;
        // sessionStorage.orgID = returnData.orgID;
        // sessionStorage.administrator = returnData.administrator;
        // sessionStorage.loggedIn = returnData.loggedIn;

        // if (returnData.verification) {
        //   if (returnData.administrator) {
        //     sessionStorage.storeID = "Administrator";
        //     if (returnData.orgID === null) {
        //       window.location.href = '#!organisation'; // If the administrator is not part of an organisation, take them to the organisation view.
        //     } else {
        //       window.location.href = '#!credentials-search'; // Upon successful admin login, user is redirected to the query page.
        //     }
        //   } else {
        //     window.location.href = '#!query-search'; // Upon successful user login, user is redirected to the query page.
        //   }
        // }
        // $scope.info = " - processLogin() function ran!";

      });

    }

  }

  particlesJS.load('background-animation', 'particles.json');

  $scope.Modal.LoginShow = function() {
    $('#registerModal').modal('hide');
    $('#loginModal').modal('show');
    $scope.loginData = {};
    sharedFunctions.Validation.RemoveErrorTooltip('#login-email');
    sharedFunctions.Validation.RemoveErrorTooltip('#login-password');
  }

  $scope.Modal.RegisterShow = function() {
    $('#loginModal').modal('hide');
    $('#registerModal').modal('show');
    $scope.registerData = {};
    sharedFunctions.Validation.RemoveErrorTooltip('#register-email');
    sharedFunctions.Validation.RemoveErrorTooltip('#register-firstName');
    sharedFunctions.Validation.RemoveErrorTooltip('#register-lastName');
    sharedFunctions.Validation.RemoveErrorTooltip('#register-password');
    sharedFunctions.Validation.RemoveErrorTooltip('#register-passwordRepeat');
  }

  $scope.ClearForms = function() {
    $scope.loginData = {};
    $scope.registerData = {};
    sharedFunctions.Validation.RemoveErrorTooltip();
  }

}]);