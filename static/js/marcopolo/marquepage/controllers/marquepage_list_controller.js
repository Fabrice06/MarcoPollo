(function () {
	'use strict';

	var myModuleController = angular.module('marcopolo');

	myModuleController.controller('marquepageListCtrl',['$scope','MarquepageList','Marquepage','$routeParams','$location', function($scope,MarquepageList,Marquepage,$routeParams,$location){

           
        // pour test ---------------------------------------------------
        var nUrlArray = $location.url().split('/');
        //console.log("marquepageListCtrl url " + $location.url());

        var nAddLink = "";
        var nProfilLink = "";
    
        // Récuperation des marquepages d'une personne
        
        $scope.listMqp = MarquepageList.query({
        	id:nUrlArray[2]
        });
                
        // pour test ---------------------------------------------------

        // clic sur le bouton rechercher
        $scope.onSearch = function () {

            alert('clic marquepageListCtrl rechercher en cours');
        };

        // clic sur le bouton ajouter
        $scope.onAdd = function () {

            console.log("clic marquepageListCtrl ajouter en cours");

            // pour test uniquement
            $location.path(nAddLink+'/new').replace();

        };

        // clic sur le bouton déconnexion
        $scope.onProfil = function () {

            console.log("clic marquepageListCtrl déconnexion en cours");
            // pour test uniquement
            $location.path(nProfilLink).replace();
        };

        // clic sur le bouton profil
        $scope.onExit = function () {

            $location.path('/').replace();
        };

	}]);

})();