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
        // $scope.config = {
        //   clientId: "de0a1f1a-16c0-47ff-b99b-cec5dbc7f9a8",
        //   clientSecret: "fV6rO0fI6bF4aO8fM8oS3tO8cR1dG1gC7jQ4aY5jO5lI1hK1mX",
        //   host: "https://api.us.apiconnect.ibmcloud.com",
        //   organization: "apic-services-api-connect-pot",
        //   catalog: "sb"
        // };
        $scope.config = {
          clientId: "< YOUR CLIENT ID >",
          clientSecret: "< YOUR CLIENT SECRET >",
          host: "https://api.us.apiconnect.ibmcloud.com",
          organization: "< YOUR ORGANIZATION NAME >",
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