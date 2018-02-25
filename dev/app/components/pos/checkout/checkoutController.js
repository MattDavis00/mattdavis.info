angular.module("my-app").controller("checkoutCtrl", ["$scope", "$http", "authCheck", "$filter", function($scope, $http, authCheck, $filter) {

  authCheck.User();
  authCheck.Init();

  $scope.checkoutData = {};
  $scope.results = "";
  $scope.checkoutData.id = "";
  $scope.checkoutData.receipt = [];
  $scope.checkoutData.total = 0;

  $scope.ClearItem = function() {
    $scope.checkoutData.id = "";
  }

  $scope.SearchItem = function() {
    var request = $http({
      method: "post",
      url: "app/components/pos/checkout/collectItems.php",
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

  $scope.buttonPress = function(button) {
    if (button != "-1") {
      $scope.checkoutData.id += button;
    } else {
      $scope.checkoutData.id += ".";
    }
  }

  $(".authenticated-nav-elements-administrator").hide(); // Ensure that administrator icons are hidden.
  $(".authenticated-nav-elements").show(); // Show the top-nav and side-nav icons

  $scope.SearchItem();

  $scope.addItem = function() {
    $scope.itemSearch = $filter('filter')($scope.permItems, $scope.checkoutData.id);
    $scope.tempItem = [];
    $scope.itemSearch.forEach(function(arrayItem) {
      if (arrayItem.itemID == $scope.checkoutData.id || arrayItem.barcode == $scope.checkoutData.id) {
        $scope.tempItem.push(arrayItem);
      }
    });
    if ($scope.tempItem.length == 1) {
      $scope.tempItem.forEach(function(arrayItem) {
        $scope.checkoutData.receipt.push(arrayItem);
        $scope.checkoutData.total += arrayItem.price;
        $scope.checkoutData.notification = arrayItem;
      });
    } else {
      $scope.checkoutData.notification = {
        name: "Item not found!",
        price: 0
      };
    }
    $scope.ClearItem();
  }

  $scope.Total = function() {
    var request = $http({
      method: "post",
      url: "app/components/pos/checkout/total.php",
      data: {
        items: $scope.checkoutData.receipt,
        total: $scope.checkoutData.total
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      if (response.data.insertSuccess) {
        $scope.checkoutData.total = 0;
        $scope.checkoutData.notification = {
          name: " - Transaction processed.",
          price: 0
        };
        $scope.checkoutData.receipt = [];
      } else {
        $scope.checkoutData.notification = {
          name: " - Transaction failed.",
          price: 0
        };
      }
    });
  }

  $scope.$watch('[checkoutData.search, sortType, sortReverse, permItems, itemsPerPage, sortPage]', function() { // Order and filter the items displayed to the user, limit the results to 10 items.
    if ($scope.permItems != null) { // This function is called on load and every time a variable is changed, to prevent this code causing an error whilst waiting for the post request, this stops the code running on load.
      $scope.temp = $filter('filter')($scope.permItems, $scope.checkoutData.search); // Filter the search query in the search bar.
      $scope.amountOfItems = $scope.temp.length; // Save the amount of items to a variable.
      $scope.numberOfPages = Math.floor(($scope.amountOfItems - 1) / $scope.itemsPerPage);
      $scope.temp = $filter('orderBy')($scope.temp, $scope.sortType, $scope.sortReverse); // Filter by column.
      $scope.temp = $filter('limitTo')($scope.temp, $scope.itemsPerPage, $scope.sortPage * $scope.itemsPerPage); // Limit to x per page, and start on page number * x;
      $scope.items = $scope.temp;
    }
  });

  function inputFocus() {
    document.getElementById("checkout-textbox").focus(); // Set the focused textbox to the checkout-textbox.
  }
  window.onkeydown = inputFocus; // When a key is pressed, call inputFocus

}]);