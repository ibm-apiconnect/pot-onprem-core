'use strict';

angular.
module('itemList').
component('itemList', {
  templateUrl: 'item-list/item-list.template.html',
  controller: ['$rootScope', '$scope', '$location', '$http', 'localStorageService', 'usSpinnerService', 'Think',
    function ItemListController($rootScope, $scope, $location, $http, localStorageService, usSpinnerService, Think) {

      /* View Vars */
      
      $scope.items = [];

      /* Controller Functions */

      function configured () {
        return (localStorageService.get("urlBase"));
      }

      function authenticated() {
        return (localStorageService.get("accessToken"));
      }

      function loadItems() {

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
          .query()
          .$promise
          .then(function (items) {
            $scope.items = items;
            usSpinnerService.stop('itemsSpinner');
          });

      }

      $scope.goToItem = function(itemId) {
        $location.path('/items/' + itemId);
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

      /* Initialize Page */
      
      if (configured() && authenticated()) {
        loadItems();
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