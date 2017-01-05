'use strict';

describe('myApp.homePage module', function() {

  beforeEach(module('myApp.homePage'));

  describe('homePage controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var homePageCtrl = $controller('HomePageCtrl');
      expect(homePageCtrl).toBeDefined();
    }));

  });
});