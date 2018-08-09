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

  $scope.NewTask = function() {

    var errorWithInput = false;

    // Check the title field is not empty and does not exceed 50 characters.
    if (sharedFunctions.Validation.LengthAndEmpty("#task-title", $scope.taskData.title, 50)) {
      errorWithInput = true;
    }

    // Check that the description field does not exceed the maximum amount of characters, this is allowed to be left empty for convenience.
    if (sharedFunctions.Validation.Length("#task-description", $scope.taskData.description, 1000)) {
      errorWithInput = true;
    }


    ////////////// New Task Request //////////////

    if (!errorWithInput) {

      var request = $http({
        method: "post",
        url: "project/components/taskManager/newTask.php",
        data: {
          title: {
            data: $scope.taskData.title,
            field: "#task-title"
          },
          description: {
            data: $scope.taskData.description,
            field: "#task-description"
          }
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      // Take return error/success information. Based off of this either produce an error or success prompt.

      request.then(function(response) {
        var serverResponse = angular.fromJson(response.data);

        if (serverResponse.errorFlag) // There were errors found
        {
          var fields = ["#task-title", "#task-description"];
          for (var i = 0; i < fields.length; i++) {
            sharedFunctions.Validation.RemoveErrorTooltip(fields[i]);
          }

          for (var i = 0; i < serverResponse.errorReport.length; i++) {
            sharedFunctions.Validation.ErrorTooltip(serverResponse.errorReport[i].field, serverResponse.errorReport[i].errorMessage);
          }
        } else if (serverResponse.executionErrorFlag) { // Server could not insert
          sharedFunctions.Prompt("error", serverResponse.executionError);
        } else {
          sharedFunctions.Prompt("success", "New task created!");
        }

      });

    }

  }

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