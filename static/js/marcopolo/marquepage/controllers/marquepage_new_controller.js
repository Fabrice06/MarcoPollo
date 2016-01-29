(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('marquepageNewCtrl', marquepageNewCtrl);

    marquepageNewCtrl.$inject = ['$scope', '$resource', '$location', 'Marquepage'];
    function marquepageNewCtrl($scope, $resource, $location, Marquepage) {
        
        var url = '';
        var nameMqp = '';
        
        $scope.mqpNewModel = {url: url, nameMqp: nameMqp};
        
        $scope.validate = function(mqp) {
			//console.log("Validating" + mqp.nameMqp + mqp.url);
            // envoi Mqp en BD
            // renvoi vers marcopolo/marquepage/marquepage-detail.html
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