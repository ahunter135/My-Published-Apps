// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

  .run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      window.localStorage.setItem("username", "phil");
      window.localStorage.setItem("password", "phil");
      var time = new Date();
      if (time.getUTCHours() == 12) {
        // Turn screen on
        cordova.plugins.backgroundMode.wakeUp();
        // Turn screen on and show app even locked
        cordova.plugins.backgroundMode.unlock();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      })

      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .state('survey', {
        url: '/survey',
        templateUrl: 'templates/survey1.html',
        controller: 'surveyCtrl'
      })

    $urlRouterProvider.otherwise('/home');
  })
