angular.module('App')

  .controller("WeightCtrl", function($rootScope, $scope) {
    $rootScope.showSearch = false;
    $rootScope.journalDelete = false;
    $rootScope.journalAdd = false;
    $rootScope.titleMenu = "Weight Tracker";

    if (window.localStorage.getItem("highlights") != null) {
      var temp = window.localStorage.getItem("highlights");
      $scope.highlights = JSON.parse(temp);
      console.log($scope.highlights);
    } else {
      $scope.highlights = [];
    }
    if (window.localStorage.getItem("weights") != null) {
      var temp = window.localStorage.getItem("weights");
      $scope.weights = JSON.parse(temp);
    } else {
      $scope.weights = [];
    }
    if (window.localStorage.getItem("badges") != null) {
      var temp = window.localStorage.getItem("badges");
      $scope.badges = JSON.parse(temp);
      console.log($scope.badges);
    } else {
      $scope.badges = [];
    }

    $scope.onezoneDatepicker = {
    date: new Date(), // MANDATORY
    mondayFirst: false,
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    disableDates: false,
    showDatepicker: true,
    showTodayButton: false,
    calendarMode: true,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: $scope.badges,
    callback: function(value){
        // your code
        var found = false;
        console.log(value);
        var value = $scope.convertDate(value);
        $scope.selectedDate = value;
        for(var i = 0; i < $scope.highlights.length; i++) {
          if (value === $scope.highlights[i].date) {
            console.log(value);
            console.log($scope.highlights[i].date);
            $scope.selectedWeight = $scope.highlights[i].weight;
            found = true;
          } else {
            if (found == false) {
            $scope.selectedWeight = "";
          }
          }
        }
    }
  };
  $scope.numberPickerObject = {
    inputValue: 100, //Optional
    minValue: 20,
    maxValue: 500,
    precision: 1,  //Optional
    decimalStep: 0.1,  //Optional
    format: "DECIMAL",  //Optional - "WHOLE" or "DECIMAL"
    unit: "",  //Optional - "m", "kg", "℃" or whatever you want
    titleLabel: 'Weight',  //Optional
    setLabel: 'Set',  //Optional
    closeLabel: 'Close',  //Optional
    setButtonType: 'button-calm',  //Optional
    closeButtonType: 'button-stable',  //Optional
    callback: function (val) {    //Mandatory
      $scope.selectedWeight = val;
      if ($scope.selectedDate == undefined || $scope.selectedDate == new Date()) {
        var value = new Date();
        value = $scope.convertDate(value);
        $scope.highlights.push({
          date: value,
          color: '#8FD4D9',
          textColor: '#fff',
          weight: val
        });
        $scope.badges.push({
          date: new Date(),
          color: '#8FD4D9',
          textColor: '#fff'
        })
      } else {
        $scope.highlights.push({
          date: $scope.selectedDate,
          color: '#8FD4D9',
          textColor: '#fff',
          weight: val
        });
        $scope.badges.push({
          date: $scope.convertDateBack($scope.selectedDate),
          color: '#8FD4D9',
          textColor: '#fff'
        })
      }
      $scope.weights.push(val);
      window.localStorage.setItem("badges", JSON.stringify($scope.badges));
      window.localStorage.setItem("highlights",JSON.stringify($scope.highlights));
      window.localStorage.setItem("weights", JSON.stringify($scope.weights));
    }
};

  $scope.convertDate = function(value) {
    value = JSON.stringify(value);
    var val = value.substr(1,10);
    return val;
  }
  $scope.convertDateBack = function(value) {
    var year = parseInt(value.substr(0,4));
    var month = parseInt(value.substr(6,7));
    var day = parseInt(value.substr(8,9));

    var temp = new Date(year, month-1, day);
    console.log(temp);
    return temp;
  }
  })
