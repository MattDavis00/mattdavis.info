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

    $scope.info = item.itemID;
    $scope.SearchItem(); // After the item has been editted/updated, run the SearchItem() function to update the table of results.

  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons

  $scope.SearchItem();
}]);