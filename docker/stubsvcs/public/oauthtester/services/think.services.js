'use strict';

angular
  .module('thinkServices')
  .factory("Think", ['$resource',
    function ($resource) {

      return {
        Item: function (options) {
          return $resource(
            options.apiUrl,
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
        OAuth: function (options) {
          return $resource(
            options.tokenUrl,
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