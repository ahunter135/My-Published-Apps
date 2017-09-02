angular.module('App')

  .controller("settingsCtrl", function($rootScope, $scope, $state, $ionicActionSheet, $ionicModal, $cordovaCamera, $ionicHistory) {
    $scope.titleMenu = "Settings";
    $ionicModal.fromTemplateUrl('templates/addUser.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.addModal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/editUser.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.editModal = modal;
    });

    $scope.openAddModal = function() {
      $scope.addModal.show();
    };
    $scope.closeAddModal = function() {
      $scope.addModal.hide();
    };
    $scope.openEditModal = function() {
      $scope.editModal.show();
    };
    $scope.closeEditModal = function() {
      $scope.editModal.hide();
    };

    $scope.image = "profile.png";
    $rootScope.editingUser = {
      is: false,
      item: undefined
    }

    $scope.myEvent = function() {
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: 'Add User'
        }],
        //destructiveText: 'Delete',
        titleText: 'Options',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
          hideSheet();
        },
        buttonClicked: function(index) {
          hideSheet();
          $scope.editing = false;
          $scope.openAddModal();
        }
      });
    }

    $scope.editUser = function(item) {
      $scope.userName = item.name;
      $scope.role = item.role;
      $scope.pickedUserID = item.id;
      $scope.pickedUser = item;
      $rootScope.editingUser = {
        is: true,
        item: item
      }
      $scope.openEditModal();
    }
    $scope.submit = function(username, role) {
        console.log($rootScope.userArray.name);
        console.log($rootScope.editingUser.is);
      var user = {
        name: username,
        role: role,
        id: $scope.userArray.count + 1,
        items: [],
        image: $scope.image
      }
      if ($rootScope.editingUser.is == false) {
        $rootScope.userArray.name.push(user);
        $rootScope.userArray.count++;
        for (var i = 0; i < $rootScope.userArray.name.length; i++) {
          if ($rootScope.userArray.name[i].id == $scope.pickedUserID) {
            $rootScope.userArray.name[i].name = username;
            $rootScope.userArray.name[i].role = role;
            window.localStorage.setItem("users", JSON.stringify($rootScope.userArray));
          }
        }
      } else {
        var index = $rootScope.userArray.name.indexOf($scope.editing.item);
        $rootScope.userArray.name.splice(index, 1);
        $rootScope.userArray.name.push(user);
        for (var i = 0; i < $rootScope.userArray.name.length; i++) {
          if ($rootScope.userArray.name[i].id == $scope.pickedUserID) {
            $rootScope.userArray.name[i].name = username;
            $rootScope.userArray.name[i].role = role;
            window.localStorage.setItem("users", JSON.stringify($rootScope.userArray));
          }
        }
      }
      $rootScope.editing = {
        is: false,
        item: undefined
      };
      $scope.userName = "";
      $scope.role = "";
      $scope.image = "";
      $scope.closeAddModal();
      $scope.closeEditModal();
    }
    $scope.takePhoto = function() {
      alert("Feature Coming Soon");
      /*
      navigator.camera.getPicture(onSuccess, onFail, {
        sourceType: Camera.PictureSourceType.CAMERA,
        quality: 80,
        targetWidth: 300,
        targetHeight: 300,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.PNG,
        saveToPhotoAlbum: false
      });

      function onSuccess(imageData) {
        $scope.imageData = imageData
      }

      function onFail(message) {
        if (appConstants.debug) {
          alert('Failed because: ' + message);
        }
      }
      */
    }
    $scope.deleteUser = function(username) {
      if ($rootScope.userArray.name.length > 1) {
        for (var i = 0; i < $rootScope.userArray.name.length; i++) {
          if ($rootScope.userArray.name[i].name == username) {
            $rootScope.userArray.name.splice(i, 1);
            $rootScope.userArray.count--;
            console.log($rootScope.userArray.name);
            window.localStorage.setItem("users", JSON.stringify($rootScope.userArray));
            $scope.closeEditModal();
          }
        }
      } else {
        window.plugins.toast.showWithOptions({
            message: "Can't Delete All Users",
            duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
            position: "bottom",
            addPixelsY: -40 // added a negative value to move it up a bit (default 0)
          },
          onSuccess, // optional
          onError // optional
        );
      }
    }
    $scope.changeUser = function(user) {
      $rootScope.currentUser = user.id;
      $rootScope.text = $rootScope.userArray.items[($rootScope.currentUser - 1)];
      if ($rootScope.text == undefined) {
        $rootScope.text = [];
      }
      window.plugins.toast.showWithOptions({
          message: "Changed User",
          duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
          position: "bottom",
          addPixelsY: -40 // added a negative value to move it up a bit (default 0)
        },
        onSuccess, // optional
        onError // optional
      );
    }
  })
