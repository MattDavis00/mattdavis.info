angular.module("my-app").controller("credentialsCtrl", ["$scope", "$http", "localVariables", function($scope, $http, localVariables) {

  $scope.credentialsData = {};
  $scope.results = "";

  $scope.processcredentials = function() {

    var request = $http({
      method: "post",
      url: "app/components/credentials/credentials.php",
      data: {
        id: $scope.credentialsData.id
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.results = response.data;
      $scope.info = " - credentials.php ran!";
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons
}]);
