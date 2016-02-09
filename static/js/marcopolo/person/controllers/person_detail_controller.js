(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['$scope', '$location', 'PersonZ', 'Language', 'Session', 'Hateoas', 'Crypto'];
    function personDetailCtrl($scope, $location, PersonZ, Language, Session, Hateoas, Crypto) {

        //** Récupération et affichage des informations de la ressource language*/
        Language.query('/langues', {}).then(
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


        //** Récuperation et affichage des informations de la ressource person selectionnée*/
        PersonZ.query($location.url(), {}).then(
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

            Session.clear();
            $location.path('/').replace();
        };

        // clic sur le bouton supprimer
        $scope.onDelete = function () {
alert("vraiment sûr?");
            PersonZ.delete(Hateoas.getUri("self"), {}).then(
                function successCallback(pResponse) { // OK pResponse est le retour du backEnd

                    // this callback will be called asynchronously
                    // when the response is available
                    console.log("personDetailCtrl onDelete ok ");

                    Session.clear();
                    $location.path('/').replace();

                },
                function errorCallback(pResponse) {

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("personDetailCtrl onDelete échec");
                }
            );
        };

        // clic sur le bouton Retour à ma liste de mqp
        $scope.onCancel = function () {

            $location.url(Hateoas.getUri("marquepages")).replace();
        };

        $scope.onSubmit = function (pPersonDetail) {

            var nMail = pPersonDetail.mail;
            var nLangue = pPersonDetail.langue.nom;

            // faire un check regex ????

            var nParams = {
                mail: nMail,
                langue: nLangue
            };
            console.log("personDetailCtrl " + JSON.stringify(nParams));

            PersonZ.update(Hateoas.getUri("self"), nParams).then(
                function successCallback(pResponse) { // OK pResponse est le retour du backEnd

                    // this callback will be called asynchronously
                    // when the response is available
                    console.log("personDetailCtrl onSubmit ok");

                    // ce service permets de conserver le mail et le mdp crypté pendant toute la session
                    Session.setId(pResponse.data.idPerson);

                    $location.url(Hateoas.getUri("marquepages")).replace();

                },
                function errorCallback(pResponse) {

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("personDetailCtrl onSubmit échec");
                }
            );
        };

    } // function

})();