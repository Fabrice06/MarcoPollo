(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['$scope', '$location', 'PersonZ', 'Language', 'Session', 'Hateoas'];
    function personDetailCtrl($scope, $location, PersonZ, Language, Session, Hateoas) {

        //var nUri = Session.getSignedUri('/langues');
        var nUri = '/langues';
        //** Récupération et affichage des informations de la ressource language*/
        Language.query(nUri, {}).then(
            function successCallback(pResponse) {

                // this callback will be called asynchronously
                // when the response is available
                console.log("personDetailCtrl query langues ok " + JSON.stringify(pResponse.data));
                $scope.languages = pResponse.data;
            },
            function errorCallback(pResponse) {

                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("personDetailCtrl query langues échec");
            }
        );

        //nUri = Session.getSignedUri($location.url());
        nUri = $location.url();
        //** Récuperation et affichage des informations de la ressource person selectionnée*/
        PersonZ.query(nUri, {}).then(
            function successCallback(pResponse) {

                // this callback will be called asynchronously
                // when the response is available
                console.log("personDetailCtrl query person ok " + JSON.stringify(pResponse.data));
                $scope.personDetailModel = pResponse.data;

                // ce service fourni directement les liens hateoas sous forme de clé/valeur
                Hateoas.setLinks(pResponse.data.links);

                // sélection de la langue
                for (var i = 0; i< $scope.languages.length; i++) {
                    if ($scope.languages[i].nom === pResponse.data.langue) {
                        $scope.personDetailModel.langue = $scope.languages[i];
                        break;
                    } // if
                } // for

            },
            function errorCallback(pResponse) {

                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("personDetailCtrl query person échec");
            }
        );

        // clic sur le bouton déconnexion
        $scope.onExit = function () {

            //CurrentPerson.setData(null); // ça couine pas??? c'est valide???
            Session.clear();
            $location.path('/').replace();
        };

        // clic sur le bouton supprimer
        $scope.onDelete = function () {        	
            //Person.delete(
            //    {
            //        uri:nUrlArray[1],
            //        id:nUrlArray[2]
            //    },
            //    function () { // OK
            //        console.log("personDetailCtrl onDelete ok: " + status);
            //
            //        CurrentPerson.setData(null); // ça couine pas mais c'est valide???
            //        $location.path('/').replace();
            //    },
            //    function () { // Erreur
            //        console.log("personDetailCtrl onDelete échec");
            //    }
            //);
            //alert('Cet adresse e-mail a été supprimée');
            //$location.path('/').replace();
        };

        // clic sur le bouton Retour à ma liste de mqp
        $scope.onCancel = function () {

            var nUri = Hateoas.getUri("marquepages");

            // utilisation de la requête à usage unique
            //$location.url(Session.getSignedUri(nUri)).replace();

            $location.url(nUri).replace();
        };

        $scope.onSubmit = function (pPersonDetail) {
        	         
            //Person.update(
            //    {
            //        uri : nUrlArray[1],
            //        id : nUrlArray[2],
            //        mail : pPersonDetail.mail
            //    },
            //    pPersonDetail
            //    ,
            //    function (pPerson) { // OK
            //
            //        console.log("pPersonDetail update ok");
            //        alert('Votre profil a bien été mis à jour');
            //
            //        // remplace aprés le # dans la barre d'adresse
            //        for	(var index = 0; index < pPerson.links.length; index++) {
            //
            //            if ("marquepages" === pPerson.links[index].rel) {
            //
            //                var nUrl = pPerson.links[index].href;
            //                var nPort = $location.port(nUrl);
            //                var nPathArray = nUrl.split(nPort);
            //                $location.url(nPathArray[1]).replace();
            //
            //                break;
            //            } // if
            //        } // for
            //    },
            //    function (pData, headers) { // Erreur
            //        console.log("pPersonDetail update échec, mail : "+pPersonDetail.mail);
            //    }
            //);

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