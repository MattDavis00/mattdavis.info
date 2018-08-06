angular.module("project-app").controller("taskManagerCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", function($scope, $http, sharedFunctions, $filter, localVariables) {

  $scope.Modal = {};
  $scope.taskData = {};
  $scope.results = "";

  $scope.pillData = [{
      class: "badge-primary",
      text: "New"
    },
    {
      class: "badge-secondary",
      text: "Uni"
    },
    {
      class: "badge-success",
      text: "Work"
    },
    {
      class: "badge-danger",
      text: "ASAP"
    },
    {
      class: "badge-warning",
      text: "Important"
    },
    {
      class: "badge-info",
      text: "Taxes"
    },
    {
      class: "badge-light",
      text: "Today"
    },
    {
      class: "badge-dark",
      text: "Comp Sci"
    }
  ];

  $scope.tempPillData = angular.copy($scope.pillData);

  $scope.taskArray = [{
      title: "Further Maths Sucks",
      description: "This is a really heart felt description about how Further Maths is really bad.",
      tags: [0, 2, 4]
    },
    {
      title: "Computer Science Is Alright",
      description: "Another description right here!",
      tags: [1, 5]
    },
    {
      title: "Maths Was Great",
      description: "Townshend saved our souls, thank you.",
      tags: [3, 6, 7]
    }
  ];

  $scope.sharedFunctions = sharedFunctions;

}]);