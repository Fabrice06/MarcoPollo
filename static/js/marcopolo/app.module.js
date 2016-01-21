(function () {
'use strict';

    angular
        .module('marcopolo', [
            /*
             * Angular modules
             */
            'ngRoute',
            'ngResource',

            'ngMockE2E'
        ])
        .run(mockBackend);

    mockBackend.$inject = ['$httpBackend','$resource', '$http'];
    function mockBackend($httpBackend, $resource, $http) {

        console.log("Warning: httpBackend mode");

        // récup des datas json -------------------------------------------------------------
            var nJsonPersons = null;
            $httpBackend.whenGET('js/json/person_list.json').passThrough();
            $http.get('js/json/person_list.json').success(function (response) {
                nJsonPersons = JSON.stringify(response);
                //nJsonPersons = response;
            });

            var nJsonMarquepages = null;
            $httpBackend.whenGET('js/json/marquepage_list.json').passThrough();
            $http.get('js/json/marquepage_list.json').success(function (response) {
                nJsonMarquepages = JSON.stringify(response);
            });


        // pages html ----------------------------------------------------------------------
            $httpBackend.whenGET(new RegExp('/.*\.html$')).passThrough();


        // person --------------------------------------------------------------------------
        var nRegexPersons= '/persons/[0-9]{1,}';

            //$httpBackend.whenGET(new RegExp('persons\\?.*')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp('persons\\?.*')).respond(function (method, url) { // traitement FE sans BE

                console.log("person?mail&mdp whenGET url params " + url.split("?")[1]);

                var nReturn = new Array(); // valeur de retour par défaut: http status et data
                nReturn.push(404);	// la page demandée n'existe pas
                nReturn.push(null);

                var nParams = url.split("?")[1]; // récup des params aprés le ? dans l'url
                var nPersons = angular.fromJson(nJsonPersons);

                for (var i = 0, len = nPersons.length; i < len; i++) {

                    if ("mail=" + nPersons[i].mail + "&mdp=" + nPersons[i].mdp === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        nReturn[1] = JSON.stringify([{"id_person": nPersons[i].id_person}]);
                        break;
                    } // if
                    console.log("mail=" + nPersons[i].mail + "&mdp=" + nPersons[i].mdp);
                } // for

                return nReturn;
            });

            //$httpBackend.whenGET(new RegExp(nRegexPersons)).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp(nRegexPersons)).respond(function (method, url) { // traitement FE sans BE

                console.log("person/id whenGET url params " + url.split("/")[1]);

                var nReturn = new Array();
                    nReturn.push(404);	// la page demandée n'existe pas
                    nReturn.push(null);

                var nParams = url.split("/")[1];
                var nPersons = angular.fromJson(nJsonPersons);

                for (var i = 0, len = nPersons.length; i < len; i++) {

                    if (nPersons[i].id_person === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        nReturn[1] = JSON.stringify([{"id_person": nPersons[i].id_person}]);
                        break;
                    } // if
                    console.log("id_person=" + nPersons[i].id_person);
                } // for

                return nReturn;
            });

            $httpBackend.whenPUT(new RegExp(nRegexPersons)).passThrough(); // vers le backend
            $httpBackend.whenPOST(new RegExp('persons\\?.*')).passThrough(); // vers le backend

            // requêtes non prise en compte
            $httpBackend.whenGET(new RegExp('/persons$')).passThrough(); // vers le backend
            $httpBackend.whenDELETE(new RegExp(nRegexPersons)).passThrough(); // vers le backend


        // marquepage ----------------------------------------------------------------------
        var nRegexMarquepages= '/marquepages/[0-9]{1,}';

            $httpBackend.whenPOST(new RegExp('/marquepages$')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend
            $httpBackend.whenPUT(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend
            $httpBackend.whenDELETE(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend

    } // function

})();

