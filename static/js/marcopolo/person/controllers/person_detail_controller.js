(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['$scope', '$resource', '$location', 'Person'];
    function personDetailCtrl($scope, $resource, $location, Person) {

        var vm = this;

        /** Récuperation des informations de la ressource person selectionnée
         */
        vm.user = Person.get({id : $stateParams.id}, function (pPerson) {

            console.log("init: personDetailCtrl ");
        });

        $scope.onSubmit = function (pPersonDetail) {

        };

        // récup id person sélectionné avec: $routeParams.personId;
    } // function

})();