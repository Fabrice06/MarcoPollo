(function () {
'use strict';

var myApp = angular.module('marcopolo', ['ngRoute','ngResource','marcopolo.Controllers','marcopolo.Services']);

myApp.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      .when('/', {
    	  templateUrl: 'views/accueil.html'      	  
      })
      .when('/persons', {
    	  templateUrl: 'views/persons.html',
    	  controller: 'personCtrl'
      })
      .otherwise({
    	  redirectTo: '/'
      });
  }]);
	
})();

