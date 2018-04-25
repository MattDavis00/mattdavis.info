angular.module("project-app").controller("landingCtrl", ["$scope", "$http", function($scope, $http) {

  // $scope.loginData = {};
  // $scope.results = "";
  //
  // $scope.processLogin = function() {
  //
  //   var request = $http({
  //     method: "post",
  //     url: "app/components/login/login.php",
  //     data: {
  //       id: $scope.loginData.id,
  //       password: $scope.loginData.password
  //     },
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     }
  //   });
  //
  //   request.then(function(response) {
  //     var returnData = angular.fromJson(response.data);
  //
  //     sessionStorage.userID = returnData.userID;
  //     sessionStorage.storeID = returnData.storeID;
  //     sessionStorage.orgID = returnData.orgID;
  //     sessionStorage.administrator = returnData.administrator;
  //     sessionStorage.loggedIn = returnData.loggedIn;
  //
  //     if (returnData.verification) {
  //       if (returnData.administrator) {
  //         sessionStorage.storeID = "Administrator";
  //         if (returnData.orgID === null) {
  //           window.location.href = '#!organisation'; // If the administrator is not part of an organisation, take them to the organisation view.
  //         } else {
  //           window.location.href = '#!credentials-search'; // Upon successful admin login, user is redirected to the query page.
  //         }
  //       } else {
  //         window.location.href = '#!query-search'; // Upon successful user login, user is redirected to the query page.
  //       }
  //     }
  //     $scope.info = " - processLogin() function ran!";
  //   });
  // }

  particlesJS.load('background-animation', 'particles.json');

  $scope.SwitchLoginRegister = function() {
    $('#loginModal').modal('toggle');
    $('#registerModal').modal('toggle');
  }

}]);