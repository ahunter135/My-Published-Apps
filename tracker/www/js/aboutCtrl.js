angular.module('App')

.controller("aboutCtrl", function($scope, $rootScope, ionicDatePicker, $state, $ionicLoading) {
  $rootScope.titleMenu = "About";
  $rootScope.showSearch = false;
  $rootScope.journalDelete = false;
  $rootScope.journalAdd = false;

  $scope.restorePurchase = function() {
    $ionicLoading.show();
    window.inAppPurchase
      .restorePurchases()
      .then(function (purchases) {
        if (purchases.state == 0) {
          window.localStorage.setItem("upgraded", true);
          window.location.reload();
        }
        $ionicLoading.hide();
        console.log(JSON.stringify(purchases));
        $ionicPopup.alert({
          title: 'Restore was successful!',
          template: 'All data was restored.'
        });
      })
      .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: 'Something went wrong',
          template: 'Check your console log for the error details'
        });
      });
  }
})
