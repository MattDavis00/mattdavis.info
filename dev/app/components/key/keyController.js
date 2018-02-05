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
      var returnData = angular.fromJson(response.data);
      if (returnData.insertSuccess == true) {
        $scope.info = "Device is now authenticated. Store ID: " + returnData.storeID;
      } else {
        $scope.info = "Device is either already authenticated, or key is invalid.";
      }
    });
  }
  $(".authenticated-nav-elements").hide();
  $(".authenticated-nav-elements-administrator").hide();
}]);