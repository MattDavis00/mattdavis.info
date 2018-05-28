angular.module("project-app").controller("taskManagerCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", function($scope, $http, sharedFunctions, $filter, localVariables) {

  $scope.Modal = {};
  $scope.pastebinData = {};
  $scope.results = "";

  var el = document.getElementById('items');
  var sortable = new Sortable(el, {
    animation: 150 // ms, animation speed moving items when sorting, `0` — without animation
  });

  $scope.sharedFunctions = sharedFunctions;

}]);