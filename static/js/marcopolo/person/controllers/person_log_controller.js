(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personLogCtrl', personLogCtrl);

    personLogCtrl.$inject = ['$scope', '$location', 'Person'];
    function personLogCtrl($scope, $location, Person) {

        // clic sur le bouton se connecter
        $scope.onSubmit = function (pPersonLog) {

            //calls http://localhost:63342/static/persons?mail=MyMail&mdp=myMdp
            Person.query(
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
        };

        // clic sur le bouton se connecter
        $scope.onCreate = function (pPersonLog) {
            // pour test uniquement
            alert('personLogCtrl onCreate en cours');
        };

        // clic sur le liem mot de passe perdu
        $scope.onLost = function(pPersonLog){
            alert('Un mot de passe provisoire a été envoyé à votre adresse e-mail');
        };


        // pour test uniquement ---------------------------------------------------
            $scope.onTestA = function (pIdPerson) {
                // direct vers persons-detail
                $location.path('/persons/' + pIdPerson).replace();
            };
            $scope.onTestB = function (pIdPerson) {
                // direct vers marquepages-detail
                $location.path('/persons/' + pIdPerson + '/marquepages/2').replace();
            };
            $scope.onTestC = function (pIdPerson) {
                // direct vers marquepages-list
                $location.path('/persons/' + pIdPerson + '/marquepages').replace();
            };
        // pour test uniquement ---------------------------------------------------
    } // function

})();