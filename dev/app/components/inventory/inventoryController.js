angular.module("my-app").controller("inventoryCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.inventoryData = {};
  $scope.results = "";

  $scope.CreateItem = function() {

    var request = $http({
      method: "post",
      url: "app/components/inventory/createItem.php",
      data: {
        storeID: $scope.inventoryData.storeID,
        firstName: $scope.inventoryData.firstName,
        lastName: $scope.inventoryData.lastName
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.results = response.data;
      if (response.data.insertSuccess) {
        $scope.info = "User ID: " + response.data.userID;
        $scope.info += "  Password: " + response.data.password;
      } else {
        $scope.info = " - Could not create key.";
      }
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons
}]);