(function () {
'use strict';

var myApp = angular.module('marcopolo', ['ngRoute','ngResource','marcopolo.Controllers','marcopolo.Services']);

myApp.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      .when('/', {

    	  templateUrl: 'views/login.html'      	  
      })
      .when('/liens', {
    	  templateUrl: 'views/liens.html',
    	  controller: 'personCtrl'
      })
	.when('/persons', {
    	  templateUrl: 'views/persons.html',
    	  controller: 'personCtrl'
      })
      .otherwise({
    	  redirectTo: '/'
      });
  }]);


myApp.controller('personCtrl', function ($scope, $http) {
	$http.get('/persons').
		success(function(data){
			$scope.listePersonnes = data;
			$scope.unePersonne = data[0];
		});	
	});
	
})();

