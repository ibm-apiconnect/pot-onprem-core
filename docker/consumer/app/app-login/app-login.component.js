'use strict';

angular
  .module('appLogin')
  .component('appLogin', {
    templateUrl: 'app-login/app-login.template.html',
    controller: ['$rootScope', '$scope', '$location', 'localStorageService', '$base64', 'Think',
      function appLoginController($rootScope, $scope, $location, localStorageService, $base64, Think) {

        $rootScope.logInOutLink = "#!/login";
        $rootScope.logInOutText = "Log In";

        $scope.login = function (user) {

          console.log("getting accessToken");
          
          var body = {
            grant_type: "password",
            username: user.un,
            password: user.pwd,
            scope: "inventory"
          };

          var options = {
            urlBase: localStorageService.get("urlBase"),
            headers: {
              'Authorization': "Basic " + $base64.encode(localStorageService.get("clientId") + ':' + localStorageService.get("clientSecret")),
              'Content-Type': "application/x-www-form-urlencoded"
            }
          };

          Think
            .OAuth(options)
            .getToken(body)
            .$promise
            .then(function(tokenRsp) {
              console.log("OAuth Token Response: " + JSON.stringify(tokenRsp));
              localStorageService.set("accessToken", tokenRsp.access_token);
              console.log("new accessToken value: " + localStorageService.get("accessToken"));
              $location.path('/items');
            });
          
        }
  
      }
    ]
  });