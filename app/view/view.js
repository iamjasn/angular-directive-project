'use strict';

angular.module('myApp.view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view', {
    templateUrl: 'view/view.html',
    controller: 'ViewCtrl'
  });
}])

.controller('ViewCtrl', [function() {
  this.title = 'Formstack Front End Developer Applicant Assignment';
}])

.directive('percentageConvert', function ($filter) {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        var value = parseFloat(viewValue);
        if (value >= 0 && value <= 1) {
          ctrl.$setValidity('number', true);
          return value * 100;
        } else {
          ctrl.$setValidity('number', false);
          return false;
        }
      });
    }
  };
});