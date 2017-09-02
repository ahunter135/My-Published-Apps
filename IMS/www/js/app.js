// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ion-floating-menu', 'jett.ionic.filter.bar', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $ionicPopup, $cordovaInAppBrowser) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    var admobid = {};

// select the right Ad Id according to platform

if( /(android)/i.test(navigator.userAgent) ) {
    admobid = { // for Android
        banner: 'ca-app-pub-6169385283820064/4507346915',
        interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6169385283820064/4507346915',
        interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6169385283820064/4507346915',
        interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/NNNNNNNNNN'
    };
}

if(window.AdMob) AdMob.createBanner( {
  adId:admobid.banner,
  isTesting: false,
  position:AdMob.AD_POSITION.BOTTOM_CENTER,
  autoShow:true} );

    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

    var confirmPopup = $ionicPopup.confirm({
        title: 'Want to rate this app?',
        template: 'I am interested in what you think about this app. What should be added? Why did you download it?'
     });

     confirmPopup.then(function(res) {
        if(res) {
           $cordovaInAppBrowser.open('https://play.google.com/store/apps/details?id=com.austinhunter.IMS', '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      });


    //$cordovaInAppBrowser.close();
        } else {
           console.log('Close');
        }
     });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
