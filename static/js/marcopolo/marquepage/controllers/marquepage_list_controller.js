(function () {
	'use strict';

	var myModuleController = angular.module('marcopolo');

	myModuleController.controller('marquepageListCtrl',['$scope','MarquepageList','Marquepage','$routeParams','$location', function($scope,MarquepageList,Marquepage,$routeParams,$location){

           
        // pour test ---------------------------------------------------
        var nUrlArray = $location.url().split('/');
        console.log("marquepageListCtrl url " + $location.url());

        var nAddLink = "";
        var nProfilLink = "";
    
        // Récuperation des marquepages d'une personne
        
        $scope.listMqp = MarquepageList.query({id:nUrlArray[2]}/*, function (pMarquepageList) { 
        	// OK
        
            //console.log("marquepageListCtrl query " + JSON.stringify(pMarquepageList));
            console.log("marquepageListCtrl query lien pour onProfils " + pMarquepageList._links.persons.uri);
            
            nProfilLink = pMarquepageList._links.persons.uri;

            //console.log("marquepageListCtrl query lien pour onAdd " + pMarquepageList._links.self.uri);
            nAddLink = pMarquepageList._links.self.uri;
        },
        function (pData, headers) { // échec
            console.log("marquepageListCtrl query échec");
        }*/);


       
        // bouton rechercher
        $scope.search = "";     

        // clic sur le bouton ajouter
        $scope.onAdd = function () {         

        	var nAddLink = $location.url();
        	console.log(nAddLink);
        	$location.path(nAddLink +'/new').replace();
        	console.log($location.path());

        };
        
        // clic sur le bouton éditer
        $scope.onUpdate = function (findIdMqp) {
        	
        	console.log("clic modif "); 
        	
        	nAddLink = $location.url();
        	console.log(nAddLink);
        	var id =findIdMqp.links[2].href;
        	var nIdArray = id.split('/');
        	console.log('---------- identification id marquepage: ' + nIdArray[4]);
        	
        	$location.path(nAddLink +'/'+ nIdArray[4]).replace();
        	console.log($location.path());
        };

        // clic sur le bouton supprimer
        $scope.onDelete = function (findIdMqp) {

        	console.log("clic X ");  
       	        	
        	//on récupère l'id de la personne passé en paramètre de l'url        	
        	$scope.nPersonId = $routeParams.personId;
        	//var requestUri = 'persons/'+ $scope.nPersonId +'/marquepages';
        	var requestUri = 'marquepages';
			console.log('---------- requestUri: ' + requestUri);
        	
        	//on récupère l'id du marquepage sélectionné   	
        	var id =findIdMqp.links[2].href;
        	console.log('url du marquepage ' + id);        	
        	var nIdArray = id.split('/');
        	var mqpToDelete = nIdArray[4];        	
        	console.log('---------- identification id marquepage: ' + nIdArray[4]);        	

			//on passe en tant que paramètre la deuxième partie de l'URL courante + l'id du marquepage 
			//nécessaire pour faire appel au HEADER du service $resource "Marquepage"
			var mqpToDelete = nIdArray[4];
			Marquepage.delete({uri:requestUri, id:mqpToDelete},function (success){
				//en cas de succès on met à jour la liste dans la vue
				$scope.listMqp.splice(findIdMqp, 1);
				console.log('route du marquepage supprimé : ' + id);
			});
        }; 
      
	
	// clic sur le bouton déconnexion
        $scope.onProfil = function () {

            console.log("clic marquepageListCtrl déconnexion en cours");
            // pour test uniquement
            $location.path(nProfilLink).replace();
        };

        // clic sur le bouton profil
        $scope.onExit = function () {

            $location.path('/').replace();
        };

	}]);

})();