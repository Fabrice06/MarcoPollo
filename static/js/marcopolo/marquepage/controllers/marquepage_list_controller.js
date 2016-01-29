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


        // pour test ---------------------------------------------------

        // clic sur le bouton rechercher
        $scope.onSearch = function () {

            alert('clic marquepageListCtrl rechercher en cours');
        };

        // bouton rechercher
        $scope.search = "";     

        // clic sur le bouton ajouter
        $scope.onAdd = function () {         

        	nAddLink = $location.url();
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
        	//on recherche l'id du marquepage
        	nAddLink = $location.url();
        	console.log(nAddLink);
        	var id =findIdMqp.links[2].href;
        	console.log(id);
        	var nIdArray = id.split('/');
        	console.log('---------- identification id marquepage: ' + nIdArray[4]);

        	//on supprime le marque page
//        	var monchemin = nIdArray[3]  +('/')+ nIdArray[4];
//        	
//        	Marquepage.delete({uri:monchemin}
//        	//, function (marquepage) { marquepage.$delete();         	}
//        	);
//        	console.log(' deleteMarquepage ');


        	//on remet la liste sans le marque page
        	$location.url().replace();
        	console.log($location.path());
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