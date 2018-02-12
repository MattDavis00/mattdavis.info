angular.module("my-app").controller("updateQueryCtrl", ["$scope", "$http", "authCheck", "$filter", function($scope, $http, authCheck, $filter) {

  authCheck.User();
  authCheck.Init();
  $scope.updateQueryData = {};
  $scope.results = "";

  $scope.CheckEdit = function() {
    if (sessionStorage.editDataRequest == "true") { // If the session storage contains an item.
      sessionStorage.editDataRequest = "false"; // Clear the session storage variables used for the edit button.

      $scope.updateQueryData.itemAdmissionID = sessionStorage.editDataItemItemAdmissionID; // Update the form to contain the correct values.
      $scope.updateQueryData.itemID = sessionStorage.editDataItemItemID;
      $scope.updateQueryData.name = sessionStorage.editDataItemName;
      $scope.updateQueryData.price = sessionStorage.editDataItemPrice;
      $scope.updateQueryData.barcode = sessionStorage.editDataItemBarcode;
      $scope.updateQueryData.description = sessionStorage.editDataItemDescription;
      $scope.updateQueryData.location = sessionStorage.editDataItemLocation;
      $scope.updateQueryData.quantity = sessionStorage.editDataItemQuantity;

    }
  }

  $scope.UpdateQuery = function() {

    var request = $http({
      method: "post",
      url: "app/components/inventory/update/updateQuery.php",
      data: {
        itemAdmissionID: $scope.updateQueryData.itemAdmissionID,
        location: $scope.updateQueryData.location,
        quantity: $scope.updateQueryData.quantity
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      if (response.data.updateSuccess) {
        $scope.info = "An existing item has been updated. Item ID: " + response.data.itemID;
        $scope.updateQueryData.itemID = "";
        $scope.updateQueryData.name = "";
        $scope.updateQueryData.price = "";
        $scope.updateQueryData.barcode = "";
        $scope.updateQueryData.description = "";
      } else {
        $scope.info = " - Could not update item.";
      }
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons

  $scope.CheckEdit(); // Call the CheckEdit function to see if there is an item that has been editted.

}]);