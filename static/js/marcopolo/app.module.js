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
            //var nJsonFileName = 'js/json/person_list.json';
            var nJsonFileName = 'js/json/person_list_h.json';
            $httpBackend.whenGET(nJsonFileName).passThrough();
            $http.get(nJsonFileName).success(function (response) {
                nJsonPersons = response;
            });

            var nJsonMarquepagesList = null;
            //nJsonFileName = 'js/json/marquepage_list.json';
            nJsonFileName = 'js/json/marquepage_list_h.json';
            $httpBackend.whenGET(nJsonFileName).passThrough();
            $http.get(nJsonFileName).success(function (response) {
                nJsonMarquepagesList = response;
            });

            var nJsonMarquepagesDetail = null;
            nJsonFileName = 'js/json/marquepage_detail_h.json';
            $httpBackend.whenGET(nJsonFileName).passThrough();
            $http.get(nJsonFileName).success(function (response) {
                nJsonMarquepagesDetail = response;
            });

        // pages html ----------------------------------------------------------------------
            $httpBackend.whenGET(new RegExp('/.*\.html$')).passThrough();


        // person --------------------------------------------------------------------------
        var nRegexPersons= 'persons/[0-9]{1,}$';

            //$httpBackend.whenGET(new RegExp('persons\\?.*')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp('persons\\?.*')).respond(function (method, url) { // traitement FE sans BE

                var nReturn = new Array();
                // valeur de retour par défaut: [http status, data]
                    nReturn.push(404);	// la page demandée n'existe pas
                    nReturn.push(null);

                var nParams = url.split("?")[1]; // récup des params aprés le ? dans l'url
                console.log("person?mail&mdp whenGET url params " + nParams);

                // on boucle sur le fichier json pour trouver le mail et le mdp et retourner la ressource
                for (var i = 0, len = nJsonPersons.data.length; i < len; i++) {

                    if (("mail=" + nJsonPersons.data[i].mail + "&mdp=" + nJsonPersons.data[i].mdp) === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        nReturn[1] = nJsonPersons.data[i];
                        break;
                    } // if
                    //console.log("mail=" + nJsonPersons.data[i].mail + "&mdp=" + nJsonPersons.data[i].mdp);
                } // for

                return nReturn;
            });

            //$httpBackend.whenGET(new RegExp(nRegexPersons)).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp(nRegexPersons)).respond(function (method, url) { // traitement FE sans BE

                var nReturn = new Array();
                // valeur de retour par défaut: [http status, data]
                    nReturn.push(404);	// la page demandée n'existe pas
                    nReturn.push(null);

                var nParams = url;
                console.log("persons/id whenGET url params " + nParams);

                // on boucle sur le fichier json pour trouver le _links.self.uri et retourner le backend
                for (var i = 0, len = nJsonPersons.data.length; i < len; i++) {

                    if (nJsonPersons.data[i]._links.self.uri === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        nReturn[1] = nJsonPersons.data[i];
                        break;
                    } // if
                    console.log("uri = " + nJsonPersons.data[i]._links.self.uri);
                } // for

                return nReturn;
            });

            $httpBackend.whenPUT(new RegExp('persons/[0-9]{1,}\\?.*')).passThrough(); // vers le backend
            $httpBackend.whenPOST(new RegExp('persons\\?.*')).passThrough(); // vers le backend

            // requêtes non prise en compte
            $httpBackend.whenGET(new RegExp('persons$')).passThrough(); // vers le backend
            $httpBackend.whenDELETE(new RegExp(nRegexPersons)).passThrough(); // vers le backend


        // marquepage ----------------------------------------------------------------------
        var nRegexMarquepages= 'marquepages/[0-9]{1,}$';
            /**************GET tous les marquepages********************/
            //$httpBackend.whenGET(new RegExp('persons/[0-9]{1,}/marquepages$')).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp('persons/[0-9]{1,}/marquepages$')).respond(function (method, url) { // traitement FE sans BE

                var nReturn = new Array();
                // valeur de retour par défaut: [http status, data]
                    nReturn[0] = 200; // requête effectuée avec succès
                    nReturn[1] = null;

                var nParams = url;
               // console.log("marquepages/list whenGET url params " + nParams);

                // on boucle sur le fichier json pour trouver le _links.self.uri et retourner le backend
                for (var i = 0, len = nJsonMarquepagesList.data.length; i < len; i++) {

                    if (nJsonMarquepagesList.data[i]._links.self.uri === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        //nReturn[1] = nJsonMarquepagesList.data[i];//retourne un objet = fichier complet
                        nReturn[1] = nJsonMarquepagesList.data[i].marquepages;//retourne tableau de l'objet fichier
                        break;
                    } // if
                    console.log("tableau marquepages = " + nJsonMarquepagesList.data[i].marquepages);
                } // for

                return nReturn;
            });
            
            /**************GET Détail marquepage********************/
          
            //$httpBackend.whenGET(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend
            $httpBackend.whenGET(new RegExp('/persons/[0-9]{1,}/marquepages/[0-9]{1,}')).respond(function (method, url) { // traitement FE sans BE

            	var nReturn = new Array();
            	// valeur de retour par défaut: [http status, data]
            	nReturn[0] = 200; 
            	nReturn[1] = null;

            	/*var nParams = url;
            	console.log('url='+ nParams);*/
            	
            	var firstPartUrl = url.substring(0,22);
            	console.log('1url='+ firstPartUrl);
            	var secondPartUrl = url.substring(10,24);
            	console.log('2url='+ secondPartUrl);

            	// on boucle sur le fichier json pour trouver le _links.self.uri et retourner le backend
            	for (var i = 0, len = nJsonMarquepagesList.data.length; i < len; i++) {
            		console.log("entrée boucle for ");

            		if (nJsonMarquepagesList.data[i]._links.self.uri === firstPartUrl) {                    	
            			console.log("uri paramètre persons = " + nJsonMarquepagesList.data[i]._links.self.uri);
            			
            			var tabMqpPerPerson=[];
            			tabMqpPerPerson = nJsonMarquepagesList.data[i].marquepages;
            			console.log("tab = " + tabMqpPerPerson);

            			for(var j = 0, len =tabMqpPerPerson.length; j < len; j++){

            				if(tabMqpPerPerson[j]._links.self.uri === secondPartUrl){
            					console.log("uri paramètre marquepages  = " + tabMqpPerPerson[j]._links.self.uri);
            					console.log('2url=' + secondPartUrl);

            					nReturn[0] = 200; 
            					nReturn[1] = tabMqpPerPerson[j].lien;            					
            					console.log('valeur du lien récupéré=' + nReturn[1]);
            				}
            			}
            			break;
            		} 
            	} 
            	return nReturn;
            	console.log('valeur du retour de la méthode=' + nReturn);
            	
            });

            $httpBackend.whenPOST(new RegExp('marquepages/[0-9]{1,}/marquepages\\?.*')).passThrough(); // vers le backend
            
            /**************DELETE un marquepage dans la liste des marquepages********************/
            //$httpBackend.whenDELETE(new RegExp(nRegexMarquepages)).passThrough(); // vers le backend
            $httpBackend.whenDELETE(new RegExp(nRegexPersons + nRegexMarquepages)).respond(function (method, url) {
            var nReturn = new Array();
                // valeur de retour par défaut: [http status, data]
                    nReturn[0] = 200; // requête effectuée avec succès
                    nReturn[1] = null;

                var nParams = url;
               // console.log("marquepages/list whenGET url params " + nParams);

                // on boucle sur le fichier json pour trouver le _links.self.uri et retourner le backend
                for (var i = 0, len = nJsonMarquepagesList.data.length; i < len; i++) {

                    if (nJsonMarquepagesList.data[i].marquepages._links.self.uri === nParams) {

                        nReturn[0] = 200; // requête effectuée avec succès
                        
                        nReturn[1] = nJsonMarquepagesList.data[i].marquepages._links.self.uri;//retourne tableau de l'objet fichier
                        break;
                    } // if
                   
                } // for

                return nReturn;
            });

            $httpBackend.whenPUT(new RegExp('marquepages/[0-9]{1,}\\?.*')).passThrough(); // vers le backend

        // tag --------------------------------------------------------------------------
        var nRegexTags= 'tags/[0-9]{1,}$';

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
