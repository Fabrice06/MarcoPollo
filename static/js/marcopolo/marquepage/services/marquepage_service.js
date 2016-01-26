(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Marquepage', Marquepage);

    Marquepage.$inject = ['$resource'];
    function Marquepage ($resource) {

        return $resource(
        	'/persons/:id1/marquepages/:id2',	
            //'/:uri/:id',
        		
            {},
            { // return $resource('/users/:userId', {userId:'@id'}  ???
                'query': 	{method:'GET',		isArray: false},
                'save': 	{method:'POST', 	isArray: false},
                'update': 	{method:'PUT', 		isArray: false},
                'delete': 	{method:'DELETE', 	isArray: false}
            }
        );

    } // function

})();