angular.module("my-app").controller("queryCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.User();
  authCheck.Init();

  $scope.queryData = {};
  $scope.results = "";

  $scope.processQuery = function() {

    var request = $http({
      method: "post",
      url: "app/components/query/query.php",
      data: {
        id: $scope.queryData.id
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.results = response.data;
      $scope.info = " - query.php ran!";
    });
  }
  $(".authenticated-nav-elements-administrator").hide(); // Ensure that administrator icons are hidden.
  $(".authenticated-nav-elements").show(); // Show the top-nav and side-nav icons
}]);