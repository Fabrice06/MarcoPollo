(function () {
'use strict';

<<<<<<< HEAD

    var myApp = angular.module('marcopolo', ['ngRoute','ngResource','ngMockE2E', 'marcopolo.marquepageListCtrl', 'marcopolo.marquepageListService']);
    myApp.run(mockBackend);

    mockBackend.$inject = ['$httpBackend','$resource','$location', '$http','$routeParams'];
    function mockBackend($httpBackend, $resource, $http,$routeParams,$location) {
=======
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
>>>>>>> e510b19950ec52613773c8ae1fed557127bd0feb

        console.log("Warning: httpBackend mode");

        // récup des datas json -------------------------------------------------------------
            var nJsonPersons = null;
<<<<<<< HEAD
            $httpBackend.whenGET('js/json/person_list.json').passThrough();
            $http.get('js/json/person_list.json').success(function (response) {
                nJsonPersons = JSON.stringify(response);

=======
            //var nJsonFileName = 'js/json/person_list.json';
            var nJsonFileName = 'js/json/person_list_h.json';
            $httpBackend.whenGET(nJsonFileName).passThrough();
            $http.get(nJsonFileName).success(function (response) {
                nJsonPersons = response;
>>>>>>> e510b19950ec52613773c8ae1fed557127bd0feb
            });

            var nJsonMarquepages = null;
            //nJsonFileName = 'js/json/marquepage_list.json';
            nJsonFileName = 'js/json/marquepage_list_h.json';
            $httpBackend.whenGET(nJsonFileName).passThrough();
            $http.get(nJsonFileName).success(function (response) {
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



        // pages html ----------------------------------------------------------------------
            $httpBackend.whenGET(new RegExp('/.*\.html$')).passThrough();


        // person --------------------------------------------------------------------------
        var nRegexPersons= 'persons/[0-9]{1,}';

            //$httpBackend.whenGET(new RegExp('persons\\?.*')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp('persons\\?.*')).respond(function (method, url) { // traitement FE sans BE

                console.log("person?mail&mdp whenGET url params " + url.split("?")[1]);

                var nReturn = new Array();
                // valeur de retour par défaut: [http status, data]
                    nReturn.push(404);	// la page demandée n'existe pas
                    nReturn.push(null);

                var nParams = url.split("?")[1]; // récup des params aprés le ? dans l'url

                // on boucle sur le fichier json pour trouver le mail et le mdp
                for (var i = 0, len = nJsonPersons.persons.length; i < len; i++) {

                    if (("mail=" + nJsonPersons.persons[i].mail + "&mdp=" + nJsonPersons.persons[i].mdp) === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        nReturn[1] = nJsonPersons.persons[i];
                        break;
                    } // if
                    console.log("mail=" + nJsonPersons.persons[i].mail + "&mdp=" + nJsonPersons.persons[i].mdp);
                } // for

                return nReturn;
            });

            //$httpBackend.whenGET(new RegExp(nRegexPersons)).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp(nRegexPersons)).respond(function (method, url) { // traitement FE sans BE

                console.log("person/id whenGET url params " + url.split("/")[1]);

                var nReturn = new Array();
                // valeur de retour par défaut: [http status, data]
                    nReturn.push(404);	// la page demandée n'existe pas
                    nReturn.push(null);

                var nParams = url.split("/")[1];

                // on boucle sur le fichier json pour trouver l'id
                for (var i = 0, len = nJsonPersons.persons.length; i < len; i++) {

                    if (nJsonPersons.persons[i].id_person === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        nReturn[1] = nJsonPersons.persons[i];
                        break;
                    } // if
                } // for


                return nReturn;
            });

<<<<<<< HEAD

            $httpBackend.whenPUT(new RegExp('/persons/[0-9]{1,}\\?.*')).passThrough(); // vers le backend
            $httpBackend.whenPOST(new RegExp('/persons\\?.*')).passThrough(); // vers le backend

            // requêtes non prise en compte
            $httpBackend.whenGET(new RegExp('/persons$')).passThrough(); // vers le backend

=======
            $httpBackend.whenPUT(new RegExp('persons/[0-9]{1,}\\?.*')).passThrough(); // vers le backend
            $httpBackend.whenPOST(new RegExp('persons\\?.*')).passThrough(); // vers le backend

            // requêtes non prise en compte
            $httpBackend.whenGET(new RegExp('persons$')).passThrough(); // vers le backend
>>>>>>> e510b19950ec52613773c8ae1fed557127bd0feb
            $httpBackend.whenDELETE(new RegExp(nRegexPersons)).passThrough(); // vers le backend


        // marquepage ----------------------------------------------------------------------
        var nRegexMarquepages= 'marquepages/[0-9]{1,}';

<<<<<<< HEAD

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

            //$httpBackend.whenGET(new RegExp('/persons/[0-9]{1,}/marquepages$')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp('/persons/[0-9]{1,}/marquepages$')).respond(function (method, url) { // traitement FE sans BE
=======
            //$httpBackend.whenGET(new RegExp('persons/[0-9]{1,}/marquepages$')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp('persons/[0-9]{1,}/marquepages$')).respond(function (method, url) { // traitement FE sans BE
>>>>>>> e510b19950ec52613773c8ae1fed557127bd0feb

                console.log("persons/[0-9]{1,}/marquepages whenGET url params " + url.split("/")[1]);

                var nReturn = new Array();
                nReturn[0] = 200; // requête effectuée avec succès
                nReturn[1] = nJsonMarquepages;

                return nReturn;
            });

            //$httpBackend.whenGET(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp(nRegexMarquepages)).respond(function (method, url) { // traitement FE sans BE

                console.log("/marquepages/[0-9]{1,} whenGET url params " + url.split("/")[1]);

                var nReturn = new Array();
                nReturn.push(404);	// la page demandée n'existe pas
                nReturn.push(null);

                var nParams = url.split("/")[1];
                var nMarquepages = angular.fromJson(nJsonMarquepages);

                for (var i = 0, len = nMarquepages.length; i < len; i++) {

                    if (nMarquepages[i].id_marquepage === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        nReturn[1] = JSON.stringify(nMarquepages[i]);
                        break;
                    } // if
                    console.log("id_marquepage=" + nMarquepages[i].id_marquepage);
                } // for


                return nReturn;
            });

<<<<<<< HEAD

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


            $httpBackend.whenPOST(new RegExp('/persons/[0-9]{1,}/marquepages\\?.*')).passThrough(); // vers le backend
=======
            $httpBackend.whenPOST(new RegExp('marquepages/[0-9]{1,}/marquepages\\?.*')).passThrough(); // vers le backend
>>>>>>> e510b19950ec52613773c8ae1fed557127bd0feb
            $httpBackend.whenDELETE(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend
            $httpBackend.whenPUT(new RegExp('marquepages/[0-9]{1,}\\?.*')).passThrough(); // vers le backend

        // tag --------------------------------------------------------------------------
        var nRegexTags= 'tags/[0-9]{1,}';

            //$httpBackend.whenGET(new RegExp('marquepages/[0-9]{1,}/tags$')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp('marquepages/[0-9]{1,}/tags$')).respond(function (method, url) { // traitement FE sans BE

                console.log("marquepages/[0-9]{1,}/tags whenGET url params " + url.split("/")[1]);

                var nReturn = new Array();
                nReturn.push(404);	// la page demandée n'existe pas
                nReturn.push(null);

                var nParams = url.split("/")[1];
                //var nMarquepages = angular.fromJson(nJsonMarquepages);
                //
                //for (var i = 0, len = nMarquepages.length; i < len; i++) {
                //
                //    if (nMarquepages[i].id_marquepage === nParams) {
                //
                //        nReturn[0] = 200; // requête effectuée avec succès
                //        nReturn[1] = JSON.stringify(nMarquepages[i]);
                //        break;
                //    } // if
                //    console.log("id_marquepage=" + nMarquepages[i].id_marquepage);
                //} // for

                return nReturn;
            });

            //$httpBackend.whenGET(new RegExp(nRegexTags)).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp(nRegexTags)).respond(function (method, url) { // traitement FE sans BE

                console.log("tags/[0-9]{1,} whenGET url params " + url.split("/")[1]);

                var nReturn = new Array();
                nReturn.push(404);	// la page demandée n'existe pas
                nReturn.push(null);

                var nParams = url.split("/")[1];
                //var nMarquepages = angular.fromJson(nJsonMarquepages);
                //
                //for (var i = 0, len = nMarquepages.length; i < len; i++) {
                //
                //    if (nMarquepages[i].id_marquepage === nParams) {
                //
                //        nReturn[0] = 200; // requête effectuée avec succès
                //        nReturn[1] = JSON.stringify(nMarquepages[i]);
                //        break;
                //    } // if
                //    console.log("id_marquepage=" + nMarquepages[i].id_marquepage);
                //} // for

                return nReturn;
            });

            $httpBackend.whenPOST(new RegExp('tags\\?.*')).passThrough(); // vers le backend
            $httpBackend.whenDELETE(new RegExp(nRegexTags)).passThrough(); // vers le backend

        // cle --------------------------------------------------------------------------
        //$httpBackend.whenGET(new RegExp('cles$')).passThrough(); // vers le backend
        $httpBackend.whenGET(new RegExp('cles$')).respond(function (method, url) { // traitement FE sans BE

            console.log("cles whenGET url params " + url.split("/")[1]);

            var nReturn = new Array();
            nReturn.push(404);	// la page demandée n'existe pas
            nReturn.push(null);

            var nParams = url.split("/")[1];
            //var nMarquepages = angular.fromJson(nJsonMarquepages);
            //
            //for (var i = 0, len = nMarquepages.length; i < len; i++) {
            //
            //    if (nMarquepages[i].id_marquepage === nParams) {
            //
            //        nReturn[0] = 200; // requête effectuée avec succès
            //        nReturn[1] = JSON.stringify(nMarquepages[i]);
            //        break;
            //    } // if
            //    console.log("id_marquepage=" + nMarquepages[i].id_marquepage);
            //} // for

            return nReturn;
        });

        $httpBackend.whenPOST(new RegExp('cles\\?.*')).passThrough(); // vers le backend

        //$httpBackend.whenGET(new RegExp('/persons/[0-9]{1,}/cles').passThrough(); // vers le backend
        $httpBackend.whenGET(new RegExp('persons/[0-9]{1,}/cles')).respond(function (method, url) { // traitement FE sans BE

            console.log("persons/[0-9]{1,}/cles whenGET url params " + url.split("/")[1]);

            var nReturn = new Array();
            nReturn.push(404);	// la page demandée n'existe pas
            nReturn.push(null);

            var nParams = url.split("/")[1];
            //var nPersons = angular.fromJson(nJsonPersons);
            //
            //for (var i = 0, len = nPersons.length; i < len; i++) {
            //
            //    if (nPersons[i].id_person === nParams) {
            //
            //        nReturn[0] = 200; // requête effectuée avec succès
            //        nReturn[1] = JSON.stringify([{"id_person": nPersons[i].id_person}]);
            //        break;
            //    } // if
            //    console.log("id_person=" + nPersons[i].id_person);
            //} // for

            return nReturn;
        });

    } // function

})();

