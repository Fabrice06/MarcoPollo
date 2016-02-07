(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Language', Language);

    Language.$inject = ['$resource'];
    function Language ($resource) {

        return $resource(
            '/:uri/:id',
            {},
            {
                'query': 	{method:'GET', isArray: true},
                'save': 	{method:'POST', isArray: false},
                'update': 	{method:'PUT', isArray: false},
                'delete': 	{method:'DELETE', isArray: false}
            }
        );

    } // function

})();