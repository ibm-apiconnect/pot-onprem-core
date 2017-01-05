'use strict';

angular
  .module('thinkServices')
  .factory("Think", ['$resource',
    function ($resource) {

      return {
        Item: function (options) {
          return $resource(
            options.urlBase + '/inventory/items/:id',
            {id: '@id'},
            {
              'get': {
                method:'GET',
                headers: options.headers
              },
              'query': {
                method:'GET',
                isArray:true,
                headers: options.headers
              }
            });
        },
        Review: function (options) {
          return $resource(
            options.urlBase + '/inventory/items/:id/reviews',
            {id: '@id'},
            {
              'save': {
                method:'POST',
                headers: options.headers,
                transformRequest: function (data) {
                  return JSON.stringify(data.body);
                }
              },
              'query': {
                method:'GET', 
                isArray:true, 
                headers: options.headers
              }
            });
        },
        Financing: function (options) {
          return $resource(
            options.urlBase + '/financing/calculate',
            {},
            {
              'get': {
                method: 'GET',
                headers: options.headers
              }
            });
        },
        Shipping: function (options) {
          return $resource(
            options.urlBase + '/logistics/shipping',
            {},
            {
              'get': {
                method: 'GET',
                headers: options.headers
              }
            });
        },
        Stores: function (options) {
          return $resource(
            options.urlBase + '/logistics/stores',
            {},
            {
              'get': {
                method: 'GET',
                headers: options.headers
              }
            });
        },
        OAuth: function (options) {
          return $resource(
            options.urlBase + '/oauth2/token',
            {},
            {
              'getToken': {
                method: 'POST',
                headers: options.headers,
                transformRequest: function (data, headersGetter) {
                  var str = [];
                  for (var d in data)
                    str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                  return str.join("&");
                }
              }
            });
          }
        }
    }
  ]);