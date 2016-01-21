(function () {
'use strict';

    angular
        .module('marcopolo', [
            /*
             * Angular modules
             */
            'ngRoute',
            'ngResource',
            'ngMessages',
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

            // pour une url = 'persons?mail=mail@free.fr&mdp=myMdp'
            //$httpBackend.whenGET(new RegExp('persons\\?.*')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp('persons\\?.*')).respond(function (method, url) { // traitement FE sans BE
                console.log("login whenGET url " + url);

                console.log("pour le fun ;" + nJsonPersons);

                var nReturn = new Array();

                if ('persons?mail=mail@free.fr&mdp=myMdp' === url) {

                    nReturn.push(200); // requête effectuée avec succès
                    nReturn.push(JSON.stringify([{"id_person": 5}]));

                }else{
                    nReturn.push(404);	// la page demandée n'existe pas
                    nReturn.push('hep hep pas bien');
                } // else

                return nReturn;
            });

            $httpBackend.whenPOST(new RegExp('/persons$')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp(nRegexPersons)).passThrough(); // vers le backend
            $httpBackend.whenPUT(new RegExp(nRegexPersons)).passThrough(); // vers le backend
            $httpBackend.whenDELETE(new RegExp(nRegexPersons)).passThrough(); // vers le backend


        // marquepage ----------------------------------------------------------------------
        var nRegexMarquepages= '/marquepages/[0-9]{1,}';

            $httpBackend.whenPOST(new RegExp('/marquepages$')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend
            $httpBackend.whenPUT(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend
            $httpBackend.whenDELETE(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend

    } // function

})();

