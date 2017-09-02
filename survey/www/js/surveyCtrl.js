angular.module('starter')

  .controller("surveyCtrl", function($scope, $http, $ionicSlideBoxDelegate, $state, $rootScope, $timeout) {
    $rootScope.timeoutWindow = window.setTimeout(function() {
      $scope.questionOneV = {};
      $scope.questionTwoV = {};
      $scope.questionThreeV = {};
      $scope.questionFourV = {};
      $scope.form = {};
      $rootScope.referralYN = true;
      $rootScope.refKey = "";
      window.clearTimeout($rootScope.timeoutWindow);
      $state.go("home");
    }, 60000);
    $ionicSlideBoxDelegate.enableSlide(false);
    $scope.questionOneV = {};
    $scope.questionTwoV = {};
    $scope.questionThreeV = {};
    $scope.questionFourV = {};
    $scope.namePlaceholder = "John Doe";
    $scope.addressPlaceholder = "123 Street";
    $scope.cityPlaceholder = "Lebanon";
    $scope.statePlaceholder = "TN";
    $scope.zipPlaceholder = "37087";
    $scope.phonePlaceholder = "6157771234";
    $scope.form = {};
    $scope.questionOne = {
      question: "1. Which of the following words would you use to describe our bank? Select all that apply.",
      value0: "Reliable",
      value1: "Knowledgeable",
      value2: "Helpful",
      value3: "Courteous",
      value4: "None of the above"
    };
    $scope.questionTwo = {
      question: "2. How well do our banking products meet your needs? Select One.",
      values: []
    };
    $scope.questionTwo.values.push("Extremely Well");
    $scope.questionTwo.values.push("Very Well");
    $scope.questionTwo.values.push("Somewhat Well");
    $scope.questionTwo.values.push("Not So Well");
    $scope.questionTwo.values.push("Not At All Well");
    $scope.questionThree = {
      question: "3. How responsive are we to your questions?",
      values: []
    };
    $scope.questionThree.values.push("Extremely Responsive");
    $scope.questionThree.values.push("Very Responsive");
    $scope.questionThree.values.push("Somewhat Responsive");
    $scope.questionThree.values.push("Not So Responsive");
    $scope.questionFour = {
      question: "4. How likely is it that you would recommend our bank to a friend or colleague? Select One Below"
    }

    $scope.goHome = function() {
      $state.go("home");
    }
    $scope.noneOfTheAbove = function() {
        $scope.noneOfTheAboveChecked = true;
        $scope.questionOneV.Reliable = false;
        $scope.questionOneV.Knowledgeable = false;
        $scope.questionOneV.Helpful = false;
        $scope.questionOneV.Courteous = false;
    }
    $scope.clearNoneOfTheAbove = function() {
      $scope.noneOfTheAboveChecked = false;
    }

    $scope.removePlaceholder = function(item) {
      if (item == 'name') {
        $scope.namePlaceholder = "";
      } else if (item == 'address') {
        $scope.addressPlaceholder = "";
      } else if (item ==  'city') {
        $scope.cityPlaceholder = "";
      } else if (item == 'state') {
        $scope.statePlaceholder = "";
      } else if (item == 'zip') {
        $scope.zipPlaceholder = "";
      }else if (item == 'phone') {
        $scope.phonePlaceholder = "";
      }
    }
    $scope.submit = function() {
      console.log($scope.questionOneV);
      console.log($scope.questionTwoV);
      console.log($scope.questionThreeV);
      console.log($scope.questionFourV);
      console.log($scope.form);
      $scope.form.referralKey = $rootScope.refKey;
      var answer = {
        question1: $scope.questionOne.question,
        question1A: $scope.questionOneV,
        question2: $scope.questionTwo.question,
        question2A: $scope.questionTwoV.checked,
        question3: $scope.questionThree.question,
        question3A: $scope.questionThreeV.checked,
        question4: $scope.questionFour.question,
        question4A: $scope.questionFourV.checked,
        fullName: $scope.form.fullName,
        address: $scope.form.address,
        city: $scope.form.city,
        state: $scope.form.state,
        zip: $scope.form.zip,
        areaCode: $scope.form.zip,
        phone: $scope.form.phone,
        call: $scope.form.pleaseCall,
        lifeInsurance: $scope.form.choice1,
        brokerage: $scope.form.choice2,
        bankName: window.localStorage.getItem("bank"),
        referralKey: $scope.form.referralKey
      }

      $http.post('https://calm-citadel-60937.herokuapp.com/sendEmail', {
        answers: answer
      });

      $scope.questionOneV = {};
      $scope.questionTwoV = {};
      $scope.questionThreeV = {};
      $scope.questionFourV = {};
      $scope.form = {};
      $rootScope.referralYN = true;
      $rootScope.refKey = "";
      window.clearTimeout($rootScope.timeoutWindow);
      $state.go("home");
    }

    $scope.nextSlide = function() {
      window.clearTimeout($rootScope.timeoutWindow);
      $rootScope.timeoutWindow = window.setTimeout(function() {
        $scope.questionOneV = {};
        $scope.questionTwoV = {};
        $scope.questionThreeV = {};
        $scope.questionFourV = {};
        $scope.form = {};
        $rootScope.referralYN = true;
        $rootScope.refKey = "";
        window.clearTimeout($rootScope.timeoutWindow);
        $state.go("home");
      }, 60000);
      $ionicSlideBoxDelegate.next(3);
    }
    $scope.backSlide = function() {
      window.clearTimeout($rootScope.timeoutWindow);
      $rootScope.timeoutWindow = window.setTimeout(function() {
        $scope.questionOneV = {};
        $scope.questionTwoV = {};
        $scope.questionThreeV = {};
        $scope.questionFourV = {};
        $scope.form = {};
        $rootScope.referralYN = true;
        $rootScope.refKey = "";
        window.clearTimeout($rootScope.timeoutWindow);
        $state.go("home");
      }, 60000);
      $ionicSlideBoxDelegate.previous(3);
    }
  })
