angular.module('App')

  .controller("trackerCtrl", function($scope, $rootScope, $ionicPopup, $ionicSideMenuDelegate, $ionicActionSheet, $ionicModal) {
    $rootScope.showSearch = true;
    $rootScope.journalDelete = false;
    $rootScope.journalAdd = false;
    $rootScope.titleMenu = "Directory";
    $scope.data = {
      comments: ''
    }
    $ionicModal.fromTemplateUrl('templates/details.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.detailsModal = modal;
    });
    $scope.data = {
      text: ""
    };
    $rootScope.prepareIAP = function() {
      if (window.inAppPurchase) {
        window.inAppPurchase
          .getProducts(['com.ionicframework.tracker210235.upgrade'])
          .then(function(products) {
            $scope.products = products;
            window.inAppPurchase
              .buy('com.ionicframework.tracker210235.upgrade')
              .then(function(data) {
                window.localStorage.setItem("upgraded", true);
                window.location.reload();
              })
              .then(function() {
                alert('Done!');
              })
              .catch(function(err) {

              });
          })
          .catch(function(err) {
            alert(JSON.stringify(err) + "SECOND");
          });
      }
    }
    $rootScope.text = $rootScope.userArray.name[($rootScope.currentUser - 1)].items[0];
    if ($rootScope.text == undefined) {
      $rootScope.text = [];
    }
    if ($rootScope.text != null) {
      $rootScope.text.sort(function(a, b) {
        var nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      });
    }

    $scope.myButtonEvent = function() {
      $scope.popups(false, undefined);
      //$rootScope.text.text = "";
    }

    $scope.edit = function(item) {
      for (var i = 0; i < $rootScope.text.length; i++) {
        if ($rootScope.text[i].name == item.name) {
          $scope.editOnlyPopup(true, item);
        }
      }
      $rootScope.text.text = "";
    }

    $scope.popups = function(editing, passed) {
      var myPopup = $ionicPopup.show({
        template: '<input type = "text" ng-model = "data.text">',
        title: 'Enter Food Item',
        subTitle: 'Enter the food that you ate and would like to track',
        scope: $scope,
        buttons: [{
            text: 'Cancel'
          },
          {
            text: '<b>Save</b>',
            type: 'button-calm',
            onTap: function(e) {
              var item = {
                name: $scope.data.text,
                grade: undefined,
                type: undefined
              }
              $scope.data.text = "";

              item.name = $scope.uppercase(item.name);
              $ionicPopup.show({
                title: 'Enter Your Pain Level',
                subTitle: 'Click the button that represents your pain level',
                scope: $scope,
                buttons: [{
                    text: 'Great',
                    type: 'button-balanced',
                    onTap: function(e) {
                      var found = false;
                      item.grade = "Great";
                      item.type = "badge-balanced"
                      if ($rootScope.text != undefined) {
                        for (var i = 0; i < $rootScope.text.length; i++) {
                          if ($rootScope.text[i].name == item.name) {
                            found = true;
                          }
                        }
                      }
                      if (found == false && editing == false) {
                        $rootScope.text.push(item);
                        $rootScope.text.sort(function(a, b) {
                          var nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase();
                          if (nameA < nameB) //sort string ascending
                            return -1;
                          if (nameA > nameB)
                            return 1;
                          return 0; //default return value (no sorting)
                        });
                        $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
                        window.localStorage.setItem("text", JSON.stringify($rootScope.text));
                      } else {
                        if (editing == true) {
                          for (var i = 0; i < $rootScope.text.length; i++) {
                            if ($rootScope.text[i].name == item.name) {
                              $rootScope.text[i] = item;
                            }
                          }
                        }
                      }
                    }
                  },
                  {
                    text: 'Okay',
                    type: 'button-calm',
                    onTap: function(e) {
                      var found = false;
                      item.grade = "Okay";
                      item.type = "badge-calm"
                      if ($rootScope.text != undefined) {
                        for (var i = 0; i < $rootScope.text.length; i++) {
                          if ($rootScope.text[i].name == item.name) {
                            found = true;
                          }
                        }
                      }
                      if (found == false && editing == false) {
                        $rootScope.text.push(item);
                        $rootScope.text.sort(function(a, b) {
                          var nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase();
                          if (nameA < nameB) //sort string ascending
                            return -1;
                          if (nameA > nameB)
                            return 1;
                          return 0; //default return value (no sorting)
                        });
                        $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
                        window.localStorage.setItem("text", JSON.stringify($rootScope.text));
                      } else {
                        if (editing == true) {
                          for (var i = 0; i < $rootScope.text.length; i++) {
                            if ($rootScope.text[i].name == item.name) {
                              $rootScope.text[i] = item;
                            }
                          }
                        }
                      }
                    }
                  },
                  {
                    text: 'Awful',
                    type: 'button-assertive',
                    onTap: function(e) {
                      var found = false;
                      item.grade = "Awful";
                      item.type = "badge-assertive"
                      if ($rootScope.text != undefined) {
                        for (var i = 0; i < $rootScope.text.length; i++) {
                          if ($rootScope.text[i].name == item.name) {
                            found = true;
                          }
                        }
                      }
                      if (found == false && editing == false) {
                        $rootScope.text.push(item);
                        $rootScope.text.sort(function(a, b) {
                          var nameA = a.name.toLowerCase(),
                            nameB = b.name.toLowerCase();
                          if (nameA < nameB) //sort string ascending
                            return -1;
                          if (nameA > nameB)
                            return 1;
                          return 0; //default return value (no sorting)
                        });
                        $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
                        window.localStorage.setItem("text", JSON.stringify($rootScope.text));
                        if (editing == true) {
                          for (var i = 0; i < $rootScope.text.length; i++) {
                            if ($rootScope.text[i].name == item.name) {
                              $rootScope.text[i] = item;
                            }
                          }
                        }
                      }
                    }
                  }
                ]
              })
            }
          }
        ]
      })
    }

    $scope.editOnlyPopup = function(editing, item) {
      $ionicPopup.show({
        title: 'Enter Your Pain Level',
        subTitle: 'Click the button that represents your pain level',
        scope: $scope,
        buttons: [{
            text: 'Great',
            type: 'button-balanced',
            onTap: function(e) {
              var found = false;
              item.grade = "Great";
              item.type = "badge-balanced"
              for (var i = 0; i < $rootScope.text.length; i++) {
                if ($rootScope.text[i].name == item.name) {
                  found = true;
                }
              }
              if (found == false && editing == false) {
                $rootScope.text.push(item);
                $rootScope.text.sort(function(a, b) {
                  var nameA = a.name.toLowerCase(),
                    nameB = b.name.toLowerCase();
                  if (nameA < nameB) //sort string ascending
                    return -1;
                  if (nameA > nameB)
                    return 1;
                  return 0; //default return value (no sorting)
                });
                $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
                window.localStorage.setItem("text", JSON.stringify($rootScope.text));
              } else {
                if (editing == true) {
                  for (var i = 0; i < $rootScope.text.length; i++) {
                    if ($rootScope.text[i].name == item.name) {
                      $rootScope.text[i] = item;
                    }
                  }
                }
                $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
                window.localStorage.setItem("text", JSON.stringify($rootScope.text));
              }
            }
          },
          {
            text: 'Okay',
            type: 'button-calm',
            onTap: function(e) {
              var found = false;
              item.grade = "Okay";
              item.type = "badge-calm"
              for (var i = 0; i < $rootScope.text.length; i++) {
                if ($rootScope.text[i].name == item.name) {
                  found = true;
                }
              }
              if (found == false && editing == false) {
                $rootScope.text.push(item);
                $rootScope.text.sort(function(a, b) {
                  var nameA = a.name.toLowerCase(),
                    nameB = b.name.toLowerCase();
                  if (nameA < nameB) //sort string ascending
                    return -1;
                  if (nameA > nameB)
                    return 1;
                  return 0; //default return value (no sorting)
                });
                $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
                window.localStorage.setItem("text", JSON.stringify($rootScope.text));
              } else {
                if (editing == true) {
                  for (var i = 0; i < $rootScope.text.length; i++) {
                    if ($rootScope.text[i].name == item.name) {
                      $rootScope.text[i] = item;
                    }
                  }
                }
                $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
                window.localStorage.setItem("text", JSON.stringify($rootScope.text));
              }
            }
          },
          {
            text: 'Awful',
            type: 'button-assertive',
            onTap: function(e) {
              var found = false;
              item.grade = "Awful";
              item.type = "badge-assertive"
              for (var i = 0; i < $rootScope.text.length; i++) {
                if ($rootScope.text[i].name == item.name) {
                  found = true;
                }
              }
              if (found == false && editing == false) {
                $rootScope.text.push(item);
                $rootScope.text.sort(function(a, b) {
                  var nameA = a.name.toLowerCase(),
                    nameB = b.name.toLowerCase();
                  if (nameA < nameB) //sort string ascending
                    return -1;
                  if (nameA > nameB)
                    return 1;
                  return 0; //default return value (no sorting)
                });
                $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
                window.localStorage.setItem("text", JSON.stringify($rootScope.text));
              } else {
                if (editing == true) {
                  for (var i = 0; i < $rootScope.text.length; i++) {
                    if ($rootScope.text[i].name == item.name) {
                      $rootScope.text[i] = item;
                    }
                  }
                }
                $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
                window.localStorage.setItem("text", JSON.stringify($rootScope.text));
              }
            }
          }
        ]
      })
    }

    $scope.uppercase = function(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    $scope.showSheet = function(item) {
      $scope.item = item;
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
            text: 'Item Details'
          }
        ],
        destructiveText: 'Delete',
        titleText: 'Options',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
          hideSheet();
        },
        buttonClicked: function(index) {
          $scope.item = item;
          console.log(item.comments);
          $scope.data.comments = item.comments;
          $rootScope.ingredients = item.ingredients;
          $scope.detailsModal.show();
          hideSheet();
        },
        destructiveButtonClicked: function() {
          $scope.delete(item);
          hideSheet();
        }
      });
    }

    $scope.delete = function(item) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Confirm Deletion',
        template: 'Are you sure you want to delete?',
        okType: 'button-assertive'
      });
      confirmPopup.then(function(res) {
        if (res) {
          for (var i = 0; i < $rootScope.text.length; i++) {
            if ($rootScope.text[i].name == item.name) {
              $rootScope.text.splice(i, 1);
              $rootScope.userArray.name[$rootScope.currentUser - 1].items.push($rootScope.text);
              window.localStorage.setItem("text", JSON.stringify($rootScope.text));
            }
          }
        }
      });

    }

    $scope.showMenu = function() {
      $ionicSideMenuDelegate.toggleLeft();
    }
    $scope.compare = function(a, b) {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    }

    $scope.addIngredient = function() {
      var myPopup = $ionicPopup.show({
        template: '<input type = "text" ng-model = "data.text">',
        title: 'Enter Ingredient',
        subTitle: 'Enter a ingredient you would like to add to this food item',
        scope: $scope,
        buttons: [{
            text: 'Cancel'
          },
          {
            text: '<b>Add</b>',
            type: 'button-calm',
            onTap: function(e) {
              if ($scope.item.ingredients == undefined) {
                $scope.item.ingredients = [];
                $scope.item.ingredients.push($scope.data.text);
                $rootScope.ingredients = $scope.item.ingredients;
              } else {
                $scope.item.ingredients.push($scope.data.text);
                $rootScope.ingredients = $scope.item.ingredients;
              }
              for (var i = 0; i < $rootScope.text.length; i++) {
                if ($rootScope.text[i].name == $scope.item.name) {
                  $rootScope.text[i] = $scope.item;
                }
              }
              window.localStorage.setItem("text", JSON.stringify($rootScope.text));
              $scope.data.text = "";
            }
          }]
        })
    }

    $scope.editName = function(item) {
      var myPopup = $ionicPopup.show({
        template: '<input type = "text" ng-model = "data.text">',
        title: 'Change Name',
        subTitle: 'Enter the Food Item you wish to add.',
        scope: $scope,
        buttons: [{
            text: 'Cancel'
          },
          {
            text: '<b>Edit</b>',
            type: 'button-calm',
            onTap: function(e) {
              item.name = $scope.data.text;
              for (var i = 0; i < $rootScope.text.length; i++) {
                if ($rootScope.text[i].name == $scope.item.name) {
                  $scope.item.name = item.name;
                  $rootScope.text[i] = $scope.item;
                }
              }
              window.localStorage.setItem("text", JSON.stringify($rootScope.text));
              $scope.data.text = "";
            }
          }]
        })
    }

    $scope.removeIngredient = function(item) {
      var myPopup = $ionicPopup.confirm({
        title: 'Remove Ingredient',
        subTitle: 'Would you like to remove this ingredient?',
        scope: $scope,
        buttons: [{
            text: 'Cancel'
          },
          {
            text: '<b>Yes</b>',
            type: 'button-assertive',
            onTap: function(e) {
              for (var i = 0; i < $rootScope.text.length; i++) {
                if ($rootScope.text[i].name == $scope.item.name) {
                  for (var j = 0; j < $rootScope.text[i].ingredients.length; j++) {
                    if ($rootScope.text[i].ingredients[j] == item) {
                      $rootScope.text[i].ingredients.splice(j, 1);
                      $rootScope.ingredients = $rootScope.text[i].ingredients;
                    }
                  }
                }
              }

            }
          }]
        })
    }

    $scope.submitDetails = function(comment) {
      console.log(comment);
      $scope.item.comments = comment;
      for (var i = 0; i < $rootScope.text.length; i++) {
        if ($rootScope.text[i].name == $scope.item.name) {
          $rootScope.text[i] = $scope.item;
        }
      }
      window.localStorage.setItem("text", JSON.stringify($rootScope.text));
      $scope.data.comments = '';
      $rootScope.ingredients = [];
      $scope.detailsModal.hide();
    }

    $scope.closeDetailsModal = function() {
      $scope.detailsModal.hide();
    }
    
  })
