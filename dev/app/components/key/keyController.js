angular.module("my-app").controller("keyCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  $scope.keyData = {};
  $scope.results = "";

  $scope.UseKey = function() {

    var request = $http({
      method: "post",
      url: "app/components/key/key.php",
      data: {
        key: $scope.keyData.key
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.results = response.data;
      var returnData = angular.fromJson(response.data);

      $scope.info = " - UseKey() function ran!";
    });
  }
  $(".authenticated-nav-elements").hide();
  $(".authenticated-nav-elements-administrator").hide();
}]);