angular.module("my-app").controller("updateStoreCtrl", ["$scope", "$http", "authCheck", function($scope, $http, authCheck) {

  authCheck.Admin();
  authCheck.Init();
  $scope.updateStoreData = {};
  $scope.results = "";

  $scope.CheckEdit = function() {
    if (sessionStorage.editDataRequest == "true") { // If the session storage contains an store.
      sessionStorage.editDataRequest = "false"; // Clear the session storage variables used for the edit button.
      $scope.updateStoreData.storeID = sessionStorage.editDataStoreStoreID; // Update the form to contain the correct values.
      $scope.updateStoreData.name = sessionStorage.editDataStoreName;
      $scope.updateStoreData.address = sessionStorage.editDataStoreAddress;
      $scope.updateStoreData.phoneNumber = sessionStorage.editDataStorePhoneNumber;
    }
  }

  $scope.UpdateStore = function() {

    var request = $http({
      method: "post",
      url: "app/components/stores/update/updateStore.php",
      data: {
        storeID: $scope.updateStoreData.storeID,
        name: $scope.updateStoreData.name,
        address: $scope.updateStoreData.address,
        phoneNumber: $scope.updateStoreData.phoneNumber
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      if (response.data.updateSuccess) {
        $scope.info = "An existing store has been updated. Store ID: " + response.data.storeID;
        $scope.updateStoreData.storeID = "";
        $scope.updateStoreData.name = "";
        $scope.updateStoreData.address = "";
        $scope.updateStoreData.phoneNumber = "";
      } else {
        $scope.info = " - Could not update store.";
      }
    });
  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons

  $scope.CheckEdit(); // Call the CheckEdit function to see if there is an store that has been editted.
}]);