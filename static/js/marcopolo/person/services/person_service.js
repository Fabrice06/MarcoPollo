(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Person', Person);

    Person.$inject = ['$resource'];
    function Person ($resource) {

        var nUrl= '/persons/:personId';
        console.log("ressource Person " + nUrl);

        return $resource(nUrl, {}, { // return $resource('/users/:userId', {userId:'@id'}  ???
            'query': 	{method:'GET',		isArray: false},
            'save': 	{method:'POST', 	isArray: false},
            'update': 	{method:'PUT', 		isArray: false},
            'delete': 	{method:'DELETE', 	isArray: false}
        })

    } // function

})();