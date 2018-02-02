angular.module("my-app").controller("searchUserCtrl", ["$scope", "$http", "authCheck", "$filter", function($scope, $http, authCheck, $filter) {

  authCheck.Admin();
  authCheck.Init();
  $scope.searchUserData = {};
  $scope.results = "";

  $scope.sortType = 'userID'; // Set the default sort type
  $scope.sortReverse = false; // Set the default sort order
  $scope.usersPerPage = 10; // Set the default amount of users per page.
  $scope.sortPage = 0; // Set the default page number.
  $scope.numberOfPages = 1; // Sets the default page count
  $scope.amountOfUsers = 1;

  $scope.ClearUser = function() {
    $scope.searchUserData.search = "";
  }

  $scope.SearchUser = function() {
    var request = $http({
      method: "post",
      url: "app/components/credentials/search/searchUser.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      $scope.users = response.data.selectData;
      $scope.permUsers = $scope.users;
      $scope.amountOfUsers = $scope.users.length;
    });
  }

  $scope.EditUser = function(user) {

    // Save the object locally on the user's machine using session storage.
    sessionStorage.editDataUserUserID = user.userID;
    sessionStorage.editDataUserStoreID = user.storeID;
    sessionStorage.editDataUserFirstName = user.firstName;
    sessionStorage.editDataUserLastName = user.lastName;
    sessionStorage.editDataRequest = "true"; // State that a request is being made.
    window.location.href = '#!credentials-update'; // Redirect the user to the update user view.

  }
  $(".authenticated-nav-elements").hide(); // Ensure that normal user icons are hidden.
  $(".authenticated-nav-elements-administrator").show(); // Show the top-nav and side-nav administrator icons

  $scope.SearchUser();

  $scope.$watch('[searchUserData.search, sortType, sortReverse, permUsers, usersPerPage, sortPage]', function() { // Order and filter the users displayed to the user, limit the results to 10 users.
    if ($scope.permUsers != null) { // This function is called on load and every time a variable is changed, to prevent this code causing an error whilst waiting for the post request, this stops the code running on load.
      $scope.temp = $filter('filter')($scope.permUsers, $scope.searchUserData.search); // Filter the search query in the search bar.
      $scope.amountOfUsers = $scope.temp.length; // Save the amount of users to a variable.
      $scope.numberOfPages = Math.floor(($scope.amountOfUsers - 1) / $scope.usersPerPage);
      $scope.temp = $filter('orderBy')($scope.temp, $scope.sortType, $scope.sortReverse); // Filter by column.
      $scope.temp = $filter('limitTo')($scope.temp, $scope.usersPerPage, $scope.sortPage * $scope.usersPerPage); // Limit to x per page, and start on page number * x;
      $scope.users = $scope.temp;
    }
  });

  $scope.NextPage = function() {
    $scope.numberOfPages = Math.floor(($scope.amountOfUsers - 1) / $scope.usersPerPage);
    if ($scope.numberOfPages > $scope.sortPage) { // Check if the page is the last page, if not then increment the page number.
      $scope.sortPage++;
    }
  }

  $scope.PreviousPage = function() {
    if ($scope.sortPage > 0) { // Check if the page is the first page, if not then decrease the page number by 1.
      $scope.sortPage--;
    }
  }

}]);