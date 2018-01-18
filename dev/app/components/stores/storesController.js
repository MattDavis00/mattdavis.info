angular.module("my-app").controller("storesCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.storesData = {};
  $scope.results = "";

  $scope.CreateStore = function() {

    var request = $http({
      method: "post",
      url: "app/components/stores/createStore.php",
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
      $scope.results = response.data;
      $scope.info = " - stores.php ran!";
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons
}]);