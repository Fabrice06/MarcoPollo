(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['$scope', '$routeParams'];
    function personDetailCtrl($scope, $routeParams) {
    	
        // récup id person sélectionné avec: $routeParams.personId;
    } // function

})();