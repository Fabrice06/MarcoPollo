(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('MarquepageList', MarquepageList);

    MarquepageList.$inject = ['$resource'];
    function MarquepageList ($resource) {

        var nUrl= '/persons/:personId/marquepages';
        console.log("ressource MarquepageList " + nUrl);

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