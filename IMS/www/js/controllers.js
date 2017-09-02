angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $timeout, $ionicFilterBar, $cordovaFile, $rootScope, $cordovaEmailComposer) {

    $scope.showSearchBar = function() {
      $ionicFilterBar.show({
        items: $rootScope.equipment,
        update: function(filteredItems) {
          $rootScope.equipment = filteredItems
        }
      });
    }

    $scope.export = function() {
      var temp = $rootScope.equipment;
      for (var i = 0; i < temp.length; i++) {
        temp[i].image = "";
      }
      var jsonObject = JSON.stringify(temp);
      var finalCSV = $scope.convertToCSV(jsonObject);
      if (ionic.Platform.isIOS() == true) {
        $cordovaFile.writeFile(cordova.file.documentsDirectory, 'IMS.csv', finalCSV, true).then(function(result) {
          //ios path
        })
      } else {
        $cordovaFile.writeFile(cordova.file.externalRootDirectory, 'IMS.csv', finalCSV, true).then(function(result) {
          cordova.plugins.email.isAvailable(function(isAvailable) {

          });
          cordova.plugins.email.open({
            attachments: (cordova.file.externalRootDirectory + '/IMS.csv')
          });
        })
      }
    }

    $scope.openEmail = function() {
      cordova.plugins.email.isAvailable(
        function(isAvailable) {
          alert(isAvailable);
        }
      );
      cordova.plugins.email.open();
    }

    $scope.convertToCSV = function(objArray) {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';

      for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
        }
        str += line + '\r\n';
      }
      return str;
    }
  })

  .controller('HomeCtrl', function($scope, $stateParams, $ionicModal, $rootScope, $ionicActionSheet) {
    //window.localStorage.removeItem("equipment");
    $ionicModal.fromTemplateUrl('templates/addInventory.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.addModal = modal;
    });

    $scope.openAddModal = function() {
      $scope.addModal.show();
    };
    $scope.closeAddModal = function() {
      $scope.addModal.hide();
    };
    $scope.editing = {
      is: false,
      item: undefined
    }
    $rootScope.item = {
      itemName: undefined,
      serialNumber: undefined,
      modelName: undefined,
      vendor: undefined,
      image: undefined
    };
    //window.localStorage.removeItem("equipment");
    var temp = window.localStorage.getItem("equipment");
    $rootScope.equipment = JSON.parse(temp);
    if ($scope.equipment == null) $rootScope.equipment = [];
    $rootScope.equipment.sort(function(a, b) {
      var nameA = a.itemName.toLowerCase(),
        nameB = b.itemName.toLowerCase();
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0; //default return value (no sorting)
    });
    for (var i = 0; i < $rootScope.equipment.length; i++) {
      $rootScope.equipment[i].itemName = $rootScope.equipment[i].itemName.charAt(0).toUpperCase() + $rootScope.equipment[i].itemName.substr(1).toLowerCase();
    }

    $scope.myButtonEvent = function() {
      $scope.openAddModal();
    }
    $scope.submit = function() {
      if ($rootScope.item.itemName == undefined || $rootScope.item.serialNumber == undefined || $rootScope.item.modelName == undefined || $rootScope.item.vendor == undefined) {
        alert("Please fill out all forms");
      } else {
        if ($scope.editing.is != true) {
          $rootScope.equipment.push($rootScope.item);
          window.localStorage.setItem("equipment", JSON.stringify($rootScope.equipment));
          var temp = window.localStorage.getItem("equipment");
          $rootScope.equipment = JSON.parse(temp);
          $rootScope.equipment.sort(function(a, b) {
            var nameA = a.itemName.toLowerCase(),
              nameB = b.itemName.toLowerCase();
            if (nameA < nameB) //sort string ascending
              return -1;
            if (nameA > nameB)
              return 1;
            return 0; //default return value (no sorting)
          });
          for (var i = 0; i < $rootScope.equipment.length; i++) {
            $rootScope.equipment[i].itemName = $rootScope.equipment[i].itemName.charAt(0).toUpperCase() + $rootScope.equipment[i].itemName.substr(1).toLowerCase();
          }
          $rootScope.item = {
            itemName: undefined,
            serialNumber: undefined,
            modelName: undefined,
            vendor: undefined,
            image: undefined
          };
          $scope.closeAddModal();
          $scope.editing = {
            is: false,
            item: undefined
          }
        } else {
          var index = $rootScope.equipment.indexOf($scope.editing.item);
          $rootScope.equipment[index] = $rootScope.item;
          window.localStorage.setItem("equipment", JSON.stringify($rootScope.equipment));
          var temp = window.localStorage.getItem("equipment");
          $rootScope.equipment = JSON.parse(temp);
          $rootScope.equipment.sort(function(a, b) {
            var nameA = a.itemName.toLowerCase(),
              nameB = b.itemName.toLowerCase();
            if (nameA < nameB) //sort string ascending
              return -1;
            if (nameA > nameB)
              return 1;
            return 0; //default return value (no sorting)
          });
          for (var i = 0; i < $rootScope.equipment.length; i++) {
            $rootScope.equipment[i].itemName = $rootScope.equipment[i].itemName.charAt(0).toUpperCase() + $rootScope.equipment[i].itemName.substr(1).toLowerCase();
          }
          $rootScope.item = {
            itemName: undefined,
            serialNumber: undefined,
            modelName: undefined,
            vendor: undefined,
            image: undefined
          };
          $scope.closeAddModal();
        }
      }
    }
    $scope.addPhoto = function() {
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
            text: 'Take Photo'
          },
          {
            text: 'Photo Library'
          }
        ],
        cancelText: 'Cancel',
        cancel: function() {
          hideSheet();
        },
        buttonClicked: function(index) {
          if (index == 0) {
            hideSheet();
            navigator.camera.getPicture(onSuccess, onFail, {
              sourceType: Camera.PictureSourceType.CAMERA,
              quality: 100,
              targetWidth: 150,
              targetHeight: 150,
              destinationType: Camera.DestinationType.DATA_URL,
              encodingType: Camera.EncodingType.PNG,
              saveToPhotoAlbum: true,
              cameraDirection: 2
            });

            function onSuccess(imageData) {
              $rootScope.item.image = imageData;
            }

            function onFail(message) {
              if (appConstants.debug) {
                alert('Failed because: ' + message);
              }
            }
          } else if (index == 1) {
            hideSheet();
            navigator.camera.getPicture(onSuccess, onFail, {
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              quality: 100,
              targetWidth: 150,
              targetHeight: 150,
              destinationType: Camera.DestinationType.DATA_URL,
              encodingType: Camera.EncodingType.PNG,
              saveToPhotoAlbum: true,
              cameraDirection: 2
            });

            function onSuccess(imageData) {
              $rootScope.item.image = imageData;
            }

            function onFail(message) {
              if (appConstants.debug) {
                alert('Failed because: ' + message);
              }
            }
          }
        }
      });
    }

    $scope.equipDetails = function(item) {
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: 'Edit'
        }],
        titleText: 'Options',
        cancelText: 'Cancel',
        destructiveText: 'Delete',
        cancel: function() {
          hideSheet();
        },
        buttonClicked: function(index) {
          $scope.editing = {
            is: true,
            item: item
          }
          if (index == 0) {
            $rootScope.item = {
              itemName: item.itemName,
              serialNumber: item.serialNumber,
              modelName: item.modelName,
              vendor: item.vendor,
              image: item.image
            };
            $scope.openAddModal();
            hideSheet();
          }
        },
        destructiveButtonClicked: function() {
          var index = $rootScope.equipment.indexOf(item);
          $rootScope.equipment.splice(index, 1);
          window.localStorage.setItem("equipment", JSON.stringify($rootScope.equipment));
          var temp = window.localStorage.getItem("equipment");
          $rootScope.equipment = JSON.parse(temp);
          $rootScope.equipment.sort(function(a, b) {
            var nameA = a.itemName.toLowerCase(),
              nameB = b.itemName.toLowerCase();
            if (nameA < nameB) //sort string ascending
              return -1;
            if (nameA > nameB)
              return 1;
            return 0; //default return value (no sorting)
          });
          for (var i = 0; i < $rootScope.equipment.length; i++) {
            $rootScope.equipment[i].itemName = $rootScope.equipment[i].itemName.charAt(0).toUpperCase() + $rootScope.equipment[i].itemName.substr(1).toLowerCase();
          }
          hideSheet();
        }
      });
    }
  });
