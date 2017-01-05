'use strict';

angular
  .module('appLogout')
  .component('appLogout', {
    templateUrl: 'app-logout/app-logout.template.html',
    controller: ['$location', '$scope', 'localStorageService',
      function appLogoutController($location, $scope, localStorageService) {

        console.log("clearing config and accessToken values");

        localStorageService.set("tokenUrl", null);
        localStorageService.set("apiUrl", null);
        localStorageService.set("roId", null);
        localStorageService.set("roPwd", null);
        localStorageService.set("clientId", null);
        localStorageService.set("clientSecret", null);
        localStorageService.set("scope", null);
        localStorageService.set("configured", false);
        localStorageService.set("accessToken", null);

        console.log("new tokenUrl value: " + localStorageService.get("tokenUrl"));
        console.log("new apiUrl value: " + localStorageService.get("apiUrl"));
        console.log("new clientId value: " + localStorageService.get("clientId"));
        console.log("new clientSecret value: " + localStorageService.get("clientSecret"));
        console.log("new roId value: " + localStorageService.get("roId"));
        console.log("new roPwd value: " + localStorageService.get("roPwd"));
        console.log("new scope value: " + localStorageService.get("scope"));
        console.log("new configured value: false");
        console.log("new accessToken value: " + localStorageService.get("accessToken"));

        $location.path('/config');
  
      }
    ]
  });