angular.module("my-app").controller("updateUserCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.updateUserData = {};
  $scope.results = "";

  $scope.CheckEdit = function() {
    if (sessionStorage.editDataRequest == "true") { // If the session storage contains an user.
      sessionStorage.editDataRequest = "false"; // Clear the session storage variables used for the edit button.
      $scope.updateUserData.userID = sessionStorage.editDataUserUserID; // Update the form to contain the correct values.
      $scope.updateUserData.storeID = sessionStorage.editDataUserStoreID;
      $scope.updateUserData.firstName = sessionStorage.editDataUserFirstName;
      $scope.updateUserData.lastName = sessionStorage.editDataUserLastName;
    }
  }

  $scope.UpdateUser = function() {

    var request = $http({
      method: "post",
      url: "app/components/credentials/update/updateUser.php",
      data: {
        userID: $scope.updateUserData.userID,
        storeID: $scope.updateUserData.storeID,
        firstName: $scope.updateUserData.firstName,
        lastName: $scope.updateUserData.lastName
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      if (response.data.updateSuccess) {
        $scope.info = "An existing user has been updated. User ID: " + response.data.userID;
        $scope.updateUserData.userID = "";
        $scope.updateUserData.storeID = "";
        $scope.updateUserData.firstName = "";
        $scope.updateUserData.lastName = "";
      } else {
        $scope.info = " - Could not update user.";
      }
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons

  $scope.CheckEdit(); // Call the CheckEdit function to see if there is an user that has been editted.
}]);