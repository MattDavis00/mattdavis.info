angular.module("my-app").controller("createStoreCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.storesData = {};
  $scope.results = "";

  $scope.CreateStore = function() {

    var request = $http({
      method: "post",
      url: "app/components/stores/create/createStore.php",
      data: {
        name: $scope.storesData.name,
        address: $scope.storesData.address,
        phoneNumber: $scope.storesData.phoneNumber
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      if (response.data.insertSuccess) {
        $scope.info = "A new store has been created. Store ID: " + response.data.storeID;
        $scope.storesData.name = "";
        $scope.storesData.address = "";
        $scope.storesData.phoneNumber = "";
      } else {
        $scope.info = " - Could not create store.";
      }
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons
}]);