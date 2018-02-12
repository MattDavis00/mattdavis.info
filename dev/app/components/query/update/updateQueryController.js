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

      if (sessionStorage.editDataItemLocation == "null" || sessionStorage.editDataItemQuantity == "null") { // If there is not a record, then set the location and quantity to default values.
        $scope.updateQueryData.location = "";
        $scope.updateQueryData.quantity = 0;
      } else {
        $scope.updateQueryData.location = sessionStorage.editDataItemLocation;
        $scope.updateQueryData.quantity = sessionStorage.editDataItemQuantity;
      }

    }
  }

  $scope.UpdateQuery = function() {

    var request = $http({
      method: "post",
      url: "app/components/query/update/updateQuery.php",
      data: {
        itemAdmissionID: $scope.updateQueryData.itemAdmissionID,
        itemID: $scope.updateQueryData.itemID,
        location: $scope.updateQueryData.location,
        quantity: $scope.updateQueryData.quantity
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      if (response.data.updateSuccess) {
        window.location.href = '#!query-search'; // Upon successful update/insert the user is redirected back to the search/query view.
      } else {
        $scope.info = " - Could not update item.";
      }
    });
  }
  $(".authenticated-nav-elements-administrator").hide(); // Ensure that administrator icons are hidden.
  $(".authenticated-nav-elements").show(); // Show the top-nav and side-nav icons

  $scope.CheckEdit(); // Call the CheckEdit function to see if there is an item that has been editted.

}]);