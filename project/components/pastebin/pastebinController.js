angular.module("project-app").controller("pastebinCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", function($scope, $http, sharedFunctions, $filter, localVariables) {

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

  $scope.SharePaste = function() {

    var errorWithInput = false;

    if (sharedFunctions.Validation.Empty("#pastebin-code", $scope.pastebinData.code)) {
      errorWithInput = true;
    }


    //////////////Share Request//////////////

    if (!errorWithInput) {

      var request = $http({
        method: "post",
        url: "project/components/pastebin/share.php",
        data: {
          code: {
            data: $scope.pastebinData.code,
            field: "#pastebin-code"
          }
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      request.then(function(response) {
        var serverResponse = angular.fromJson(response.data);

        if (serverResponse.executionErrorFlag) { // Server could not insert
          sharedFunctions.Prompt("error", serverResponse.executionError);
        } else if (serverResponse.shareSuccess) {

          sharedFunctions.Prompt("success", "Share successful! mattdavis.info/p/" + serverResponse.shareCharID);

        } else {
          sharedFunctions.Prompt("warning", "Unexpected response.");
        }

      });

    }

  }

  $scope.sharedFunctions = sharedFunctions;

}]);