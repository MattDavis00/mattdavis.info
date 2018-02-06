angular.module("my-app").controller("devicesCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.storesData = {};
  $scope.results = "";

  $scope.CreateKey = function() {

    var request = $http({
      method: "post",
      url: "app/components/devices/devices.php",
      data: {
        id: $scope.devicesData.id
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      if (response.data.insertSuccess) {
        $scope.info = "Key: " + response.data.key;
      } else {
        $scope.info = " - Could not create key.";
      }
    });
  }

  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons
}]);