angular.module("project-app").controller("verifyCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", "$location", function($scope, $http, sharedFunctions, $filter, localVariables, $location) {

  $scope.verifyData = {};
  $scope.results = "";

  $scope.sharedFunctions = sharedFunctions;

  $scope.Verify = function() {

    var verificationString = $location.path().substring(8);
    var input = verificationString.split("&");


    //////////////View Request//////////////

    var request = $http({
      method: "post",
      url: "project/components/verify/verify.php",
      data: {
        email: input[0],
        verificationCode: input[1]
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      var serverResponse = angular.fromJson(response.data);

      if (serverResponse.executionErrorFlag) { // Server could not verify email
        sharedFunctions.Prompt("error", serverResponse.executionError);
      } else if (serverResponse.verificationSuccess) {
        sharedFunctions.Prompt("success", "Email verified!");
        window.location.href = '#';
      } else {
        sharedFunctions.Prompt("warning", "Unexpected response.");
      }

    });



  }

  $scope.Verify();

}]);