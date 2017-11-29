angular.module("my-app").controller("logoutCtrl", ["$scope", "$http", function($scope, $http) {

  var request = $http({
    method: "post",
    url: "app/components/logout/logout.php",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  request.then(function(response) {
    $scope.results = response.data;
    var returnData = angular.fromJson(response.data);
    if (!returnData.verification) {
      if (!returnData.loggedIn) {
        window.location.href = '#'; // Upon successful admin logout, user is redirected to the login page.
      }
    }
  });
  $(".authenticated-nav-elements").hide();

}]);
