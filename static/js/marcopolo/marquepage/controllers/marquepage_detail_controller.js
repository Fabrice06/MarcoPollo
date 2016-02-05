(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('marquepageDetailCtrl', marquepageDetailCtrl);


    marquepageDetailCtrl.$inject = ['$scope', '$resource', '$location', 'Marquepage', 'Tag'];
    function marquepageDetailCtrl($scope, $resource, $location, Marquepage, Tag) {
		

        var nUrlArray = $location.url().split('/');

        //** Récuperation et affichage des informations de la ressource person selectionnée*/
        $scope.marquepageDetailModel = Marquepage.query(
            {
                uri:nUrlArray[3],
                id:nUrlArray[4]
            },
            function (pMarquePage) { // OK
                console.log("marquepageDetailCtrl get query " + pMarquePage.lien);
                
            },
            function (pData, headers) { // échec
                console.log("marquepageDetailCtrl get query échec");
            }
        );

		

		$scope.lien = "http://monLien.com";
		
		$scope.tags = [ 
			{
				"id_tag": 1, 
				"cle": "nom",
				"valeur":"Google"
			}, 
			{
				"id_tag": 2, 
				"cle": "description",
				"valeur":"idée déco"
			}, 
			{
				"id_tag": 3, 
				"cle": "description",
				"valeur":"cours android"
			},
			{
				"id_tag": 4, 
				"cle": "date",
				"valeur":"2014"
			},
			{
				"id_tag": 5,  
				"cle": "description",
				"valeur":"cours Prog Web"
			},
			{
				"id_tag": 6,  
				"cle": "description",
				"valeur":"Systeme-Reseaux"
			}
		] ;
		
		$scope.cles = [
			{
				"id_cle":1,
				"cle": "nom"
			},
			{
				"id_cle":2,
				"cle": "description"
			},
			{
				"id_cle":3,
				"cle": "couleur"
			},
			 {
				"id_cle":4,
				"cle": "date"
			}
		];
		
		// id du marquepage courant
		var idMqp = nUrlArray[4];

        // clic sur le bouton deconnexion
        $scope.onExit = function () {
			console.log("clic marquepageDetailCtrl déconnexion en cours");
            $location.path('/').replace();
        };
		
		// clic sur le bouton back
		$scope.onBack = function () {
			console.log("clic marquepageDetailCtrl Back en cours");
			var id = nUrlArray[2];
			$location.path('/persons/'+id+'/marquepages')			
		};
		
		// clic sur le bouton supprimer
		$scope.onDelete = function () {
			console.log("clic marquepageDetailCtrl Suppression en cours");	
			
			Marquepage.delete (
				{
					uri:'marquepage',
					id:idMqp
				},
				function (success) {
					console.log('marquepageDetailCtrl delete query ok id : ' + idMqp);
					onBack();
				},
				function (pData, headers) { // échec
					console.log("marquepageDetailCtrl delete query échec");
				}
			)
		};
		
		// clic sur le bouton modifier
		$scope.onUpdate = function (pMarquepageDetail) {
			console.log("clic marquepageDetailCtrl Modification en cours");
			Marquepage.put (
				{
					uri:'marquepage',
					id:idMqp,
					nom:pMarquepageDetail.name,
					lien:pMarquepageDetail.lien
				},
				function (success) {
					console.log('marquepageDetailCtrl update query ok id : ' + idMqp);
					onBack();
				},
				function (pData, header) {
					console.log('marquepageDetailCtrl update query échec');
				}
			)
		};
		
		$scope.onAdd = function (pTag) {
			console.log('clic marquepageDetailCtrl Add Tag');
			Tag.post (
				{
					idMqp:idMqp,
					cle:pTag.cle,
					valeur:pTag.valeur
				},
				function (success) {
					console.log('marquepageDetailCtrl add Tag query ok id : ' + idMqp);
//Traitement de réactualisation	à vérifier	
					
				},
				function (pData, header) {
					console.log('marquepageDetailCtrl add Tag query échec');
				}
			)
		};
		
		$scope.onDel = function (pTag) {
			console.log('clic marquepageDetailCtrl del Tag');
			Tag.delete (
				{
					idMqp:idMqp,
					idTag:pTag.id
//Verifier JSon pour recup id Tag
				},
				function (success) {
					console.log('marquepageDetailCtrl del Tag query ok id : ' + idMqp);
					$scope.listeDesTags.splice(pTag, 1);
//Traitement de réactualisation à vérifier
				},
				function (pData, header) {
					console.log('marquepageDetailCtrl del Tag query échec');
				}
			)
		};
		
        
    } // function

})();