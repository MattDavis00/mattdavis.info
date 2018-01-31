angular.module("my-app").controller("updateItemCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.updateItemData = {};
  $scope.results = "";

  $scope.CheckEdit = function() {
    if (sessionStorage.editDataRequest == "true") { // If the session storage contains an item.
      sessionStorage.editDataRequest = "false"; // Clear the session storage variables used for the edit button.
      $scope.updateItemData.itemID = sessionStorage.editDataItemItemID; // Update the form to contain the correct values.
      $scope.updateItemData.name = sessionStorage.editDataItemName;
      $scope.updateItemData.price = sessionStorage.editDataItemPrice;
      $scope.updateItemData.barcode = sessionStorage.editDataItemBarcode;
      $scope.updateItemData.description = sessionStorage.editDataItemDescription;
    }
  }

  $scope.UpdateItem = function() {

    var request = $http({
      method: "post",
      url: "app/components/inventory/update/updateItem.php",
      data: {
        itemID: $scope.updateItemData.itemID,
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
      if (response.data.updateSuccess) {
        $scope.info = "An existing item has been updated. Item ID: " + response.data.itemID;
        $scope.updateItemData.itemID = "";
        $scope.updateItemData.name = "";
        $scope.updateItemData.price = "";
        $scope.updateItemData.barcode = "";
        $scope.updateItemData.description = "";
      } else {
        $scope.info = " - Could not update item.";
      }
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons

  $scope.CheckEdit(); // Call the CheckEdit function to see if there is an item that has been editted.
}]);