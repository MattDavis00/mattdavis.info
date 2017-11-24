angular.module("my-app").controller("loginCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.loginData = {};
  $scope.results = "";

  var request = $http({
    method: "post",
    url: "app/components/login/initialize.php",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  request.then(function(response) {
    $scope.results = response.data;
    $scope.info = " - initialize() function ran!";
  });

  $scope.processLogin = function() {

    var request = $http({
      method: "post",
      url: "app/components/login/login.php",
      data: {
        id: $scope.loginData.id,
        password: $scope.loginData.password
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.results = response.data;
      $scope.info = " - processLogin() function ran!";
      $("#side-nav-icon-all").show();
    });
  }
  $("#side-nav-icon-all").hide();

}]);
