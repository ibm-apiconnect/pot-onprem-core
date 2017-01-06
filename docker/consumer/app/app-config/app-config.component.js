'use strict';

angular
  .module('appConfig')
  .component('appConfig', {
    templateUrl: 'app-config/app-config.template.html',
    controller: ['$rootScope', '$scope', '$location', 'localStorageService',
      function appConfigController($rootScope, $scope, $location, localStorageService) {

        console.log("initializing");

        localStorageService.set("urlBase", (localStorageService.get("urlBase") ? localStorageService.get("urlBase") : null));
        localStorageService.set("clientId", (localStorageService.get("clientId") ? localStorageService.get("clientId") : null));
        localStorageService.set("clientSecret", (localStorageService.get("clientSecret") ? localStorageService.get("clientSecret") : null));
        localStorageService.set("accessToken", (localStorageService.get("accessToken") ? localStorageService.get("accessToken") : null));

        console.log("init urlBase value: " + localStorageService.get("urlBase"));
        console.log("init clientId value: " + localStorageService.get("clientId"));
        console.log("init clientSecret value: " + localStorageService.get("clientSecret"));
        console.log("init accessToken value: " + localStorageService.get("accessToken"));
  
        /* Pre-Set Form Values */
        $scope.config = {
          clientId: "< YOUR CLIENT ID >",
          clientSecret: "< YOUR CLIENT SECRET >",
          host: "https://mgr.think.ibm",
          organization: "think",
          catalog: "sb"
        };
  
        $scope.setConfig = function (config) {

          console.log("setting config");

          localStorageService.set("urlBase", config.host + '/' + config.organization + '/' + config.catalog);
          localStorageService.set("clientId", config.clientId);
          localStorageService.set("clientSecret", config.clientSecret);

          console.log("new urlBase value: " + localStorageService.get("urlBase"));
          console.log("new clientId value: " + localStorageService.get("clientId"));
          console.log("new clientSecret value: " + localStorageService.get("clientSecret"));

          $location.path('/');
        };

        $rootScope.logInOutLink = "#!/login";
        $rootScope.logInOutText = "Log In";
      }
    ]
  });