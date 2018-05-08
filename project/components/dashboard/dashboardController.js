angular.module("project-app").controller("dashboardCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", function($scope, $http, sharedFunctions, $filter, localVariables) {

  $scope.Modal = {};
  $scope.results = "";

  $scope.Modal.SwitchLoginRegister = function() {
    $('#loginModal').modal('toggle');
    $('#registerModal').modal('toggle');
  }

  $('#loginModal').on('hidden.bs.modal', function(e) {
    $scope.loginData = {};
    sharedFunctions.Validation.RemoveErrorTooltip('#login-email');
    sharedFunctions.Validation.RemoveErrorTooltip('#login-password');
  })

  $('#registerModal').on('hidden.bs.modal', function(e) {
    $scope.registerData = {};
    sharedFunctions.Validation.RemoveErrorTooltip('#register-email');
    sharedFunctions.Validation.RemoveErrorTooltip('#register-firstName');
    sharedFunctions.Validation.RemoveErrorTooltip('#register-lastName');
    sharedFunctions.Validation.RemoveErrorTooltip('#register-password');
    sharedFunctions.Validation.RemoveErrorTooltip('#register-passwordRepeat');
  })

  $scope.ClearForms = function() {
    $scope.loginData = {};
    $scope.registerData = {};
    sharedFunctions.Validation.RemoveErrorTooltip();
  }

  sharedFunctions.AuthenticateUser();

}]);