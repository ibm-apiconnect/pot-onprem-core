'use strict';

angular
  .module('homePage')
  .component('homePage', {
    templateUrl: 'home-page/home-page.template.html',
    controller: ['$rootScope', '$scope', '$location', 'localStorageService',
      function homePageController($rootScope, $scope, $location, localStorageService) {

        /* View Vars */

        /* Controller Functions */

        function configured () {
          return (localStorageService.get("urlBase"));
        }

        function authenticated() {
          return (localStorageService.get("accessToken"));
        }

        /* Initialize Page */

        if (configured() && authenticated()) {
          $rootScope.logInOutLink = "#!/logout";
          $rootScope.logInOutText = "Log Out";
        } else if (configured()) {
          $rootScope.logInOutLink = "#!/login";
          $rootScope.logInOutText = "Log In";
        } else {
          $location.path('/config');
        }
      }
    ]
  });