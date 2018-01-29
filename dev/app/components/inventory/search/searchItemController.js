angular.module("my-app").controller("searchItemCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.searchItemData = {};
  $scope.results = "";

  $scope.sortType = 'id'; // set the default sort type
  $scope.sortReverse = false; // set the default sort order

  // create the list of sushi rolls
  $scope.items = [{
      id: 456231,
      name: 'Nails',
      price: 2.49,
      description: "Oh this is a really nice and long description, I really hope this gets truncated some time soon. Oh this is a really nice and long description, I really hope this gets truncated some time soon. Oh this is a really nice and long description, I really hope this gets truncated some time soon.",
      barcode: "45616168789165"
    },
    {
      id: 626451,
      name: 'Beans Beans Beans Beans Beans Beans Beans Beans',
      price: 7.99,
      description: "This is a different description!",
      barcode: "245661419514591"
    },
    {
      id: 784318,
      name: 'Hammer',
      price: 14.69,
      description: "Wow I really would like a hammer for Christmas!",
      barcode: "34915491549811"
    },
    {
      id: 946832,
      name: 'Pens',
      price: 0.99,
      description: "Damn, I'm out of pens again!",
      barcode: "71491594519451"
    }
  ];

  $scope.ClearItem = function() {
    $scope.searchItemData.search = "";
  }

  $scope.SearchItem = function(item) {
    var request = $http({
      method: "post",
      url: "app/components/inventory/search/searchItem.php",
      data: {
        storeID: $scope.searchItemData.storeID,
        firstName: $scope.searchItemData.firstName,
        lastName: $scope.searchItemData.lastName
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.items = response.data.selectData;
    });
  }

  $scope.EditItem = function(item) {

    $scope.info = item.id;

  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons
}]);