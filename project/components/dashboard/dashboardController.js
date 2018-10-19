angular.module("project-app").controller("dashboardCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", function($scope, $http, sharedFunctions, $filter, localVariables) {

  $scope.results = "";

  $scope.sharedFunctions = sharedFunctions;

  $scope.UpdateSettings = function() {

    //////////////Update Request//////////////

    var request = $http({
      method: "post",
      url: "project/components/dashboard/updateSettings.php",
      data: {
        password: {
          data: $scope.settingsData.password,
          field: "#settings-password"
        },
        passwordRepeat: {
          data: $scope.settingsData.passwordRepeat,
          field: "#settings-password-repeat"
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
      } else if (serverResponse.updateSuccess) {
        sharedFunctions.Prompt("success", "Settings updated successfully.");
      } else {
        sharedFunctions.Prompt("warning", "Unexpected response.");
      }

    });



  }

}]);