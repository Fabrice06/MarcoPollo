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

        $scope.confirmation = function(){
            alert('Un mot de passe provisoire a été envoyé à votre adresse e-mail');
        };

        $scope.envoyerMail = function(){

        };

    } // function

})();