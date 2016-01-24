(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['$scope', '$location', 'Person', 'CurrentPerson'];
    function personDetailCtrl($scope, $location, Person, CurrentPerson) {

        var nUrlArray = $location.url().split('/');
        var nId = nUrlArray[nUrlArray.length-1];

        console.log("personDetailCtrl url " + $location.url());
        console.log("personDetailCtrl nId " + nId);

        //** Récuperation et affichage des informations de la ressource person selectionnée*/
        $scope.personDetailModel = Person.query(
            {personid:nId},
            function (pPerson) { // OK
                console.log("personDetailCtrl query " + pPerson.mail);
                // sauvegarde de la ressource person
                CurrentPerson.setData(pPerson);
            },
            function (pData, headers) { // Erreur
                console.log("personDetailCtrl query échec");
            }
        );

        // clic sur le bouton déconnexion
        $scope.onExit = function () {

            CurrentPerson.setData(null); // ça couine pas??? c'est valide???
            $location.path('/').replace();
        };

        // clic sur le bouton supprimer
        $scope.onDelete = function () {

            // récup de l'id initial
            var nUriArray = CurrentPerson.getData._links.self.uri.split('/');
            var nId = nUrlArray[nUriArray.length-1];
            console.log("personDetailCtrl onDelete nId " + nId);

            Person.delete(
                {personid: nId},
                function () { // OK
                    console.log("personDetailCtrl onDelete ok: " + status);

                    CurrentPerson.setData(null); // ça couine pas mais c'est valide???
                    $location.path('/').replace();
                },
                function () { // Erreur
                    console.log("personDetailCtrl onDelete échec");
                }
            );
        };

        // clic sur le bouton annuler
        $scope.onCancel = function () {
            //console.log("personDetailCtrl cancel " + CurrentPerson.getData._links.marquepages.uri);
            $location.path(CurrentPerson.getData._links.marquepages.uri).replace();
        };

        $scope.onSubmit = function (pPersonDetail) {

            // récup de l'id initial
            var nUriArray = CurrentPerson.getData._links.self.uri.split('/');
            var nId = nUrlArray[nUriArray.length-1];
            console.log("personDetailCtrl onSubmit nId " + nId);

            //User.update(
            //    {personid : nId}, // Params
            //    stTMp, // Data
            //    function (data, headers) { // OK
            //        console.log("personDetailCtrl onSubmit ok");
            //    },
            //    function (data, headers) { // Erreur
            //        console.log("personDetailCtrl onSubmit echec");
            //    }
            //);

        };

    } // function

})();