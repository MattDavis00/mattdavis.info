angular.module("my-app").controller("searchItemCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.searchItemData = {};
  $scope.results = "";

  $scope.SearchItem = function() {

    var request = $http({
      method: "post",
      url: "app/components/inventory/search/searchItem.php",
      data: {
        storeID: $scope.searchItemData.storeID,
        firstName: $scope.searchItemData.firstName,
        lastName: $scope.searchItemData.lastName
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