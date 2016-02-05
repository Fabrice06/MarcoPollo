(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Tag', Tag);

    Tag.$inject = ['$resource'];
    function Tag ($resource) {

        return $resource(
        	//'/persons/:id1/marquepages/:id2',	
            '/marquepages/:idMqp/tags/:idTag',
        
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