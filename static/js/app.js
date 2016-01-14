(function () {
'use strict';

var myApp = angular.module('marcopolo', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
      .when('/', {
    	  templateUrl: 'views/login.html'      	  
      })
      .when('/liens', {
    	  templateUrl: 'views/liens.html',
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





/*
 $scope.listePersonnes = [
	    {lastName: 'TOTO',firstName: 'Paul'},
	    {lastName: 'LULU',firstName: 'Isa'},
	    {lastName: 'BRIBRI',firstName: 'Carole'}
	  ];
	  $scope.unePersonne = {lastName:'Kiki'};
	  */