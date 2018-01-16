angular.module("my-app").controller("organisationCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();

  $scope.organisationData = {};
  $scope.results = "";

  $scope.processOrganisation = function() {

    var request = $http({
      method: "post",
      url: "app/components/organisation/organisation.php",
      data: {
        name: $scope.organisationData.name
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.results = response.data;
      $scope.info = " - organisation.php ran!";
      window.location.href = '#!credentials';
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").hide(); // Ensure that the administrator icons are hidden as they should complete this form before continuing.
}]);