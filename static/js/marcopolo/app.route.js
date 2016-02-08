(function () {
'use strict';

    angular
        .module('marcopolo')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider

        .when('/', {
            templateUrl: 'js/marcopolo/person/person-log.html',
            controller: 'personLogCtrl'
        })

        .when('/persons/:personId/marquepages', {
          templateUrl: 'js/marcopolo/marquepage/marquepage-list.html',
          controller: 'marquepageListCtrl'
        })
		
		.when('/persons/:personId/marquepages/new', {
            templateUrl: 'js/marcopolo/marquepage/marquepage-new.html',
            controller: 'marquepageNewCtrl'
        })

        .when('/persons/:personId/marquepages/:marquepageId', {
            templateUrl: 'js/marcopolo/marquepage/marquepage-detail.html',
            controller: 'marquepageDetailCtrl'
        })

        .when('/persons/new', {
            templateUrl: 'js/marcopolo/person/person-new.html',
            controller: 'personNewCtrl'
        })

        .when('/persons/:personId', {
            templateUrl: 'js/marcopolo/person/person-detail.html',
            controller: 'personDetailCtrl'       
        })
        
        .when('/help', {
            templateUrl: 'js/marcopolo/commons/help.html',
            controller: 'globalCtrl'
        })

            // bac à sable de vince
        .when('/yapafoto', {
            templateUrl: 'js/marcopolo/yapafoto/yapafoto.html'
        })

		
        .otherwise({
            redirectTo: '/'
        });
    } // function

})();

