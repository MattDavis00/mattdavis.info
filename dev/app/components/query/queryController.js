angular.module("my-app").controller("queryCtrl", ["$scope", "$http", function($scope, $http) {

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

}]);
