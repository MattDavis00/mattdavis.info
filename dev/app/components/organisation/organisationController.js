angular.module("my-app").controller("organisationCtrl", ["$scope", "$http", "localVariables", function($scope, $http, localVariables) {

  $scope.organisationData = {};
  $scope.results = "";

  $scope.processorganisation = function() {

    var request = $http({
      method: "post",
      url: "app/components/organisation/organisation.php",
      data: {
        id: $scope.organisationData.id
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.results = response.data;
      $scope.info = " - organisation.php ran!";
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").hide(); // Ensure that the administrator icons are hidden as they should complete this form before continuing.
}]);
