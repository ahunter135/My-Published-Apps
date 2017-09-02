angular.module('App')

  .controller("journalCtrl", function($scope, $rootScope, ionicDatePicker, $state, $cordovaLocalNotification, ionicTimePicker, $ionicModal) {
    $rootScope.showSearch = false;
    $rootScope.journalDelete = false;
    $rootScope.journalAdd = true;
    var timerRead = window.localStorage.getItem("timer");
    var time = JSON.parse(timerRead);
    if (time != undefined) {
      $scope.timers = time;
    } else {
      $scope.timers = {
        checked: false
      };
    }

    if ($state.current.url == '/journal') {
      $rootScope.titleMenu = 'Journal';
    } else {
      $rootScope.titleMenu = 'Directory';
    }
    $scope.formData = {};
    $scope.slider = {
      min: 0,
      max: 15,
      value: 0
    };

    $scope.journalData = {};
    if (window.localStorage.getItem("journalEntry") != null) {
      var temp = window.localStorage.getItem("journalEntry");
      $rootScope.entryArray = JSON.parse(temp);
    } else {
      $rootScope.entryArray = [];
    }

    $scope.startDate = {
      text: 'Choose a the Date',
      type: 'start',
      date: undefined
    }

    $scope.setTimer = function() {
      $scope.timers.checked = !$scope.timers.checked;
      if ($scope.timers.checked == false) {

      } else {
        var ipObj1 = {
          callback: function(val) { //Mandatory
            if (typeof(val) === 'undefined') {

            } else {
              var selectedTime = new Date(val * 1000);
              var tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate());
              tomorrow.setHours(selectedTime.getUTCHours());
              tomorrow.setMinutes(selectedTime.getUTCMinutes());
              tomorrow.setSeconds(0);
              var today_selected_time = new Date(tomorrow);
              cordova.plugins.notification.local.schedule({
                id: 1,
                title: "Time To Journal",
                text: "Don't Forget To Journal Today!",
                firstAt: today_selected_time,
                every: "day" // "minute", "hour", "week", "month", "year"
              });
            }
          },
          inputTime: 50400, //Optional
          format: 12, //Optional
        };

        ionicTimePicker.openTimePicker(ipObj1);
      }
      window.localStorage.setItem("timer", JSON.stringify($scope.timers));
    }

    $scope.showDatePicker = function(item) {
      $scope.journalEntry = undefined;
      var found = false;
      var currentDate = new Date();
      var datePickerOptions = {
        callback: function(val) { //Mandatory
          var date = new Date(val);
          $scope.startDate.date = date;
          $scope.startDate.text = date.toDateString();
          for (var i = 0; i < $scope.entryArray.length; i++) {
            if ($scope.entryArray[i].date == $scope.startDate.text) {
              $scope.journalData = $scope.entryArray[i];
              $scope.journalData.header = $scope.journalData.date + " & " + $scope.journalData.bm;
              $scope.slider.value = $scope.journalData.bm;
              found = true;
            }
            if (found == false) {
              $scope.journalData = {};
            }
          }
        },
        from: new Date(currentDate.getFullYear(), (currentDate.getMonth() - 3), currentDate.getDate()), //Optional
        to: new Date((currentDate.getFullYear() + 2), currentDate.getMonth(), currentDate.getDate()), //Optional
        inputDate: currentDate, //Optional
        mondayFirst: false, //Optional
        closeOnSelect: false, //Optional
        showTodayButton: true,
        templateType: 'popup' //Optional
      };
      ionicDatePicker.openDatePicker(datePickerOptions);
    }
    $scope.submitEntry = function() {
      $scope.tempEntry = {
        text: ""
      }
      if ($scope.startDate.date == undefined) {
        alert("Please pick a date first");
        return;
      }
      if ($scope.slider.value == undefined) {
        $scope.slider.value == 0;
      }
      if ($scope.formData.journalEntry == undefined) {
        $scope.formData.journalEntry = "";
      }
      var entry = {
        date: $scope.startDate.text,
        text: $scope.formData.journalEntry,
        bm: $scope.slider.value
      }
      for (var i = 0; i < $scope.entryArray.length; i++) {
        if ($scope.entryArray[i].date == entry.date) {
          $scope.tempEntry = $scope.entryArray[i];
          $scope.entryArray.splice(i, 1);
          break;
        }
      }
      entry.text = $scope.tempEntry.text + ' ' + entry.text;
      $scope.entryArray.push(entry);
      $scope.journalData = entry;
      $scope.journalData.header = $scope.journalData.date + " & " + $scope.journalData.bm + ' BMs';
      $scope.formData.journalEntry = "";
      window.localStorage.setItem("journalEntry", JSON.stringify($scope.entryArray));
      $scope.addModal.hide();
    }

    $rootScope.delete = function() {
      for (var i = 0; i < $scope.entryArray.length; i++) {
        if ($scope.entryArray[i].date == $scope.selectedEntry.date) {
          $scope.tempEntry = $scope.entryArray[i];
          $scope.entryArray.splice(i, 1);
          break;
        }
      }
      $scope.journalData = {};
      window.localStorage.setItem("journalEntry", JSON.stringify($scope.entryArray));
      $scope.editModal.hide();
    }

    $rootScope.addJournalEntry = function() {
      $ionicModal.fromTemplateUrl('templates/journal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.addModal = modal;
        $scope.addModal.show();
      });
    }

    $scope.editJournal = function(item) {
      $ionicModal.fromTemplateUrl('templates/editJournal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.editModal = modal;
        $scope.selectedEntry = item;
        $scope.journalDataEdit = $scope.selectedEntry;
        $scope.editModal.show();
      });
    }

    $scope.submitEdit = function(item) {
      $scope.editModal.hide();
      var entry = {
        date: item.date,
        text: item.text,
        bm: item.bm
      }
      for (var i = 0; i < $scope.entryArray.length; i++) {
        if ($scope.entryArray[i].date == entry.date) {
          $scope.tempEntry = $scope.entryArray[i];
          $scope.entryArray.splice(i,1);
          break;
        }
      }
      $scope.entryArray.push(entry);
      $scope.journalData = entry;
      $scope.journalData.header = $scope.journalData.date + " & " + $scope.journalData.bm + ' BMs';
      $scope.formData.journalEntry = "";
      window.localStorage.setItem("journalEntry", JSON.stringify($scope.entryArray));
    }
  })
