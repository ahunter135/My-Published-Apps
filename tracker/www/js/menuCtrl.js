angular.module('App')

  .controller("menuCtrl", function($ionicFilterBar, $scope, $rootScope, $ionicModal, $state, $cordovaInAppBrowser) {
    $rootScope.titleMenu = "Directory";
    $rootScope.journalDelete = false;
    $rootScope.journalAdd = false;
    if ($state.current.url == '/journal') {
      $rootScope.titleMenu = 'Journal';
    } else {
      $rootScope.titleMenu = 'Directory';
    }
    $scope.showSearchBar = function() {
      $ionicFilterBar.show({
        items: $rootScope.text,
        update: function(filteredItems) {
          $rootScope.text = filteredItems
        }
      });
    }

    $scope.upgrade = function() {
      $rootScope.prepareIAP();
    }

    $scope.restorePurchase = function() {
      window.inAppPurchase
        .restorePurchases()
        .then(function(purchases) {
          console.log(JSON.stringify(purchases));
          window.localStorage.setItem("upgraded", true);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
