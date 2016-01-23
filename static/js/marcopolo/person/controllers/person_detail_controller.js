(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('personDetailCtrl', personDetailCtrl);

    personDetailCtrl.$inject = ['$scope', '$location', 'Person'];
    function personDetailCtrl($scope, $location, Person) {

        var vm = this;

        ///** Récuperation des informations de la ressource person selectionnée*/
        vm.person = Person.query({id : 3}, function (pPerson) {

            console.log("personDetailCtrl get " + pPerson.mail);
        });

        $scope.onSubmit = function (pPersonDetail) {

        };

    } // function

})();