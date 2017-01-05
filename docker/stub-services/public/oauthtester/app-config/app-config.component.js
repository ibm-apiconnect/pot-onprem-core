'use strict';

angular
  .module('appConfig')
  .component('appConfig', {
    templateUrl: 'app-config/app-config.template.html',
    controller: ['$rootScope', '$scope', '$location', 'localStorageService',
      function appConfigController($rootScope, $scope, $location, localStorageService) {

        console.log("initializing");

        localStorageService.set("tokenUrl", (localStorageService.get("tokenUrl") ? localStorageService.get("tokenUrl") : null));
        localStorageService.set("apiUrl", (localStorageService.get("apiUrl") ? localStorageService.get("apiUrl") : null));
        localStorageService.set("roId", (localStorageService.get("roId") ? localStorageService.get("roId") : null));
        localStorageService.set("roPwd", (localStorageService.get("roPwd") ? localStorageService.get("roPwd") : null));
        localStorageService.set("clientId", (localStorageService.get("clientId") ? localStorageService.get("clientId") : null));
        localStorageService.set("clientSecret", (localStorageService.get("clientSecret") ? localStorageService.get("clientSecret") : null));
        localStorageService.set("scope", (localStorageService.get("scope") ? localStorageService.get("scope") : null));
        localStorageService.set("configured", (localStorageService.get("configured") ? localStorageService.get("configured") : false));
        localStorageService.set("accessToken", (localStorageService.get("accessToken") ? localStorageService.get("accessToken") : null));

        console.log("init tokenUrl value: " + localStorageService.get("tokenUrl"));
        console.log("init apiUrl value: " + localStorageService.get("apiUrl"));
        console.log("init clientId value: " + localStorageService.get("clientId"));
        console.log("init clientSecret value: " + localStorageService.get("clientSecret"));
        console.log("init roId value: " + localStorageService.get("roId"));
        console.log("init roPwd value: " + localStorageService.get("roPwd"));
        console.log("init scope value: " + localStorageService.get("scope"));
        console.log("init configured value: false");
        console.log("init accessToken value: " + localStorageService.get("accessToken"));
  
        /* Pre-Set Form Values */
        // $scope.config = {
        //   tokenUrl: "https://api.us.apiconnect.ibmcloud.com/malleyusibmcom-dev/sb/oauth2/token",
        //   roId: "john",
        //   roPwd: "smith",
        //   clientId: "2f62af95-f285-4470-b050-384655f5adc8",
        //   clientSecret: "kB2hK5wL0iE1vB5qF3dT7kY3eA0hL4oX2fM1nB5xQ8iC0uA0cY",
        //   scope: "inventory"
        // };

        $scope.config = {
          tokenUrl: "YOUR TOKEN URL",
          roId: "john",
          roPwd: "smith",
          clientId: "YOUR CLIENT ID",
          clientSecret: "YOUR CLIENT SECRET",
          scope: "inventory"
        };
  
        $scope.setConfig = function (config) {

          console.log("setting config");

          localStorageService.set("tokenUrl", config.tokenUrl);
          localStorageService.set("apiUrl", config.tokenUrl.replace("oauth2/token", "inventory/items?filter[limit]=2&filter[fields][description]=false"));
          localStorageService.set("roId", config.roId);
          localStorageService.set("roPwd", config.roPwd);
          localStorageService.set("clientId", config.clientId);
          localStorageService.set("clientSecret", config.clientSecret);
          localStorageService.set("scope", config.scope);
          localStorageService.set("configured", true);

          console.log("new tokenUrl value: " + localStorageService.get("tokenUrl"));
          console.log("new roId value: " + localStorageService.get("roId"));
          console.log("new roPwd value: " + localStorageService.get("roPwd"));
          console.log("new clientId value: " + localStorageService.get("clientId"));
          console.log("new clientSecret value: " + localStorageService.get("clientSecret"));
          console.log("new scope value: " + localStorageService.get("scope"));
          console.log("configured: true");

          $location.path('/');
        };
      }
    ]
  });