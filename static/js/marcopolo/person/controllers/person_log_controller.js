(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personLogCtrl', personLogCtrl);

    personLogCtrl.$inject = ['$scope', '$location', 'Person'];
    function personLogCtrl($scope, $location, Person) {
    	$scope.incorrectLogin = false;

        // clic sur le bouton se connecter
        $scope.onSubmit = function (pPersonLog) {

            //calls http://localhost:63342/static/persons?mail=MyMail&mdp=myMdp
            Person.query(
                {
                    uri:'persons',
                    mail:pPersonLog.mail,
                    mdp:pPersonLog.mdp
                },
                function (pPerson) { // OK pPerson est le retour du backEnd

                    console.log("personLogCtrl query ok");

                    // remplace aprés le # dans la barre d'adresse
                    for	(var index = 0; index < pPerson.links.length; index++) {

                        if ("marquepages" === pPerson.links[index].rel) {

                            var nUrl = pPerson.links[index].href;
                            var nPort = $location.port(nUrl);
                            var nPathArray = nUrl.split(nPort);
                            $location.url(nPathArray[1]).replace();

                            break;
                        } // if
                    } // for
                },
                function (pData, headers) { // Erreur
                	$scope.incorrectLogin = true;
                    console.log("personLogCtrl query échec");
                }
            );
        };

        // clic sur le bouton se connecter
        $scope.onCreate = function (pPersonLog) {
            // pour test uniquement
            //alert('personLogCtrl onCreate en cours');
            Person.save(
                    {
                        uri:'persons',
                        mail:pPersonLog.mail,
                        mdp:pPersonLog.mdp
                    },
                    pPersonLog
                    ,
                    function (pPerson) { // OK pPerson est le retour du backEnd

                        console.log("personLogCtrl query ok");

                        // remplace aprés le # dans la barre d'adresse
                        for	(var index = 0; index < pPerson.links.length; index++) {

                            if ("marquepages" === pPerson.links[index].rel) {

                                var nUrl = pPerson.links[index].href;
                                var nPort = $location.port(nUrl);
                                var nPathArray = nUrl.split(nPort);
                                $location.url(nPathArray[1]).replace();

                                break;
                            } // if
                        } // for
                    },
                    function (pData, headers) { // Erreur
                        console.log("personLogCtrl query échec");
                    }
                );
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
            $scope.onTestD = function () {
                // direct vers sandbox
                $location.path('/yapafoto').replace();
            };
        // pour test uniquement ---------------------------------------------------
    } // function

})();