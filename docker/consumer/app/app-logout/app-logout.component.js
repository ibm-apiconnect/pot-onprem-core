'use strict';

angular
  .module('appLogout')
  .component('appLogout', {
    templateUrl: 'app-logout/app-logout.template.html',
    controller: ['$location', '$scope', 'localStorageService',
      function appLogoutController($location, $scope, localStorageService) {

        console.log("clearing config and accessToken values");

        localStorageService.set("urlBase", null);
        localStorageService.set("clientId", null);
        localStorageService.set("clientSecret", null);
        localStorageService.set("accessToken", null);

        console.log("new urlBase value: " + localStorageService.get("urlBase"));
        console.log("new clientId value: " + localStorageService.get("clientId"));
        console.log("new clientSecret value: " + localStorageService.get("clientSecret"));
        console.log("new accessToken value: " + localStorageService.get("accessToken"));

        $location.path('/config');
  
      }
    ]
  });