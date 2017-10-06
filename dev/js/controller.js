function Cntrl ($scope, $location) {
  $scope.changeView = function(view) {
    $location.path(view);
  }
}