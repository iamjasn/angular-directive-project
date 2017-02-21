'use strict';

describe('myApp.main module', function() {
  var compile, scope, dirEl, input, model;

  beforeEach(function() {
    module('myApp.main');
    inject(function($compile, $rootScope){
      compile = $compile;
      scope = $rootScope.$new();
    });
    dirEl = getCompiledElement()[0];
    model = angular.element(dirEl).controller('ngModel');
  });

  function getCompiledElement() {
    var element = angular.element('<input type="number" name="float" ng-model="percentage" percentage-convert>');
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  describe('directive', function() {

    it('should be defined', function() {
      expect(dirEl).toBeDefined();
    });

    it('should have type number', function() {
      expect(dirEl.type).toBe('number');
    });

    it('should recognize a number greater than 1 as invalid input', function() {
      model.$setViewValue('2');
      scope.$digest();
      expect(model.$invalid).toBeTruthy();
    });

    it('should recognize a negative number as invalid input', function() {
      model.$setViewValue('-1');
      scope.$digest();
      expect(model.$invalid).toBeTruthy();
    });

    it('should recognize a float between 0 and 1 as valid input', function() {
      model.$setViewValue('0.25');
      scope.$digest();
      expect(model.$valid).toBeTruthy();
    });

    it('should convert a float input to a percentage value', function() {
      model.$setViewValue('0.55');
      scope.$digest();
      expect(model.$modelValue).toBeCloseTo(55);
    });
  });
});