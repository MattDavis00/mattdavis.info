angular.module("my-app").controller("searchStoreCtrl", ["$scope", "$http", "authCheck", "$filter", function($scope, $http, authCheck, $filter) {

  authCheck.Admin();
  authCheck.Init();
  $scope.searchStoreData = {};
  $scope.results = "";

  $scope.sortType = 'storeID'; // Set the default sort type
  $scope.sortReverse = false; // Set the default sort order
  $scope.storesPerPage = 10; // Set the default amount of stores per page.
  $scope.sortPage = 0; // Set the default page number.
  $scope.numberOfPages = 1; // Sets the default page count
  $scope.amountOfStores = 1;

  $scope.ClearStore = function() {
    $scope.searchStoreData.search = "";
  }

  $scope.SearchStore = function() {
    var request = $http({
      method: "post",
      url: "app/components/stores/search/searchStore.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.stores = response.data.selectData;
      $scope.permStores = $scope.stores;
      $scope.amountOfStores = $scope.stores.length;
    });
  }

  $scope.EditStore = function(store) {

    // Save the object locally on the user's machine using session storage.
    sessionStorage.editDataStoreStoreID = store.storeID;
    sessionStorage.editDataStoreName = store.name;
    sessionStorage.editDataStoreAddress = store.address;
    sessionStorage.editDataStorePhoneNumber = store.phoneNumber;
    sessionStorage.editDataRequest = "true"; // State that a request is being made.
    window.location.href = '#!stores-update'; // Redirect the user to the update store view.

  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons

  $scope.SearchStore();

  $scope.$watch('[searchStoreData.search, sortType, sortReverse, permStores, storesPerPage, sortPage]', function() { // Order and filter the stores displayed to the user, limit the results to 10 stores.
    if ($scope.permStores != null) { // This function is called on load and every time a variable is changed, to prevent this code causing an error whilst waiting for the post request, this stops the code running on load.
      $scope.temp = $filter('filter')($scope.permStores, $scope.searchStoreData.search); // Filter the search query in the search bar.
      $scope.amountOfStores = $scope.temp.length; // Save the amount of stores to a variable.
      $scope.numberOfPages = Math.floor(($scope.amountOfStores - 1) / $scope.storesPerPage);
      $scope.temp = $filter('orderBy')($scope.temp, $scope.sortType, $scope.sortReverse); // Filter by column.
      $scope.temp = $filter('limitTo')($scope.temp, $scope.storesPerPage, $scope.sortPage * $scope.storesPerPage); // Limit to x per page, and start on page number * x;
      $scope.stores = $scope.temp;
    }
  });

  $scope.NextPage = function() {
    $scope.numberOfPages = Math.floor(($scope.amountOfStores - 1) / $scope.storesPerPage);
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