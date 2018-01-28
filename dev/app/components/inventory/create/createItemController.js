angular.module("my-app").controller("createItemCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.createItemData = {};
  $scope.results = "";

  $scope.CreateItem = function() {

    var request = $http({
      method: "post",
      url: "app/components/inventory/create/createItem.php",
      data: {
        name: $scope.createItemData.name,
        price: $scope.createItemData.price,
        barcode: $scope.createItemData.barcode,
        description: $scope.createItemData.description
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.results = response.data;
      if (response.data.insertSuccess) {
        $scope.info = "Item ID: " + response.data.itemID;
      } else {
        $scope.info = " - Could not create item.";
      }
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons
}]);