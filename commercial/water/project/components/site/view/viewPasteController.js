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
    x: [1, 2, 3, 4, 5],
    y: [10, 15, 13, 17, 12],
    type: 'scatter',
    name: 'Floor 50'
  };
  var trace2 = {
    x: [1, 2, 3, 4, 5],
    y: [16, 10, 11, 9, 14],
    type: 'scatter',
    name: 'Floor 51'
  };
  var safety = {
    x: [1, 5],
    y: [10, 10],
    type: 'scatter',
    name: 'Safety Temperature',
    line: {
      dash: 'dot',
      color: '#f0506e',
      width: 3
    }
  };
  var data = [trace1, trace2, safety];
  Plotly.newPlot('myDiv', data);
  $('.modebar').hide();

  window.onresize = function() {
    Plotly.Plots.resize('myDiv');
  };

}]);