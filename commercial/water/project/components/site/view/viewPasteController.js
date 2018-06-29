angular.module("project-app").controller("viewPasteCtrl", ["$scope", "$http", "sharedFunctions", "$filter", "localVariables", "$location", function($scope, $http, sharedFunctions, $filter, localVariables, $location) {

  $scope.Modal = {};
  $scope.pastebinData = {};
  $scope.results = "";

  $scope.ViewPaste = function() {

    var sharingURI = $location.path().substring(6);

    //////////////View Request//////////////

    var request = $http({
      method: "post",
      url: "project/components/pastebin/view/viewPaste.php",
      data: {
        charID: sharingURI
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    request.then(function(response) {
      var serverResponse = angular.fromJson(response.data);

      if (serverResponse.executionErrorFlag) { // Server could not insert
        sharedFunctions.Prompt("error", serverResponse.executionError);
      } else if (serverResponse.fetchSuccess) {
        $scope.pastebinData.code = serverResponse.data.code;
        setTimeout(function() {
          $scope.formatCode();
        }, 1);
      } else {
        sharedFunctions.Prompt("warning", "Unexpected response.");
      }

    });



  }

  $scope.formatCode = function() {
    $("#pastebin-code-view").removeClass("prettyprinted");
    PR.prettyPrint();
  }

  $scope.sharedFunctions = sharedFunctions;

  // $scope.ViewPaste();

  $scope.ShowPasteHistory = function() {

    if (sessionStorage.loggedIn === "true") {
      $('#pasteHistoryModal').modal('show');

      var request = $http({
        method: "post",
        url: "project/components/pastebin/history.php",
        data: {},
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      request.then(function(response) {
        var serverResponse = angular.fromJson(response.data);

        if (serverResponse.executionErrorFlag) { // Server could not insert
          sharedFunctions.Prompt("error", serverResponse.executionError);
        } else if (serverResponse.fetchSuccess) {

          $scope.temp = $filter('orderBy')(serverResponse.data.history, 'creationTime', true); // Filter by column.
          $scope.pastebinData.history = $scope.temp;

        } else {
          sharedFunctions.Prompt("warning", "Unexpected response.");
        }

      });
    } else {
      sharedFunctions.Prompt("error", "You are not logged in. Please log in to view paste history. ");
    }

  }

  $scope.ViewHistoricalPaste = function(charID) {
    $('#pasteHistoryModal').modal('hide');
    $('#pasteHistoryModal').on('hidden.bs.modal', function(e) {
      window.location.href = '#!/site/' + charID;
    })
  }

  $scope.NewPaste = function() {
    if (sessionStorage.loggedIn === "true") {
      window.location.href = '#!pastebin';
    } else {
      sharedFunctions.Prompt("error", "You are not logged in. Please log in to create a new paste. ");
    }
  }

  var trace1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    y: [43, 42, 33, 36, 52, 43, 47, 48, 46, 59, 53, 34, 47, 39, 47, 46, 60, 40, 50, 34, 27, 29, 40, 42, 29, 42, 47, 33, 43, 49, 42, 33, 33, 45, 46, 26, 57, 41, 28, 51, 32, 46, 45, 58, 36, 54, 29, 41, 32, 38, 38, 26, 54, 53, 43, 35, 56, 30, 33, 54, 51, 42, 26, 49, 31, 48, 32, 36, 44, 59, 56, 31, 56, 35, 43, 29, 31, 52, 58, 44, 60, 28, 39, 41, 28, 25, 44, 26, 57, 47, 60, 59, 44, 36, 25, 44, 57, 46, 46, 36],
    type: 'scatter',
    name: 'Floor 50'
  };
  var trace2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],
    y: [47, 45, 41, 59, 51, 27, 32, 47, 33, 47, 46, 31, 37, 47, 25, 39, 33, 46, 53, 38, 42, 55, 52, 53, 28, 38, 46, 41, 54, 42, 37, 54, 27, 49, 54, 45, 54, 44, 38, 37, 30, 45, 46, 32, 53, 37, 31, 48, 45, 53, 29, 60, 29, 36, 46, 45, 58, 58, 60, 32, 31, 25, 33, 60, 40, 59, 26, 53, 26, 51, 32, 30, 33, 43, 27, 37, 33, 34, 40, 29, 26, 35, 51, 47, 29, 32, 28, 34, 48, 28, 45, 50, 45, 40, 54, 50, 30, 45, 53, 43],
    type: 'scatter',
    name: 'Floor 51'
  };
  var safety = {
    x: [1, 100],
    y: [30, 30],
    type: 'scatter',
    name: 'Safety Temperature',
    line: {
      dash: 'dot',
      color: '#f0506e',
      width: 3
    }
  };
  var layout = {
    margin: {
      l: 50,
      r: 30,
      b: 30,
      t: 30,
      pad: 4
    },
    paper_bgcolor: "#e6e6e6",
    plot_bgcolor: "#e6e6e6"
  }
  var data = [trace1, trace2, safety];
  Plotly.newPlot('myDiv', data, layout);
  $('.modebar').hide();

  window.onresize = function() {
    Plotly.Plots.resize('myDiv');
  };

}]);