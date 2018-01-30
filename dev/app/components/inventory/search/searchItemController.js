angular.module("my-app").controller("searchItemCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.searchItemData = {};
  $scope.results = "";

  $scope.sortType = 'itemID'; // set the default sort type
  $scope.sortReverse = false; // set the default sort order

  $scope.ClearItem = function() {
    $scope.searchItemData.search = "";
  }

  $scope.SearchItem = function() {
    var request = $http({
      method: "post",
      url: "app/components/inventory/search/searchItem.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.items = response.data.selectData;
    });
  }

  $scope.EditItem = function(item) {

    // Save the object locally on the user's machine using session storage.
    sessionStorage.editDataItemItemID = item.itemID;
    sessionStorage.editDataItemName = item.name;
    sessionStorage.editDataItemPrice = item.price;
    sessionStorage.editDataItemBarcode = item.barcode;
    sessionStorage.editDataItemDescription = item.description;
    sessionStorage.editDataRequest = "true"; // State that a request is being made.
    window.location.href = '#!inventory-update'; // Redirect the user to the update item view.

  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons

  $scope.SearchItem();
}]);