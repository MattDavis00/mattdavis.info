angular.module("my-app").controller("credentialsCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.credentialsData = {};
  $scope.results = "";

  $scope.CreateUser = function() {

    var request = $http({
      method: "post",
      url: "app/components/credentials/createUser.php",
      data: {
        storeID: $scope.credentialsData.storeID,
        firstName: $scope.credentialsData.firstName,
        lastName: $scope.credentialsData.lastName
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.results = response.data;
      if (response.data.insertSuccess) {
        $scope.info = "User ID: " + response.data.userID;
        $scope.info += "  Password: " + response.data.password;
      } else {
        $scope.info = " - Could not create key.";
      }
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons
}]);