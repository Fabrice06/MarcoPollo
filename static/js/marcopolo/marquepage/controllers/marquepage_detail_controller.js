(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('marquepageDetailCtrl', marquepageDetailCtrl);


    marquepageDetailCtrl.$inject = ['$scope', '$resource', '$location', 'Marquepage'];
    function marquepageDetailCtrl($scope, $resource, $location, Marquepage) {

		$scope.lien = "http://monLien.com";
		
		$scope.tags = [ 
			{
				"id_tag": 1, 
				"cle": "nom",
				"valeur":"Google"
			}, 
			{
				"id_tag": 2, 
				"cle": "description",
				"valeur":"idée déco"
			}, 
			{
				"id_tag": 3, 
				"cle": "description",
				"valeur":"cours android"
			},
			{
				"id_tag": 4, 
				"cle": "date",
				"valeur":"2014"
			},
			{
				"id_tag": 5,  
				"cle": "description",
				"valeur":"cours Prog Web"
			},
			{
				"id_tag": 6,  
				"cle": "description",
				"valeur":"Systeme-Reseaux"
			}
		] ;
		
		$scope.cles = [
			{
				"id_cle":1,
				"cle": "nom"
			},
			{
				"id_cle":2,
				"cle": "description"
			},
			{
				"id_cle":3,
				"cle": "couleur"
			},
			 {
				"id_cle":4,
				"cle": "date"
			}
		];
		
		 // clic sur le bouton déconnexion
        $scope.onProfil = function () {

            console.log("clic marquepageDetailCtrl déconnexion en cours");
            // pour test uniquement
            $location.path('/persons/2').replace();
        };

        // clic sur le bouton profil
        $scope.onExit = function () {

            $location.path('/').replace();
        };
		
        
    } // function

})();