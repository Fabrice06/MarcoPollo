(function () {
    'use strict';

    var myModuleController = angular.module('marcopolo.marquepageListCtrl',['ngResource','marcopolo.marquepageListService']);
    
    myModuleController.controller('marquepageListCtrl',['$scope','MarquepageListService','$routeParams','$location', function($scope,MarquepageListService,$routeParams,$location){
      
      $scope.listMqp = MarquepageListService.query();  
      
     /* var test=$routeParams.id_marquepage
      $scope.data = MarquepageListService.get({id:test});
      $scope.unMqp = $scope.data;*/
	
	$scope.paramId = MarquepageListService.get();
	$scope.unMqp = $scope.paramId;	

	      
    }]);
})();