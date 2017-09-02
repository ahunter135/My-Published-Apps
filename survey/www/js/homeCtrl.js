angular.module('starter')
angular.module('starter')

  .controller("homeCtrl", function($scope, $rootScope, $ionicModal, $http, $state, $ionicSlideBoxDelegate, $timeout) {
    $rootScope.surveyTitle = "Customer Satisfaction Survey";
    $rootScope.surveySubtitle = "Please take a moment to fill out this survey";
    $scope.referral = {
      data: ""
    };
    $rootScope.referralYN = true;
    window.clearTimeout($rootScope.timeoutWindow);

    $scope.startSurvey = function(item) {
      $rootScope.refKey = item;
      $rootScope.refKey = "";
      $scope.referral.data = "";
      $state.go("survey");
    }
    $rootScope.title = window.localStorage.getItem("bank");
    $scope.loginData = {
      username: undefined,
      password: undefined
    };
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/editSurvey.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.editModal = modal;
    });
    $scope.openLoginModal = function() {
      $scope.modal.show();
    };
    $scope.closeLoginModal = function() {
      $scope.modal.hide();
      $scope.modal.remove();
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
    };
    $scope.openEditModal = function() {
      $scope.editModal.show();
    }
    $scope.closeEditModal = function() {
      $scope.editModal.hide();
      $scope.editModal.remove();
      $ionicModal.fromTemplateUrl('templates/editSurvey.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.editModal = modal;
      });
    }
    $scope.showLogin = function() {
      $scope.openLoginModal();
    }
    $scope.doLogin = function() {
      var user = window.localStorage.getItem("username");
      var pass = window.localStorage.getItem("password");
      if (user.toLowerCase() == $scope.loginData.username && pass.toLowerCase() == $scope.loginData.password) {
        $scope.closeLoginModal();
        $scope.openEditModal();
      } else {
        alert("Incorrect Username/Password");
        $scope.loginData.username = undefined;
        $scope.loginData.password = undefined;
      }
      $scope.loginData.username = undefined;
      $scope.loginData.password = undefined;
    }
    $scope.submitEdit = function(title) {
      $rootScope.title = title;
      window.localStorage.setItem("bank", $rootScope.title);
      $scope.closeEditModal();
    }
  })
