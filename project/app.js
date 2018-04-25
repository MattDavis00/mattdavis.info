var app = angular.module("project-app", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider
    ///////////////////////// General ////////////////////////////

    .when("/", {
      templateUrl: "project/components/landing/landingView.html",
      controller: "landingCtrl"
    })

    ///////////////////////// Otherwise, Redirect To Login ////////////////////////////
    .otherwise({
      redirectTo: "/"
    })
});