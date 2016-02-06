(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('marquepageNewCtrl', marquepageNewCtrl);

    marquepageNewCtrl.$inject = ['$scope', '$resource', '$location', 'MarquepageNew','$routeParams'];
    function marquepageNewCtrl($scope, $resource, $location, MarquepageNew, $routeParams) {
        
       /* var url = '';
        var nameMqp = '';*/
        $scope.personId = $routeParams.personId;
        console.log("récup idPerson "+$scope.personId);
        //$scope.mqpNewModel = {url: url, nameMqp: nameMqp};
        
        $scope.validate = function(mqpNewModel) {

        	console.log("id : "+ $scope.personId+" lien : "+mqpNewModel.url+" nom : "+mqpNewModel.nameMqp);

        	MarquepageNew.save({ id1:$scope.personId},{lien:mqpNewModel.url, nom:mqpNewModel.nameMqp}, 
        	//Ca se passe bien
        	function (success) {
        		//on récupère l'id du mqp créé
        		var jsonMqp = success.links[0].href
        		var idMqpArray=jsonMqp.split('/');
        		var idMqp=idMqpArray[4];
        		console.log(idMqp);

        		//on redirige vers la page détail        		
        		$location.path('/persons/'+$scope.personId+'/marquepages/'+idMqpArray[4]);
        		console.log($location.path());
        	},
        	// Ca se passe mal
        	function (pData, headers) {
        		console.log("marquepageLogCtl Query Echec");
        	})
        };
        
        $scope.cancel = function() {
            //console.log("Canceling" + $scope.mqpNewModel.nameMqp + $scope.mqpNewModel.url);

            var nUrlArray=$location.url().split('/');
            var id = nUrlArray[2];
            $location.path('/persons/'+id+'/marquepages').replace();
        };                
        		
		 // clic sur le bouton déconnexion
        $scope.onProfil = function () {

            console.log("clic marquepageDetailCtrl déconnexion en cours");
            // pour test uniquement
            $location.path('/persons/2').replace();
        };

        // clic sur le bouton profil
        $scope.onExit = function () {

            $location.path('/').replace();
        };
    } // function

})();