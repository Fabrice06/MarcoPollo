(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Marquepage', Marquepage);

    Marquepage.$inject = ['$resource'];
    function Marquepage ($resource) {

        var nUrl= '/marquepages/:marquepageId';
        console.log("ressource Marquepage " + nUrl);

        return $resource(nUrl, {}, { // return $resource('/users/:userId', {userId:'@id'}  ???
            'query': 	{method:'GET',		isArray: false},
            'save': 	{method:'POST', 	isArray: false},
            'update': 	{method:'PUT', 		isArray: false},
            'delete': 	{method:'DELETE', 	isArray: false}
        })

    } // function

})();