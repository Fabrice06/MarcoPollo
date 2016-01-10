(function () {
'use strict';

var myApp = angular.module('marcopolo', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      .when('/', {
    	  templateUrl: 'resources/accueil.html'      	  
      })
      .when('/persons', {
    	  templateUrl: 'resources/persons.html',
    	  controller: 'personCtrl'
      })
      .otherwise({
    	  redirectTo: '/'
      });
  }]);

myApp.controller('personCtrl', function ($scope) {
	  $scope.listePersonnes = [
	    {lastName: 'TOTO',firstName: 'Paul'},
	    {lastName: 'LULU',firstName: 'Isa'},
	    {lastName: 'BRIBRI',firstName: 'Carole'}
	  ];
	  $scope.unePersonne = {lastName:'Kiki'};
	});
})();




