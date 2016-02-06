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
                'save': 	{method:'POST', params: {lien:'@lien' ,nom:'@nom'}, isArray: false},
                'update': 	{method:'PUT', params: {lien:'@lien' ,nom:'@nom'}, isArray: false},
                'delete': 	{method:'DELETE', 	isArray: false}
            }
        );

    }; 
    
    
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
    }; 
    
    
     angular.module('marcopolo')
        .factory('Tag', Tag);

    Tag.$inject = ['$resource'];
    function Tag ($resource) {

        return $resource(
            '/marquepages/:id/tags/:id2',
        
            {},
            { // return $resource('/users/:userId', {userId:'@id'}  ???
                'save': 	{method:'POST', params: {cle:'@cle' ,valeur:'@valeur'}, isArray: false}
            }
        );

    } // function

})();