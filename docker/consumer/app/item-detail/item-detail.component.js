'use strict';

angular
  .module('itemDetail')
  .component('itemDetail', {
    templateUrl: 'item-detail/item-detail.template.html',
    controller: ['$rootScope', '$scope', '$location', '$routeParams', 'localStorageService', 'usSpinnerService', 'Think',
      function ItemDetailController($rootScope, $scope, $location, $routeParams, localStorageService, usSpinnerService, Think) {

        /* View Vars */

        $scope.item = {};     // loaded from the getItem function
        $scope.reviews = [];  // loaded from the getReviews function

        $scope.financingResult = "undefined";
        $scope.shippingResult = "undefined";

        /* Controller Functions */

        function configured () {
          return (localStorageService.get("urlBase"));
        }

        function authenticated() {
          return (localStorageService.get("accessToken"));
        }

        function startSpin (hidden) {
          console.log("starting spinner");
          $scope.hideContainer = hidden;
          usSpinnerService.spin('detailSpinner');
        }

        function stopSpin () {
          console.log("stopping spinner");
          $scope.hideContainer = false;
          usSpinnerService.stop('detailSpinner');
        }

        function getItem () {

          var options = {
            urlBase: localStorageService.get("urlBase"),
            headers: {
              'X-IBM-Client-Id': localStorageService.get("clientId"),
              'X-IBM-Client-Secret': localStorageService.get("clientSecret"),
              'Authorization': "Bearer " + localStorageService.get("accessToken")
            }
          };

          Think
            .Item(options)
            .get({
                id: $routeParams.itemId
              }
            )
            .$promise
            .then(function(item) {
              $scope.item = item;
            });

        }

        function getReviews () {

          var options = {
            urlBase: localStorageService.get("urlBase"),
            headers: {
              'X-IBM-Client-Id': localStorageService.get("clientId"),
              'X-IBM-Client-Secret': localStorageService.get("clientSecret"),
              'Authorization': "Bearer " + localStorageService.get("accessToken")
            }
          };

          Think
            .Review(options)
            .query({
              id: $routeParams.itemId
            })
            .$promise
            .then(function(reviews) {
              /* Clean up the date format for display */
  
              reviews.forEach(function (item, index) {
                console.log("index: " + JSON.stringify(index));
                console.log("item: " + JSON.stringify(item));
                var startTimeISOString = item.date;
                var d = new Date(startTimeISOString);
                d = new Date( d.getTime() + ( d.getTimezoneOffset() * 60000 ) ).toDateString().replace("00:00:00 GMT-0600 (CST)","");
                item.date = d;
              });

              $scope.reviews = reviews;

              stopSpin();
            });

        }

        $scope.finCalc = function () {

          $scope.financingResult = "calculating";

          var options = {
            urlBase: localStorageService.get("urlBase"),
            headers: {
              'X-IBM-Client-Id': localStorageService.get("clientId")
            }
          };

          Think
            .Financing(options)
            .get({
              amount: $scope.item.price,
              duration: '24',
              rate: '3.9'
            })
            .$promise
            .then(function (result) {
              $scope.financingResult = result.paymentAmount;
            });
        };

        $scope.shipCalc = function (shippingInput) {

          $scope.shippingResult = "calculating";

          var options = {
            urlBase: localStorageService.get("urlBase"),
            headers: {
              'X-IBM-Client-Id': localStorageService.get("clientId")
            }
          };

          Think
            .Shipping(options)
            .get({
              zip: shippingInput.zip
            })
            .$promise
            .then(function (result) {
              $scope.shippingResult = result;
            });
        };

        $scope.storeLoc = function (shippingInput) {

          var options = {
            urlBase: localStorageService.get("urlBase"),
            headers: {
              'X-IBM-Client-Id': localStorageService.get("clientId")
            }
          };

          Think
            .Stores(options)
            .get({
              zip: shippingInput.zip
            })
            .$promise
            .then(function (result) {
              $scope.nearbyStore = result;
            });
        };

        $scope.stars = function(rating, type) {
          var stars = [];

          var rounded_rating = Math.round(rating*2)/2;
          var i;
          switch (type) {
            case 'full':
              for (i = 0; i < Math.floor(rounded_rating); i++) {
                stars.push(i);
              }
              break;
            case 'half':
              for (i = 0; i < (rounded_rating % 1 != 0); i++) {
                stars.push(i);
              }
              break;
            case 'empty':
              for (i = 0; i < (5 - Math.ceil(rounded_rating)); i++) {
                stars.push(i);
              }
              break;
            default:
              break;
          }

          return stars;
        };

        $scope.submitNewReview = function(newReview) {

          startSpin(false);
          console.log(newReview);
          newReview.date = Date.now();

          var options = {
            urlBase: localStorageService.get("urlBase"),
            headers: {
              'X-IBM-Client-Id': localStorageService.get("clientId"),
              'X-IBM-Client-Secret': localStorageService.get("clientSecret"),
              'Authorization': "Bearer " + localStorageService.get("accessToken")
            }
          };

          Think
            .Review(options)
            .save({
              id: $routeParams.itemId,
              'body': newReview
            })
            .$promise
            .then(function() {
              console.log("refreshing reviews");
              getItem();
              getReviews();
            })
        };

        /* Initialize Page */

        if (configured() && authenticated()) {
          startSpin(true);
          getItem();
          getReviews();
          $rootScope.logInOutLink = "#!/logout";
          $rootScope.logInOutText = "Log Out";
        } else if (configured()) {
          $location.path('/login');
        } else {
          $location.path('/config');
        }
      }
    ]
  });