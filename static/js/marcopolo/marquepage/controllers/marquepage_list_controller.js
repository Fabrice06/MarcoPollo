(function () {
	'use strict';

	var myModuleController = angular.module('marcopolo');

	myModuleController.controller('marquepageListCtrl',['$scope','MarquepageList','$routeParams','$location', function($scope,MarquepageList,$routeParams,$location){


        // vince: -----------------------------------------------------
        // pas de panique: j'ai modifié ces lignes suivantes car il y avait des erreurs bloquantes dans la console.
        // et j'avais besoin d'implanter les différents clics

            //$scope.listMqp = Marquepage.query();

            ///* var test=$routeParams.id_marquepage
            //$scope.data = MarquepageListService.get({id:test});
            //$scope.unMqp = $scope.data;*/

            //$scope.paramId = Marquepage.get();
            //$scope.unMqp = $scope.paramId;
        // vince: -----------------------------------------------------


        // pour test ---------------------------------------------------
        var nUrlArray = $location.url().split('/');
        console.log("marquepageListCtrl url " + $location.url());

        var nAddLink = "";
        var nProfilLink = "";

        //** Récuperation des informations de la ressource marquepagelist selectionnée*/
        MarquepageList.query(
            {
                id:nUrlArray[2]
            },
            function (pMarquepageList) { // OK
                console.log("marquepageListCtrl query " + JSON.stringify(pMarquepageList));
                //console.log("marquepageListCtrl query lien pour onProfils " + pMarquepageList._links.persons.uri);
                nProfilLink = pMarquepageList._links.persons.uri;

                //console.log("marquepageListCtrl query lien pour onAdd " + pMarquepageList._links.self.uri);
                nAddLink = pMarquepageList._links.self.uri;
            },
            function (pData, headers) { // échec
                console.log("marquepageListCtrl query échec");
            }
        );
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