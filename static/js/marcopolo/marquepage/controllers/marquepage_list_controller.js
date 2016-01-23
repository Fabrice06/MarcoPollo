(function () {
	'use strict';

	var myModuleController = angular.module('marcopolo');

	myModuleController.controller('marquepageListCtrl',['$scope','Marquepage','$routeParams','$location', function($scope,Marquepage,$routeParams,$location){

		//$scope.listMqp = Marquepage.query();
      //
		///* var test=$routeParams.id_marquepage
      //$scope.data = MarquepageListService.get({id:test});
      //$scope.unMqp = $scope.data;*/
      //
		//$scope.paramId = Marquepage.get();
		//$scope.unMqp = $scope.paramId;


        // clic sur le bouton rechercher
        $scope.onSearch = function () {

            console.log("clic marquepageListCtrl rechercher en cours");
        };

        // clic sur le bouton ajouter
        $scope.onAdd = function () {

            console.log("clic marquepageListCtrl ajouter en cours");
        };

        // clic sur le bouton déconnexion
        $scope.onProfil = function () {

            console.log("clic marquepageListCtrl déconnexion en cours");
            // pour test uniquement
            $location.path('/persons/2').replace();
        };

        // clic sur le bouton profil
        $scope.onExit = function () {

            $location.path('/').replace();
        };

	}]);

})();