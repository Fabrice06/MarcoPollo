(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personNewCtrl', personNewCtrl);

    personNewCtrl.$inject = ['$scope', '$location', 'Person'];
    function personNewCtrl($scope, $location, Person) {


        // clic sur le bouton déconnexion
        $scope.onExit = function () {

            $location.path('/').replace();
        };

        // clic sur le bouton annuler
        $scope.onCancel = function () {

            $location.path('/').replace();
        };

        // clic sur le bouton valider
        $scope.onSubmit = function (pPersonModel) {
        	
        	//alert('Votre adresse e-mail a bien été mise à jour');
            // récup de l'id initial
//            var nUriArray = CurrentPerson.getData._links.self.uri.split('/');
//            var nId = nUrlArray[nUriArray.length-1];
//            console.log("personDetailCtrl onSubmit nId " + nId);
            
            //Person.update(
            //        {
            //        	uri : nUrlArray[1],
            //        	id : nUrlArray[2],
            //        	mail : pPersonDetail.mail
            //        },
            //        pPersonDetail
            //        ,
            //        function (pPerson) { // OK
            //
            //            console.log("pPersonDetail update ok");
            //
            //            // remplace aprés le # dans la barre d'adresse
            //            for	(var index = 0; index < pPerson.links.length; index++) {
            //
            //                if ("marquepages" === pPerson.links[index].rel) {
            //
            //                    var nUrl = pPerson.links[index].href;
            //                    var nPort = $location.port(nUrl);
            //                    var nPathArray = nUrl.split(nPort);
            //                    $location.url(nPathArray[1]).replace();
            //
            //                    break;
            //                } // if
            //            } // for
            //        },
            //        function (pData, headers) { // Erreur
            //            console.log("pPersonDetail update échec, mail : "+pPersonDetail.mail);
            //        }
            //    );

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

            //if (angular.isUndefined(pPersonLog)){
            //    //alert('personLogCtrl onCreate en cours');
            //}
            //else {
            //
            //    Person.save(
            //        {
            //            uri:'persons',
            //            mail:pPersonLog.mail,
            //            mdp:pPersonLog.mdp
            //        },
            //        pPersonLog
            //        ,
            //        function (pPerson) { // OK pPerson est le retour du backEnd
            //
            //            console.log("personLogCtrl query ok");
            //
            //            // remplace aprés le # dans la barre d'adresse
            //            for	(var index = 0; index < pPerson.links.length; index++) {
            //
            //                if ("marquepages" === pPerson.links[index].rel) {
            //
            //                    var nUrl = pPerson.links[index].href;
            //                    var nPort = $location.port(nUrl);
            //                    var nPathArray = nUrl.split(nPort);
            //                    $location.url(nPathArray[1]).replace();
            //
            //                    break;
            //                } // if
            //            } // for
            //        },
            //        function (pData, headers) { // Erreur
            //            console.log("personLogCtrl query échec");
            //        }
            //    );
            //}

        };

    } // function

})();