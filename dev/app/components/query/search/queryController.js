angular.module("my-app").controller("queryCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.User();
  authCheck.Init();

  $scope.queryData = {};
  $scope.results = "";

  $scope.sortType = 'itemID'; // Set the default sort type
  $scope.sortReverse = false; // Set the default sort order
  $scope.itemsPerPage = 10; // Set the default amount of items per page.
  $scope.sortPage = 0; // Set the default page number.
  $scope.numberOfPages = 1; // Sets the default page count
  $scope.amountOfItems = 1;

  $scope.ClearItem = function() {
    $scope.queryData.search = "";
  }

  $scope.SearchItem = function() {
    var request = $http({
      method: "post",
      url: "app/components/query/search/query.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.items = response.data.selectData;
      $scope.permItems = $scope.items;
      $scope.amountOfItems = $scope.items.length;
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

  $(".authenticated-nav-elements-administrator").hide(); // Ensure that administrator icons are hidden.
  $(".authenticated-nav-elements").show(); // Show the top-nav and side-nav icons

  $scope.SearchItem();

  $scope.$watch('[queryData.search, sortType, sortReverse, permItems, itemsPerPage, sortPage]', function() { // Order and filter the items displayed to the user, limit the results to 10 items.
    if ($scope.permItems != null) { // This function is called on load and every time a variable is changed, to prevent this code causing an error whilst waiting for the post request, this stops the code running on load.
      $scope.temp = $filter('filter')($scope.permItems, $scope.queryData.search); // Filter the search query in the search bar.
      $scope.amountOfItems = $scope.temp.length; // Save the amount of items to a variable.
      $scope.numberOfPages = Math.floor(($scope.amountOfItems - 1) / $scope.itemsPerPage);
      $scope.temp = $filter('orderBy')($scope.temp, $scope.sortType, $scope.sortReverse); // Filter by column.
      $scope.temp = $filter('limitTo')($scope.temp, $scope.itemsPerPage, $scope.sortPage * $scope.itemsPerPage); // Limit to x per page, and start on page number * x;
      $scope.items = $scope.temp;
    }
  });

  $scope.NextPage = function() {
    $scope.numberOfPages = Math.floor(($scope.amountOfItems - 1) / $scope.itemsPerPage);
    if ($scope.numberOfPages > $scope.sortPage) { // Check if the page is the last page, if not then increment the page number.
      $scope.sortPage++;
    }
  }

  $scope.PreviousPage = function() {
    if ($scope.sortPage > 0) { // Check if the page is the first page, if not then decrease the page number by 1.
      $scope.sortPage--;
    }
  }

}]);