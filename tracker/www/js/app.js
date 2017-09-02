angular.module('App', ['ionic', 'ngCordova', 'ion-floating-menu', 'ionic-numberpicker', 'ionic-timepicker', 'onezone-datepicker', 'jett.ionic.filter.bar', 'ionic-datepicker', 'ionic-numberpicker'])
  .run(function($ionicPlatform, $rootScope, $ionicPopup, $ionicLoading, $http, $cordovaAdMob) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      //StatusBar.backgroundColorByHexString('#8a6de9');
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required


      }

    });
    $rootScope.removedAds = true;
    //window.localStorage.removeItem("badges");
    //window.localStorage.removeItem("weights");
    //window.localStorage.removeItem("highlights");
    //window.localStorage.removeItem("users");
    //window.localStorage.removeItem("journalEntry");
    //window.localStorage.removeItem("text");
    //window.localStorage.removeItem("loggedIn");
    //window.localStorage.setItem("upgraded", false);
    //window.localStorage.removeItem("timer");
    //window.localStorage.setItem("upgraded", true);

    if (ionic.Platform.platform() == "android") {
      $rootScope.isIOS = false;
      if (window.localStorage.getItem("upgraded") != undefined) {
        $rootScope.upgraded = true;
        window.localStorage.setItem("upgr", $rootScope.upgraded);
        if (window.localStorage.getItem("loggedIn") != null || window.localStorage.getItem("loggedIn") != null) {
          $rootScope.rootAccount = JSON.parse(window.localStorage.getItem("account"));
          var account = {
            username: $rootScope.rootAccount.username,
            password: $rootScope.rootAccount.password,
            email: $rootScope.rootAccount.email,
            fullName: $rootScope.rootAccount.fullName,
            backup: {
              text: JSON.parse(window.localStorage.getItem("text")),
              journal: JSON.parse(window.localStorage.getItem("journalEntry"))
            }
          }
          $ionicLoading.show();
          $http.post("https://hidden-stream-54770.herokuapp.com/backup", {
            name: $rootScope.rootAccount.fullName,
            username: $rootScope.rootAccount.username.toLowerCase(),
            email: $rootScope.rootAccount.email,
            password: $rootScope.rootAccount.password,
            backup: account.backup
          }).then(function(response) {
            $ionicLoading.hide();
            if (response.data == true) {

            } else {

            }
          })
        }
      } else {
        $rootScope.upgraded = false;
        window.localStorage.setItem("upgr", $rootScope.upgraded);
      }
    } else if (ionic.Platform.platform() == "ios") {
      $rootScope.isIOS = true;
      $rootScope.upgraded = true;
    }
    if (window.localStorage.getItem("upgradePrompt") == undefined) {
      if (ionic.Platform.platform() == "android") {
        var alertPopup = $ionicPopup.alert({
          title: 'Upgrade',
          template: 'You can now upgrade to the pro version of the app. 30% of all purchases are donated.'
        });

        alertPopup.then(function(res) {
          window.localStorage.setItem("upgradePrompt", true);
        });
      } else if (ionic.Platform.platform() == "ios") {

      }

    }
    $rootScope.userArray = {
      name: [],
      items: [],
      count: 1,
      image: "",
      journal: []
    };
    var user = {
      name: "User 1",
      role: "Owner",
      id: 1,
      image: 'profile.png',
      items: [],
      journal: []
    }
    $rootScope.userArray.name.push(user);
    if (window.localStorage.getItem("text") != null) {
      var temp = window.localStorage.getItem("text");
      $rootScope.text = JSON.parse(temp);
      $rootScope.userArray.name[0].items.push($rootScope.text);
    }
    if (window.localStorage.getItem("journalEntry") != null) {
      var temp = window.localStorage.getItem("journalEntry");
      $rootScope.entryArray = JSON.parse(temp);
      $rootScope.userArray.name[0].journal.push($rootScope.entryArray);
      console.log($rootScope.entryArray);
    }
    var login = window.localStorage.getItem("loggedIn");
    if (login == "true") {
      $rootScope.rootAccount = JSON.parse(window.localStorage.getItem("account"));
      console.log($rootScope.rootAccount);
    }
    window.localStorage.setItem("users", JSON.stringify($rootScope.userArray));

    $rootScope.currentUser = 1;
  })
  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, ionicTimePickerProvider) {
    var timePickerObj = {
      inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
      format: 12,
      step: 1,
      setLabel: 'Set',
      closeLabel: 'Close'
    };
    ionicTimePickerProvider.configTimePicker(timePickerObj);

    $ionicConfigProvider.views.maxCache(0);
    $stateProvider

      .state('app', {
        url: '/app',
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
          }
        }
      })

      .state('app.journal', {
        url: '/journal',
        views: {
          'menuContent': {
            templateUrl: 'templates/journalList.html'
          }
        }
      })
      .state('app.weight', {
        url: '/weight',
        views: {
          'menuContent': {
            templateUrl: 'templates/weight.html'
          }
        }
      })

      .state('app.account', {
        url: '/account',
        views: {
          'menuContent': {
            templateUrl: 'templates/account.html'
          }
        }
      })

      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html'
          }
        }
      })
    /*
          .state('app.purchase', {
            url: '/purchase',
            views: {
              'menuContent': {
                templateUrl: 'templates/purchase.html'
              }
            }
          })
          */
    $urlRouterProvider.otherwise('/app/home');
  })
