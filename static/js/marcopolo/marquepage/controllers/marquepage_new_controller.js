(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('marquepageNewCtrl', marquepageNewCtrl);

    marquepageNewCtrl.$inject = ['$scope', '$resource', '$location', 'Marquepage'];
    function marquepageNewCtrl($scope, $resource, $location, Marquepage) {
        
        var mqp = '';
        var url = '';
        var tags = new Array(); 
        var tag = '';
        var cle = '';
        var valeur ='';
        
        $scope.mqp = {url:'url', tags:[]};
        $scope.tag = {cle:'', valeur:''};
        
        
        function ajoutTag() {
            $scope.tag.cle="hello";  
        };
        
        $scope.valider() = function(mqp) {
            Marquepage.save(
                {
                    uri:'/persons',
                    mail:pPersonLog.mail,
                    mdp:pPersonLog.mdp
                },
                function (pPerson) { // OK
                    console.log("personLogCtrl query path " + pPerson._links.marquepages.uri);

                    // remplace aprés le # dans la barre d'adresse
                    $location.path(pPerson._links.marquepages.uri).replace();

                },
                function (pData, headers) { // Erreur
                    console.log("personLogCtrl query échec");
                }
            );
            // utiliser la methode .save() pour faire un POST
            
        };
        
        		
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