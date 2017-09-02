angular.module('App')

  .controller("accountCtrl", function($scope, $rootScope, $ionicModal, $http, $ionicPopup, $ionicLoading) {
    $rootScope.titleMenu = "Account";
    $rootScope.showSearch = false;
    $rootScope.journalDelete = false;
    $rootScope.journalAdd = false;
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      if (window.localStorage.getItem("loggedIn") == undefined || window.localStorage.getItem("loggedIn") == "undefined") {
        $scope.openModal();
      }
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.login = function(username, password) {
      $scope.closeModal();
      $scope.modal.remove();
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $ionicLoading.show();
      $http.post("https://hidden-stream-54770.herokuapp.com/login", {
        username: username.toLowerCase(),
        password: password
      }).then(function(response) {
        $ionicLoading.hide();
        console.log(response.data);
        if (response.data == false) {
          //show incorrect password or username
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Incorrect Password/Username'
          });

          alertPopup.then(function(res) {
            // Custom functionality....
          });
        } else if (response.data) {
          //show login success
          console.log(response.data);
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("account", JSON.stringify(response.data))
          $rootScope.rootAccount = JSON.parse(window.localStorage.getItem("account"));
          window.localStorage.setItem("text", JSON.stringify(response.data.backup.text));
          window.localStorage.setItem("journalEntry", JSON.stringify(response.data.backup.journal));
          $scope.setAccount();
          var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: 'Login Success, Account Restored'
          });

          alertPopup.then(function(res) {
            // Custom functionality....
          });
        }
      })
    }

    $scope.createAccount = function() {
      $scope.closeModal();
      $scope.modal.remove();
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $ionicModal.fromTemplateUrl('templates/createAccount.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.accountModal = modal;
        $scope.accountModal.show();
      });
    }

    $scope.createAccountSubmit = function(name, user, email, pass, login) {
      var account = {
        username: user,
        password: pass,
        email: email,
        fullName: name,
        backup: {
          text: JSON.parse(window.localStorage.getItem("text")),
          journal: JSON.parse(window.localStorage.getItem("journalEntry"))
        }
      }

      if (login == false) {
        $scope.accountModal.hide();
        $scope.accountModal.remove();
      } else {
        $scope.closeModal();
        $scope.modal.remove();
        $ionicModal.fromTemplateUrl('templates/login.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.modal = modal;
        });
      }
      $ionicLoading.show();
      console.log(user + pass);
      $http.post("https://hidden-stream-54770.herokuapp.com/createAccount", {
        name: name,
        username: user.toLowerCase(),
        email: email,
        password: pass,
        backup: account.backup
      }).then(function(response) {
        console.log(response.data);
        if (response.data == true) {
          $ionicLoading.hide();
          //account already exists, try again
          var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'Username not available, try again.'
          });

          alertPopup.then(function(res) {
            // Custom functionality....
          });
        } else if (response.data == "success") {
          $http.post("https://hidden-stream-54770.herokuapp.com/login", {
            username: user,
            password: pass
          }).then(function(response) {
            $ionicLoading.hide();
            console.log(response.data);
            window.localStorage.setItem("loggedIn", true);
            console.log(account);
            window.localStorage.setItem("account", JSON.stringify(account));
            window.localStorage.setItem("text", JSON.stringify(response.data.backup.text));
            window.localStorage.setItem("journalEntry", JSON.stringify(response.data.backup.journal));
            $scope.setAccount();
            var alertPopup = $ionicPopup.alert({
              title: 'Success',
              template: 'Account Created, Logged In'
            });

            alertPopup.then(function(res) {
              // Custom functionality....
            });
          })
        }
      })
    }

    $scope.restore = function() {
      //get from mongo, then set all the appopriate storage items
    }
    $scope.backup = function(name, user, email, pass, login) {
      var account = {
        username: user,
        password: pass,
        email: email,
        fullName: name,
        backup: {
          text: JSON.parse(window.localStorage.getItem("text")),
          journal: JSON.parse(window.localStorage.getItem("journalEntry"))
        }
      }
      $ionicLoading.show();
      $http.post("https://hidden-stream-54770.herokuapp.com/backup", {
        name: name,
        username: user.toLowerCase(),
        email: email,
        password: pass,
        backup: account.backup
      }).then(function(response) {
        $ionicLoading.hide();
        if (response.data == true) {
          //show success
          var alertPopup = $ionicPopup.alert({
            title: 'Success',
            template: 'Backup Successful'
          });

          alertPopup.then(function(res) {
            // Custom functionality....
          });
        } else {
          //show fail
          var alertPopup = $ionicPopup.alert({
            title: 'Fail',
            template: 'Backup Failed'
          });

          alertPopup.then(function(res) {
            // Custom functionality....
          });

        }
      })

    }

    $scope.setAccount = function() {
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
    }
  })
