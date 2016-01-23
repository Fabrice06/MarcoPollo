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

// fichier marquepage_list_service.js
//(function () {
//    'use strict';
//
//    var myModuleService = angular.module('marcopolo.marquepageListService',['ngResource', 'marcopolo.marquepageListCtrl']);
//
//    myModuleService.factory('MarquepageListService', function($resource){
//
//        return $resource('/marquepages/:id_marquepage',{},{
//            'get':    {method:'GET', isArray:false},
//            'save':   {method:'POST',isArray:false},
//            'query':  {method:'GET', isArray:true},
//            'update': {method:'POST',isArray:false,headers:{'X-HTTP-Method-Override':'PUT'}},
//            'remove': {method:'DELETE',isArray:false}
//        });
//    });
//})();