angular.module("project-app").controller("taskManagerCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", function($scope, $http, sharedFunctions, $filter, localVariables) {

  $scope.Modal = {};
  $scope.pastebinData = {};
  $scope.results = "";

  // var el = document.getElementById('items');
  // var sortable = new Sortable(el, {
  //   animation: 150 // ms, animation speed moving items when sorting, `0` — without animation
  // });

  $(function() {
    $("#items").sortable({
      revert: 200,
      opacity: 0.5,
      containment: "parent",
      tolerance: "pointer",
      handle: ".item-handle"
    });
    $("#items").disableSelection();
  });

  $scope.sharedFunctions = sharedFunctions;

}]);