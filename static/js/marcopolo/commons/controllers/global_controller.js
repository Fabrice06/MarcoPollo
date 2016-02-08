(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('globalCtrl', globalCtrl);

    globalCtrl.$inject = ['$scope', '$location', '$rootScope'];
    function globalCtrl($scope, $location, $rootScope) {
        
        ;
      
        $scope.onHelp = function() {
			console.log("clic globalCtrl Help");
            $rootScope.nUrlCourante = $location.path();
            console.log("----------------" + $rootScope.nUrlCourante);
            $location.path('/help').replace();
            
        };
        
        $scope.onExit = function() {
            console.log("clic globalCtrl Exit Help");
            
            console.log("----------------" + $rootScope.nUrlCourante);
            $location.path($rootScope.nUrlCourante).replace();
        }
        
    }
    
    
})();