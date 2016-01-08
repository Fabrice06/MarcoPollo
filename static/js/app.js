(function(){
'use strict';

var myApp = angular.module('tp7',['ngRoute']);

myApp.config(['$routeProvider',function($routeProvider) {
      $routeProvider
      .when('/', {
    	  templateUrl: 'accueil.html'      	  
      })
      .when('/persons', {
    	  templateUrl: 'persons.html',
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




