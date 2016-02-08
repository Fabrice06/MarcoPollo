(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personLogCtrl', personLogCtrl);

    personLogCtrl.$inject = ['$scope', '$location', '$filter', 'PersonZ', 'Crypto', 'Hateoas', 'Session'];
    function personLogCtrl($scope, $location, $filter, PersonZ, Crypto, Hateoas, Session) {

        Session.clear();

        // clic sur le bouton se connecter
        $scope.onSubmit = function (pPersonLog) {

            var nMail = pPersonLog.mail;
            //var nMdp = Crypto.SHA1(pPersonLog.mdp);
            var nMdp = pPersonLog.mdp;

            // faire un check regex ????

            var nParams = {
                mail: nMail,
                mdp: nMdp
            };
            console.log("personLogCtrl " + JSON.stringify(nParams));

            PersonZ.query('/persons', nParams).then(
                function successCallback(pResponse) { // OK pResponse est le retour du backEnd

                    // this callback will be called asynchronously
                    // when the response is available
                    if (angular.isUndefined(pResponse.data.links)) {
                        console.log("personLogCtrl query ok but Person don't exist");

                    } else {
                        console.log("personLogCtrl save ok " + JSON.stringify(pResponse.data));

                        var nMail = Crypto.SHA1(pResponse.data.mail);
                        console.log("personLogCtrl Crypto mail >" + nMail + "<");

                        // ce service permets de conserver le mail et le mdp crypté pendant toute la session
                        Session.setCurrent(nMail, nMdp);

                        // ce service fourni directement les liens hateoas sous forme de clé/valeur
                        Hateoas.setLinks(pResponse.data.links);
                        var nUri = Hateoas.getUri("marquepages");

                        // utilisation de la requête à usage unique
                        //$location.url(Session.getSignedUri(nUri)).replace();

                        $location.url(nUri).replace();
                    } // else

                },
                function errorCallback(pResponse) {

                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log("personLogCtrl query échec");
                }
            );
        };

        // clic sur le bouton nouvel utilisateur
        $scope.onNew = function () {

            $location.url("/persons/new").replace();

        	//if (angular.isUndefined(pPersonLog)){
        	//	//alert('personLogCtrl onCreate en cours');
        	//}
        	//else {
        	//
	        //    Person.save(
	        //            {
	        //                uri:'persons',
	        //                mail:pPersonLog.mail,
	        //                mdp:pPersonLog.mdp
	        //            },
	        //            pPersonLog
	        //            ,
	        //            function (pPerson) { // OK pPerson est le retour du backEnd
            //
	        //                console.log("personLogCtrl query ok");
            //
	        //                // remplace aprés le # dans la barre d'adresse
	        //                for	(var index = 0; index < pPerson.links.length; index++) {
            //
	        //                    if ("marquepages" === pPerson.links[index].rel) {
            //
	        //                        var nUrl = pPerson.links[index].href;
	        //                        var nPort = $location.port(nUrl);
	        //                        var nPathArray = nUrl.split(nPort);
	        //                        $location.url(nPathArray[1]).replace();
            //
	        //                        break;
	        //                    } // if
	        //                } // for
	        //            },
	        //            function (pData, headers) { // Erreur
	        //                console.log("personLogCtrl query échec");
	        //            }
	        //        );
        	//}
        };
        
        //$scope.doSomething = function() {
        //	focus('useremail');
        //};

        // clic sur le lien mot de passe perdu
        $scope.onLost = function(pPersonLog){
			       	
            alert($filter('translate')('PERSON_MESSAGE'));
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
    
    //angular
    //	.module('marcopolo')
    //	.factory('focus', function($timeout, $window) {
    //		return function(id) {
	 //         // timeout makes sure that is invoked after any other event has been triggered.
	 //         // e.g. click events that need to run before the focus or
	 //         // inputs elements that are in a disabled state but are enabled when those events
	 //         // are triggered.
	 //         $timeout(function() {
	 //           var element = $window.document.getElementById(id);
	 //           if(element)
	 //             element.focus();
	 //         });
    //		};
    //	})

})();