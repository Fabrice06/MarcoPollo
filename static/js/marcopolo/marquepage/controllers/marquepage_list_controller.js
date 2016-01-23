(function () {
    'use strict';

<<<<<<< HEAD
    var myModuleController = angular.module('marcopolo.marquepageListCtrl',['ngResource','marcopolo.marquepageListService']);
    
    myModuleController.controller('marquepageListCtrl',['$scope','MarquepageListService','$routeParams','$location', function($scope,MarquepageListService,$routeParams,$location){
      
      $scope.listMqp = MarquepageListService.query();  
      
     /* var test=$routeParams.id_marquepage
      $scope.data = MarquepageListService.get({id:test});
      $scope.unMqp = $scope.data;*/
	
	$scope.paramId = MarquepageListService.get();
	$scope.unMqp = $scope.paramId;	
=======
    angular
        .module('marcopolo')
        .controller('marquepageListCtrl', marquepageListCtrl);

    marquepageListCtrl.$inject = ['$scope', '$resource', '$location', 'Marquepage'];
    function marquepageListCtrl($scope, $resource, $location, Marquepage) {

    } // function
>>>>>>> e510b19950ec52613773c8ae1fed557127bd0feb

	      
    }]);
})();