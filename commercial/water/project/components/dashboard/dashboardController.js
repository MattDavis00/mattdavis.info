angular.module("project-app").controller("dashboardCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", function($scope, $http, sharedFunctions, $filter, localVariables) {

  $scope.siteDashboard = {};
  $scope.results = "";

  $scope.sharedFunctions = sharedFunctions;

  $scope.siteDashboard.sites = [{
      name: "The Shard",
      address: "32 London Bridge St, London",
      description: "Some descriptive information!",
      tag: "alert"
    },
    {
      name: "Heron Tower",
      address: "110 Bishopsgate, London",
      description: "Some descriptive information!",
      tag: "new"
    },
    {
      name: "Aeron Tower",
      address: "110 Bishopsgate, London",
      description: "Some descriptive information!",
      tag: "new"
    },
    {
      name: "Broadgate Tower",
      address: "201 Bishopsgate, London",
      description: "Some descriptive information!",
      tag: "normal"
    },
    {
      name: "Troadgate Tower",
      address: "201 Bishopsgate, London. 201 Bishopsgate, London. 201 Bishopsgate, London. 201 Bishopsgate, London.",
      description: "Some descriptive information!",
      tag: "normal"
    },
    {
      name: "And Shard",
      address: "32 London Bridge St, London",
      description: "Some descriptive information!",
      tag: "alert"
    },
    {
      name: "Proadgate Tower",
      address: "201 Bishopsgate, London",
      description: "Some descriptive information!",
      tag: "normal"
    },
    {
      name: "Droadgate Tower",
      address: "201 Bishopsgate, London",
      description: "Some descriptive information!",
      tag: "normal"
    },
    {
      name: "Froadgate Tower",
      address: "201 Bishopsgate, London",
      description: "Some descriptive information!",
      tag: "normal"
    }
  ];

  $scope.siteDashboard.displayedSites = $scope.siteDashboard.sites;

  $scope.$watch('[siteDashboard.searchData]', function() {
    if ($scope.siteDashboard.sites != null) { // This function is called on load and every time a variable is changed, to prevent this code causing an error whilst waiting for the post request, this stops the code running on load.
      $scope.temp = $filter('filter')($scope.siteDashboard.sites, $scope.siteDashboard.searchData); // Filter the search query in the search bar.
      $scope.temp = $filter('orderBy')($scope.temp, ['tag', 'name']); // Filter by column.
      $scope.siteDashboard.displayedSites = $scope.temp;
    }
  });

}]);