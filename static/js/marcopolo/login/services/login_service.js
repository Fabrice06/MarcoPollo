(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Login', Login);

    Login.$inject = ['$resource'];
    function Login ($resource) {

        var nUrl= '/persons';
        console.log("ressource Login " + nUrl);

        return $resource(nUrl, {}, { // return $resource('/users/:userId', {userId:'@id'}  ???
            'query': 	{method:'GET',		isArray: false},
            'save': 	{method:'POST', 	isArray: false},
            'update': 	{method:'PUT', 		isArray: false},
            'delete': 	{method:'DELETE', 	isArray: false}
        })

    } // function

})();