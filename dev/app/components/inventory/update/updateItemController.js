angular.module("my-app").controller("updateItemCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.updateItemData = {};
  $scope.results = "";

  $scope.UpdateItem = function() {

    var request = $http({
      method: "post",
      url: "app/components/inventory/update/updateItem.php",
      data: {
        name: $scope.updateItemData.name,
        price: $scope.updateItemData.price,
        barcode: $scope.updateItemData.barcode,
        description: $scope.updateItemData.description
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      if (response.data.insertSuccess) {
        $scope.info = "An existing item has been updated. Item ID: " + response.data.itemID;
      } else {
        $scope.info = " - Could not update item.";
      }
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons
}]);