(function () {
  'use strict';

  var myModuleService = angular.module('marcopolo.marquepageListService',['ngResource', 'marcopolo.marquepageListCtrl']);

  myModuleService.factory('MarquepageListService', function($resource){

	  return $resource('/marquepages/:id_marquepage',{},{
		  'get':    {method:'GET', isArray:false},
		  'save':   {method:'POST',isArray:false},
		  'query':  {method:'GET', isArray:true},
		  'update': {method:'POST',isArray:false,headers:{'X-HTTP-Method-Override':'PUT'}},
		  'remove': {method:'DELETE',isArray:false}  
	  });
  });
})();