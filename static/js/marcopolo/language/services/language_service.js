(function () {
    'use strict';

    angular.module('marcopolo')
        .factory('Language', Language);

    Language.$inject = ['$http'];
    function Language ($http) {

        var dataFactory = {};

        //dataFactory.getCustomers = function () {
        //    return $http.get(urlBase);
        //};
        //
        //dataFactory.getCustomer = function (id) {
        //    return $http.get(urlBase + '/' + id);
        //};

        dataFactory.query = function (pUrl, pParams) {
            var nReq = {
                method: 'GET',
                url: pUrl,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                params: {}
            };
            return $http(nReq);
        };

        //dataFactory.updateCustomer = function (cust) {
        //    return $http.put(urlBase + '/' + cust.ID, cust)
        //};
        //
        //dataFactory.deleteCustomer = function (id) {
        //    return $http.delete(urlBase + '/' + id);
        //};
        //
        //dataFactory.getOrders = function (id) {
        //    return $http.get(urlBase + '/' + id + '/orders');
        //};

        return dataFactory;

    } // function

    //Language.$inject = ['$resource'];
    //function Language ($resource) {
    //
    //    return $resource(
    //        '/:uri/:id',
    //        {},
    //        {
    //            'query': 	{method:'GET', isArray: true},
    //            'save': 	{method:'POST', isArray: false},
    //            'update': 	{method:'PUT', isArray: false},
    //            'delete': 	{method:'DELETE', isArray: false}
    //        }
    //    );
    //
    //} // function

})();