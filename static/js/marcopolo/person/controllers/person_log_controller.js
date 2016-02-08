(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personLogCtrl', personLogCtrl);

    personLogCtrl.$inject = ['$scope', '$location', '$filter', 'Person', 'Crypto', 'Hateoas', 'Session'];
    function personLogCtrl($scope, $location, $filter, Person, Crypto, Hateoas, Session) {

        Session.clear();

        // clic sur le bouton se connecter
        $scope.onSubmit = function (pPersonLog) {

            var nMdp = Crypto.SHA1(pPersonLog.mdp);
            console.log("personLogCtrl Crypto mdp >" + nMdp + "<");

            Person.query(
                {
                    uri:'persons',
                    mail:pPersonLog.mail,
                    mdp:pPersonLog.mdp
                    //mdp:nMdp
                },
                function (pPerson) { // OK pPerson est le retour du backEnd
                	if (angular.isUndefined(pPerson.links)){
                		//$scope.incorrectLogin = true;
                		console.log("personLogCtrl query ok but Person don't exist");

                	} else {
	                    console.log("personLogCtrl query ok");

                        var nMail = Crypto.SHA1(pPersonLog.mail);
                        console.log("personLogCtrl Crypto mail >" + nMail + "<");
                        // ce service permets de conserver le mail et le mdp crypté pendant toute la session
                        Session.setMail(nMail);
                        Session.setMdp(nMdp);

                        // ce service fourni directement les liens hateoas sous forme de clé/valeur
                        Hateoas.set(pPerson.links);
                        var nUrl = Hateoas.getUri("marquepages");
                        // remplace aprés le # dans la barre d'adresse
                        var nPort = $location.port(nUrl);
                        var nPathArray = nUrl.split(nPort);

                        // préparation de la requête à usage unique
                            var nUri = nPathArray[1] + Session.getStamp();
                            var nSignature = Crypto.HmacSHA1(nUri, nMdp);
                            nUri = nUri + "&signature=" + nSignature;

                            // nUri = /persons/1/marquepages?user=3626810c003760d1c278a356c450af9abe695ce9&timestamp=12341523&signature=3626810c003760d1c278a356c450
                            console.log("personLogCtrl Crypto uri >" + nUri + "<");
                            //$location.url(nUri).replace();

                        $location.url(nPathArray[1]).replace();

                	}
                },
                function (pData, headers) { // Erreur

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