app = angular.module("project-app", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider

    ///////////////////////// General ////////////////////////////
    .when("/", {
      templateUrl: "project/components/landing/landingView.html",
      controller: "landingCtrl"
    })
    .when("/dashboard", {
      templateUrl: "project/components/dashboard/dashboardView.html",
      controller: "dashboardCtrl"
    })

    ///////////////////////// Otherwise, Redirect To Login ////////////////////////////
    .otherwise({
      redirectTo: "/"
    })

});

app.service('sharedFunctions', function() {

  $('#alert-prompt').collapse({
    toggle: false
  })

  this.Prompt = function(type, value) {

    var alertClass = "";

    if (type === "success") {
      alertClass = "alert-success";
    } else if (type === "error") {
      alertClass = "alert-danger";
    } else if (type === "warning") {
      alertClass = "alert-warning";
    } else if (type === "info") {
      alertClass = "alert-primary";
    } else {
      alertClass = "alert-primary";
    }

    $("#alert-prompt-data").addClass(alertClass);
    $("#alert-prompt-data").text(value);
    $('#alert-prompt').collapse('show');

    setTimeout(function() {
      $('#alert-prompt').collapse('hide');
      $("#alert-prompt-data").text("");
      $("#alert-prompt-data").removeClass(alertClass);
    }, 5000);

  }

  this.AuthenticateUser = function() {

    if (!sessionStorage.loggedIn) {
      $("#alert-prompt-data").addClass("alert-danger");
      $("#alert-prompt-data").text("You are not logged in! Returning to landing page in 5 seconds...");
      $('#alert-prompt').collapse('show');

      setTimeout(function() {
        $('#alert-prompt').collapse('hide');
        $("#alert-prompt-data").text("");
        $("#alert-prompt-data").removeClass("alert-danger");
        window.location.href = '#!';
      }, 5000);
    }

  }

  this.Validation = {};

  this.Validation.Email = function(element, email) {
    var returnData = {};
    returnData.errorFlag = false;
    returnData.errors = "";

    self.Validation.RemoveErrorTooltip(element);

    if (!(email)) {
      returnData.errorFlag = true;
      returnData.errors += "Please enter your email. ";
    } else {
      if (!(email.length > 0)) {
        returnData.errorFlag = true;
        returnData.errors += "Please enter your email. ";
      }

      if (email.length > 100) {
        returnData.errorFlag = true;
        returnData.errors += "Email exceeds 100 characters. ";
      }

      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email))) {
        returnData.errorFlag = true;
        returnData.errors += "Email is not valid. ";
      }
    }

    if (returnData.errorFlag) {
      self.Validation.ErrorTooltip(element, returnData.errors);
    }

    return returnData.errorFlag;

  }

  this.Validation.Name = function(element, name) {
    var returnData = {};
    returnData.errorFlag = false;
    returnData.errors = "";

    self.Validation.RemoveErrorTooltip(element);

    if (!(name)) {
      returnData.errorFlag = true;
      returnData.errors += "Please enter your name. ";
    } else {
      if (!(name.length > 0)) {
        returnData.errorFlag = true;
        returnData.errors += "Please enter your name. ";
      }

      if (name.length > 50) {
        returnData.errorFlag = true;
        returnData.errors += "Name exceeds 50 characters. ";
      }
    }

    if (returnData.errorFlag) {
      self.Validation.ErrorTooltip(element, returnData.errors);
    }

    return returnData.errorFlag;

  }

  this.Validation.Password = function(element, element2, password, passwordRepeat) {
    var returnData = {};
    returnData.errorFlag = false;
    returnData.errors = "";

    self.Validation.RemoveErrorTooltip(element);
    self.Validation.RemoveErrorTooltip(element2);

    if (!(password)) {
      returnData.errorFlag = true;
      returnData.errors += "Please enter a password. ";
    } else {
      if (!(password.length >= 8)) {
        returnData.errorFlag = true;
        returnData.errors += "Your password must be atleast 8 characters long. ";
      }

      if (password !== passwordRepeat) {
        returnData.errorFlag = true;
        returnData.errors += "Passwords do not match. ";
      }
    }

    if (returnData.errorFlag) {
      self.Validation.ErrorTooltip(element, returnData.errors);
      $(element2).addClass("error-border");
    }

    return returnData.errorFlag;

  }

  this.Validation.Empty = function(element, value) {
    var returnData = {};
    returnData.errorFlag = false;
    returnData.errors = "";

    self.Validation.RemoveErrorTooltip(element);

    if (!(value)) {
      returnData.errorFlag = true;
      returnData.errors += "Please fill in this field. ";
    } else {
      if (!(value.length > 0)) {
        returnData.errorFlag = true;
        returnData.errors += "Please fill in this field. ";
      }
    }

    if (returnData.errorFlag) {
      self.Validation.ErrorTooltip(element, returnData.errors);
    }

    return returnData.errorFlag;

  }

  this.Validation.ErrorTooltip = function(element, errors) {
    $(element).removeClass("error-border");
    $(element).tooltip('dispose');
    $(element).tooltip({
      placement: 'top',
      title: errors
    });
    $(element).tooltip('show');
    $(element).addClass("error-border");
  }

  this.Validation.RemoveErrorTooltip = function(element) {
    $(element).removeClass("error-border");
    $(element).tooltip('dispose');
  }

  var self = this;

});


///// Local Variables /////

app.service('localVariables', function() {

  var storage = {};

  return {
    get_storage: function() {
      return storage;
    },
    set_storage: function(value) {
      userID = value;
    }
  };
});