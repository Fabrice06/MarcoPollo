(function () {
'use strict';

    var myApp = angular.module('marcopolo', ['ngRoute','ngResource','ngMockE2E', 'marcopolo.marquepageListCtrl', 'marcopolo.marquepageListService']);
    myApp.run(mockBackend);

    mockBackend.$inject = ['$httpBackend','$resource','$location', '$http','$routeParams'];
    function mockBackend($httpBackend, $resource, $http,$routeParams,$location) {
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
            
            $httpBackend.whenGET(new RegExp('/marquepages$')).respond(function (method, url) { // traitement FE sans BE
            	console.log("whenGET sans id");            
            	var nReturn = new Array();

                if (true) {
                    nReturn.push(200); // requête effectuée avec succès
                    nReturn.push(nJsonMarquepages);

                }else{
                    nReturn.push(404);	// la page demandée n'existe pas
                    nReturn.push(null);
                } // else

                return nReturn;
            }); 
            
            $httpBackend.whenGET(new RegExp('/marquepages/1$')).respond(function (method, url) { // traitement FE sans BE
            	console.log("whenGET avec id");
            	var nReturn = new Array(); // valeur de retour par défaut: http status et data
//                nReturn.push(404);	// la page demandée n'existe pas
//                nReturn.push(null);
//
//                var nParams = url.split("/")[1]; // récup des params aprés le ? dans l'url
//                console.log(nParams);
//                var nMarquePages = angular.fromJson(nJsonMarquepages);
//console.log(JSON.stringify(nJsonMarquepages));
//                for (var i = 0, len = nMarquePages.length; i < len; i++) {
//
//                    if ("id_marquepage=" + nMarquePages[i].id_marquepage === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        nReturn[1] = JSON.stringify([{"id_marquepage":3}]);
//                        break;
//                    } // if
//                    //console.log("mail=" + nPersons[i].mail + "&mdp=" + nMarquePages[i].mdp);
//                } // for

                return nReturn;
            });

            $httpBackend.whenPUT(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend            
            
            $httpBackend.whenDELETE(new RegExp(nRegexMarquepages)).respond(function (method, url) { // traitement FE sans BE
                            var nReturn = new Array();

                if (true) {
                    nReturn.push(200); // requête effectuée avec succès
                    nReturn.push(nJsonMarquepages);

                }else{
                    nReturn.push(404);	// la page demandée n'existe pas
                    nReturn.push('hep hep pas bien');
                } // else

                return nReturn;
            }); 

    } // function

})();

