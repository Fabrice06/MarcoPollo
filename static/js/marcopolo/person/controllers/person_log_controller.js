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
            Person.query({mail:pPersonLog.mail, mdp:pPersonLog.mdp},
                function (response) {
                    console.log("réussite login.query path " + response._links.marquepages.uri);

                    // remplace aprés le # dans la barre d'adresse
                    $location.path(response._links.marquepages.uri).replace();

                },
                // échec
                function (pData, headers) {
                    console.log("échec login.query");
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

        // pour test uniquement
        $scope.onTestA = function () {
            $location.path('/persons/2').replace();
        };
        $scope.onTestB = function () {
            $location.path('/persons/1/marquepages/2').replace();
        };
    } // function

})();