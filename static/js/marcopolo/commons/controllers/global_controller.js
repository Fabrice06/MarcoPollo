(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('globalCtrl', globalCtrl);

    globalCtrl.$inject = ['$scope', '$location', '$rootScope'];
    function globalCtrl($scope, $location, $rootScope) {
        
        ;
      
        $scope.onHelp = function() {
			console.log("clic sur Help");
            $rootScope.nHelpPreviousUrl = $location.path();
            console.log("url d'où je viens : " + $rootScope.nHelpPreviousUrl);
            $location.path('/help').replace();
            
        };
        
        $scope.onExit = function() {
            console.log("clic sur Retour Help");
            
            console.log("retour sur l'url précédente : " + $rootScope.nHelpPreviousUrl);
            $location.path($rootScope.nHelpPreviousUrl).replace();
        }
        
        $scope.aboutUs = function() {
        	console.log("clic sur aboutUs");
            $rootScope.nAboutUsPreviousUrl = $location.path();
            console.log("url d'où je viens : " + $rootScope.nAboutUsPreviousUrl);
            $location.path('/aboutUs').replace();
            
        };
		
		$scope.onExit2 = function() {
            console.log("clic sur Retour AboutUs");
            
            console.log("retour sur l'url précédente : " + $rootScope.nAboutUsPreviousUrl);
            $location.path($rootScope.nAboutUsPreviousUrl).replace();
        }
        
        
    }
    
    
})();