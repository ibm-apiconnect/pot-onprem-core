'use strict';

angular
  .module('homePage')
  .component('homePage', {
    templateUrl: 'home-page/home-page.template.html',
    controller: ['$rootScope', '$scope', '$location', 'localStorageService', 'usSpinnerService', '$base64', 'Think',
      function homePageController($rootScope, $scope, $location, localStorageService, usSpinnerService, $base64, Think) {

        /* View Vars */

        /* Controller Functions */

        function initPage() {
          if (configured() && authenticated()) {

            $scope.accessTokenArea = authenticated();
            callApi();

          } else if (configured()) {

            login();

          } else {

            // Not configured, show config form
            $location.path('/config');

          }
        }

        function configured () {
          return (localStorageService.get("configured"));
        }

        function authenticated() {
          return (localStorageService.get("accessToken"));
        }

        function login() {

          console.log("getToken function called");

          /* Will need fix to DPGWY CORS before this works */

          var body = {
            grant_type: "password",
            username: localStorageService.get("roId"),
            password: localStorageService.get("roPwd"),
            scope: localStorageService.get("scope")
          };

          var options = {
            tokenUrl: localStorageService.get("tokenUrl"),
            headers: {
              'Authorization': "Basic " + $base64.encode(localStorageService.get("clientId") + ':' + localStorageService.get("clientSecret")),
              'Content-Type': "application/x-www-form-urlencoded"
            }
          };

          Think
            .OAuth(options)
            .getToken(body,
              function(tokenRsp) {
                // success
                console.log("OAuth Token Response: " + JSON.stringify(tokenRsp, null, 2));
                localStorageService.set("accessToken", tokenRsp.access_token);
                $scope.accessTokenArea = tokenRsp.access_token;
                usSpinnerService.stop('spinner');
                callApi();
              },
              function(err) {
                // error
                console.warn("Error obtaining token");
                console.warn("Request parameters: \n" + JSON.stringify(err, null, 2));
                $scope.accessTokenArea = "Error obtaining token, see browser console for more info.";
                usSpinnerService.stop('spinner');
              }
            );

        }

        function callApi() {

          usSpinnerService.spin('spinner');

          var options = {
            apiUrl: localStorageService.get("apiUrl"),
            headers: {
              'X-IBM-Client-Id': localStorageService.get("clientId"),
              'X-IBM-Client-Secret': localStorageService.get("clientSecret"),
              'Authorization': "Bearer " + localStorageService.get("accessToken")
            }
          };

          Think
            .Item(options)
            .query('',
              function (items) {
                console.log("API Response: " + JSON.stringify(items, null, 2));
                $scope.apiResponseArea = JSON.stringify(items, null, 2);
                usSpinnerService.stop('spinner');
              },
              function (err) {
                console.warn("Error occurred during API call");
                console.warn("Error: \n" + JSON.stringify(err, null, 2));
                $scope.apiResponseArea = "Error: \n" + JSON.stringify(err, null, 2);
                usSpinnerService.stop('spinner');
              }
            );

        }

        /* Initialize Page */
        initPage();

      }
    ]
  });