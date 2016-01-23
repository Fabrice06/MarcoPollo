(function () {
    'use strict';

    angular
        .module('marcopolo')
        .controller('marquepageListCtrl', marquepageListCtrl);

    marquepageListCtrl.$inject = ['$scope', '$resource', '$location', 'Marquepage'];
    function marquepageListCtrl($scope, $resource, $location, Marquepage) {

    } // function

})();