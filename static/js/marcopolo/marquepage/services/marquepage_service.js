(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Marquepage', Marquepage);

    Marquepage.$inject = ['$resource'];
    function Marquepage ($resource) {

        return $resource(
        	//'/persons/:id1/marquepages/:id2',	
            '/:uri/:id', //nécessaire pour marquepageListCtrl et marquepageDetailCtrl
        
            {},
            { 
                'query': 	{method:'GET',		isArray: false},
              //  'save': 	{method:'POST', params: {lien:'@lien' ,nom:'@nom'}, isArray: false},
                'update': 	{method:'PUT', 		isArray: false},
                'delete': 	{method:'DELETE', 	isArray: false}
            }
        );

    } 
    angular.module('marcopolo')
    .factory('MarquepageNew', MarquepageNew);

    MarquepageNew.$inject = ['$resource'];
    function MarquepageNew ($resource) {

    	return $resource(
    			'/persons/:id1/marquepages/:id2',{},
    			{ 
    				'save': 	{method:'POST', params: {lien:'@lien' ,nom:'@nom'}, isArray: false}
    			}
    	);
    } 

})();