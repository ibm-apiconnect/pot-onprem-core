'use strict';

// Declare app level module which depends on views, and components
angular
  .module('myApp').
  config(['$locationProvider', '$routeProvider', 'localStorageServiceProvider',
    function config($locationProvider, $routeProvider, localStorageServiceProvider) {
      
      $locationProvider.html5Mode(false).hashPrefix('!');

      localStorageServiceProvider.setPrefix('oauthtester').setStorageType('sessionStorage');

      //noinspection JSUnresolvedFunction
      $routeProvider.
        when('/', {
          template: '<home-page></home-page>'
        }).
        when('/config', {
          template: '<app-config></app-config>'
        }).
        when('/logout', {
          template: '<app-logout></app-logout>'
        }).
        otherwise('/');
      
    }
  ]);
