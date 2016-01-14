'use strict';
var myControllers = angular.module('marcopolo.Controllers',['marcopolo.Services']);

myControllers.controller('personCtrl',['$scope','PersonService', function ($scope,PersonService) {
	$scope.listePersonnes = PersonService;
	                 
		
}]);