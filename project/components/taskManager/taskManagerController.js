angular.module("project-app").controller("taskManagerCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", function($scope, $http, sharedFunctions, $filter, localVariables) {

  $scope.Modal = {};
  $scope.taskData = {};
  $scope.results = "";

  $scope.pillData = [{
      class: "badge-primary",
      text: "Tag 1"
    },
    {
      class: "badge-success",
      text: "Tag 2"
    },
    {
      class: "badge-danger",
      text: "Tag 3"
    },
    {
      class: "badge-warning",
      text: "Tag 4"
    },
    {
      class: "badge-info",
      text: "Tag 5"
    },
    {
      class: "badge-light",
      text: "Tag 6"
    },
    {
      class: "badge-secondary",
      text: "Tag 7"
    },
    {
      class: "badge-dark",
      text: "Tag 8"
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

  $scope.AddPill = function(task, index) {
    if ($.inArray(index, task.tags) === -1) {
      task.tags.push(index);
    }
  }

  $scope.RemovePill = function(task, tagID) {

    var index = task.indexOf(tagID);

    if (index > -1) {
      task.splice(index, 1);
    }

  }

  $scope.sharedFunctions = sharedFunctions;

}]);