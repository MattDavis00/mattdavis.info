angular.module("project-app").controller("dashboardCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", function($scope, $http, sharedFunctions, $filter, localVariables) {

  $scope.results = "";

  $scope.sharedFunctions = sharedFunctions;

}]);